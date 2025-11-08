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

  const handleSendMessage = (content: string) => {
    if (!activeChat) {
      handleNewChat();
      setTimeout(() => {
        const newChatId = chats[0]?.id || Date.now().toString();
        addMessage(newChatId, content);
      }, 0);
      return;
    }

    addMessage(activeChat, content);
  };

  const addMessage = (chatId: string, content: string) => {
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

    // Simulate AI response
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: generateMockResponse(content, selectedModel),
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
    }, 1000);
  };

  const generateMockResponse = (userMessage: string, model: AIModel): string => {
    // todo: remove mock functionality
    const modelName = model === 'gpt-4' ? 'GPT-4' : model === 'claude-3.5-sonnet' ? 'Claude 3.5 Sonnet' : 'Gemini Pro';
    
    if (userMessage.toLowerCase().includes('python') || userMessage.toLowerCase().includes('function')) {
      return `Here's a Python solution using **${modelName}**:

\`\`\`python
def example_function(param):
    """
    Example function to demonstrate code generation.
    """
    result = param * 2
    return result

# Usage
output = example_function(5)
print(f"Result: {output}")
\`\`\`

This function demonstrates a basic pattern. Let me know if you'd like me to expand on this or modify it!`;
    }

    if (userMessage.toLowerCase().includes('html') || userMessage.toLowerCase().includes('css')) {
      return `Here's an HTML/CSS solution powered by **${modelName}**:

\`\`\`html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Example Page</title>
    <style>
        .container {
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
        }
        .card {
            background: #f5f5f5;
            border-radius: 8px;
            padding: 20px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="card">
            <h1>Hello World</h1>
            <p>This is an example card component.</p>
        </div>
    </div>
</body>
</html>
\`\`\`

Would you like me to modify any styles or add more features?`;
    }

    return `I'd be happy to help with that! I'm currently running on **${modelName}**. 

Here are a few ways I can assist:
- Generate code in Python, HTML, CSS, or JavaScript
- Explain technical concepts
- Help debug and modify existing code
- Discuss best practices and patterns

Could you provide more details about what you're trying to build?`;
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
