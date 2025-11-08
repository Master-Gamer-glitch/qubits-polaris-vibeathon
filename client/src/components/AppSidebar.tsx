import { MessageSquare, Plus } from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import ModelSelector, { AIModel } from './ModelSelector';
import { ScrollArea } from '@/components/ui/scroll-area';

interface Chat {
  id: string;
  title: string;
  timestamp: string;
}

interface AppSidebarProps {
  selectedModel: AIModel;
  onModelChange: (model: AIModel) => void;
  chats: Chat[];
  activeChat: string | null;
  onChatSelect: (chatId: string) => void;
  onNewChat: () => void;
}

export function AppSidebar({
  selectedModel,
  onModelChange,
  chats,
  activeChat,
  onChatSelect,
  onNewChat,
}: AppSidebarProps) {
  return (
    <Sidebar>
      <SidebarHeader className="border-b border-sidebar-border p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-sidebar-foreground">Candela</h2>
        </div>
        <Button
          onClick={onNewChat}
          className="w-full justify-start gap-2"
          variant="default"
          data-testid="button-new-chat"
        >
          <Plus className="h-4 w-4" />
          New Chat
        </Button>
      </SidebarHeader>
      <SidebarContent>
        <ModelSelector value={selectedModel} onChange={onModelChange} />
        <SidebarGroup>
          <SidebarGroupLabel className="px-4">Chat History</SidebarGroupLabel>
          <SidebarGroupContent>
            <ScrollArea className="h-[calc(100vh-320px)]">
              <SidebarMenu>
                {chats.length === 0 ? (
                  <div className="px-4 py-8 text-center text-sm text-muted-foreground">
                    No chats yet
                  </div>
                ) : (
                  chats.map((chat) => (
                    <SidebarMenuItem key={chat.id}>
                      <SidebarMenuButton
                        onClick={() => onChatSelect(chat.id)}
                        isActive={activeChat === chat.id}
                        className="w-full justify-start gap-3 px-4 hover-elevate active-elevate-2"
                        data-testid={`button-chat-${chat.id}`}
                      >
                        <MessageSquare className="h-4 w-4 shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">{chat.title}</p>
                          <p className="text-xs text-muted-foreground truncate">{chat.timestamp}</p>
                        </div>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))
                )}
              </SidebarMenu>
            </ScrollArea>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
