import { useState } from 'react';
import ChatInput from '../ChatInput';

export default function ChatInputExample() {
  const [messages, setMessages] = useState<string[]>([]);

  const handleSend = (message: string) => {
    console.log('Message sent:', message);
    setMessages([...messages, message]);
  };

  return (
    <div className="h-screen flex flex-col">
      <div className="flex-1 overflow-auto p-4">
        {messages.length === 0 ? (
          <p className="text-center text-muted-foreground text-sm">
            Type a message below to test the input
          </p>
        ) : (
          <div className="space-y-2 max-w-3xl mx-auto">
            {messages.map((msg, i) => (
              <div key={i} className="p-3 bg-muted/30 rounded-md text-sm">
                {msg}
              </div>
            ))}
          </div>
        )}
      </div>
      <ChatInput onSend={handleSend} />
    </div>
  );
}
