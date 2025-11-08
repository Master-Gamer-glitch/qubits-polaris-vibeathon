import { useState } from 'react';
import { AppSidebar } from '../AppSidebar';
import { AIModel } from '../ModelSelector';
import { SidebarProvider } from '@/components/ui/sidebar';

export default function AppSidebarExample() {
  const [selectedModel, setSelectedModel] = useState<AIModel>('gpt-4');
  const [activeChat, setActiveChat] = useState<string>('1');

  const mockChats = [
    { id: '1', title: 'Python fibonacci function', timestamp: '2 hours ago' },
    { id: '2', title: 'React component architecture', timestamp: '5 hours ago' },
    { id: '3', title: 'CSS Grid vs Flexbox', timestamp: 'Yesterday' },
    { id: '4', title: 'JavaScript async/await patterns', timestamp: '2 days ago' },
  ];

  const handleNewChat = () => {
    console.log('New chat created');
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
          chats={mockChats}
          activeChat={activeChat}
          onChatSelect={setActiveChat}
          onNewChat={handleNewChat}
        />
        <main className="flex-1 flex items-center justify-center bg-background">
          <p className="text-muted-foreground">Main content area</p>
        </main>
      </div>
    </SidebarProvider>
  );
}
