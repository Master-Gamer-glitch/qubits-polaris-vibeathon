import ChatMessage from '../ChatMessage';

export default function ChatMessageExample() {
  const userMessage = "Can you help me write a Python function to calculate fibonacci numbers?";
  
  const assistantMessage = `Sure! Here's a Python function to calculate Fibonacci numbers:

\`\`\`python
def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)

# Example usage
for i in range(10):
    print(f"fibonacci({i}) = {fibonacci(i)}")
\`\`\`

This is a recursive implementation. For better performance with larger numbers, you could use **memoization** or an iterative approach.`;

  return (
    <div className="space-y-0">
      <ChatMessage role="user" content={userMessage} timestamp="2:30 PM" />
      <ChatMessage role="assistant" content={assistantMessage} timestamp="2:31 PM" />
    </div>
  );
}
