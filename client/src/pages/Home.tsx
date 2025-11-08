import { useState, useRef, useEffect } from 'react';
import { AppSidebar } from '@/components/AppSidebar';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import ChatMessage from '@/components/ChatMessage';
import ChatInput from '@/components/ChatInput';
import EmptyState from '@/components/EmptyState';
import { AIModel } from '@/components/ModelSelector';
import { ScrollArea } from '@/components/ui/scroll-area';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

interface Chat {
  id: string;
  title: string;
  timestamp: string;
  messages: Message[];
}

export default function Home() {
  const [selectedModel, setSelectedModel] = useState<AIModel>('gpt-4');
  const [chats, setChats] = useState<Chat[]>([]);
  const [activeChat, setActiveChat] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const currentChat = chats.find(c => c.id === activeChat);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [currentChat?.messages]);

  const handleNewChat = () => {
    const newChat: Chat = {
      id: Date.now().toString(),
      title: 'New conversation',
      timestamp: 'Just now',
      messages: [],
    };
    setChats([newChat, ...chats]);
    setActiveChat(newChat.id);
  };

  const handleSendMessage = async (content: string) => {
    let chatId = activeChat;
    
    if (!chatId) {
      const newChat: Chat = {
        id: Date.now().toString(),
        title: content.slice(0, 50),
        timestamp: 'Just now',
        messages: [],
      };
      setChats([newChat, ...chats]);
      chatId = newChat.id;
      setActiveChat(newChat.id);
    }

    await addMessage(chatId, content);
  };

  const addMessage = async (chatId: string, content: string) => {
    const now = new Date();
    const timestamp = now.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content,
      timestamp,
    };

    setChats(prevChats => {
      const updatedChats = prevChats.map(chat => {
        if (chat.id === chatId) {
          const newMessages = [...chat.messages, userMessage];
          const newTitle = chat.messages.length === 0 ? content.slice(0, 50) : chat.title;
          return { ...chat, messages: newMessages, title: newTitle };
        }
        return chat;
      });
      return updatedChats;
    });

    const currentChat = chats.find(c => c.id === chatId);
    const allMessages = [...(currentChat?.messages || []), userMessage];

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: allMessages.map(m => ({ role: m.role, content: m.content })),
          model: selectedModel,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      const reader = response.body?.getReader();
      if (!reader) {
        throw new Error('No reader available');
      }

      const decoder = new TextDecoder();
      let assistantContent = '';
      let buffer = '';
      const assistantId = (Date.now() + 1).toString();

      const assistantMessage: Message = {
        id: assistantId,
        role: 'assistant',
        content: '',
        timestamp: new Date().toLocaleTimeString('en-US', { 
          hour: 'numeric', 
          minute: '2-digit',
          hour12: true 
        }),
      };

      setChats(prevChats =>
        prevChats.map(chat =>
          chat.id === chatId
            ? { ...chat, messages: [...chat.messages, assistantMessage] }
            : chat
        )
      );

      let isDone = false;
      
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        
        buffer = lines.pop() || '';

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6).trim();
            if (data === '[DONE]') {
              isDone = true;
              break;
            }

            if (data) {
              try {
                const parsed = JSON.parse(data);
                if (parsed.content) {
                  assistantContent += parsed.content;
                  
                  setChats(prevChats =>
                    prevChats.map(chat => {
                      if (chat.id === chatId) {
                        const updatedMessages = chat.messages.map(msg =>
                          msg.id === assistantId
                            ? { ...msg, content: assistantContent }
                            : msg
                        );
                        return { ...chat, messages: updatedMessages };
                      }
                      return chat;
                    })
                  );
                }
              } catch (e) {
                console.error('Failed to parse SSE data:', data, e);
              }
            }
          }
        }
        
        if (isDone) break;
      }

      buffer += decoder.decode();
      if (buffer.trim()) {
        const lines = buffer.split('\n');
        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6).trim();
            if (data && data !== '[DONE]') {
              try {
                const parsed = JSON.parse(data);
                if (parsed.content) {
                  assistantContent += parsed.content;
                  
                  setChats(prevChats =>
                    prevChats.map(chat => {
                      if (chat.id === chatId) {
                        const updatedMessages = chat.messages.map(msg =>
                          msg.id === assistantId
                            ? { ...msg, content: assistantContent }
                            : msg
                        );
                        return { ...chat, messages: updatedMessages };
                      }
                      return chat;
                    })
                  );
                }
              } catch (e) {
                console.error('Failed to parse final SSE data:', data, e);
              }
            }
          }
        }
      }
    } catch (error) {
      console.error('Error sending message:', error);
      
      setChats(prevChats =>
        prevChats.map(chat => {
          if (chat.id === chatId) {
            const lastMsg = chat.messages[chat.messages.length - 1];
            if (lastMsg?.role === 'assistant' && !lastMsg.content) {
              const updatedMessages = chat.messages.slice(0, -1);
              updatedMessages.push({
                ...lastMsg,
                content: 'Sorry, I encountered an error processing your request. Please try again.',
              });
              return { ...chat, messages: updatedMessages };
            }
            const errorMessage: Message = {
              id: (Date.now() + 1).toString(),
              role: 'assistant',
              content: 'Sorry, I encountered an error processing your request. Please try again.',
              timestamp: new Date().toLocaleTimeString('en-US', { 
                hour: 'numeric', 
                minute: '2-digit',
                hour12: true 
              }),
            };
            return { ...chat, messages: [...chat.messages, errorMessage] };
          }
          return chat;
        })
      );
    }
  };

  const style = {
    '--sidebar-width': '20rem',
  };

  return (
    <SidebarProvider style={style as React.CSSProperties}>
      <div className="flex h-screen w-full">
        <AppSidebar
          selectedModel={selectedModel}
          onModelChange={setSelectedModel}
          chats={chats}
          activeChat={activeChat}
          onChatSelect={setActiveChat}
          onNewChat={handleNewChat}
        />
        <div className="flex flex-col flex-1">
          <header className="flex items-center gap-2 p-3 border-b border-border">
            <SidebarTrigger data-testid="button-sidebar-toggle" />
            <h1 className="text-sm font-semibold">
              {currentChat?.title || 'Candela'}
            </h1>
          </header>
          <div className="flex-1 overflow-hidden flex flex-col">
            {!currentChat || currentChat.messages.length === 0 ? (
              <EmptyState />
            ) : (
              <ScrollArea className="flex-1">
                <div ref={scrollRef} className="max-w-4xl mx-auto">
                  {currentChat.messages.map((message) => (
                    <ChatMessage
                      key={message.id}
                      role={message.role}
                      content={message.content}
                      timestamp={message.timestamp}
                    />
                  ))}
                </div>
              </ScrollArea>
            )}
            <ChatInput onSend={handleSendMessage} />
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}
