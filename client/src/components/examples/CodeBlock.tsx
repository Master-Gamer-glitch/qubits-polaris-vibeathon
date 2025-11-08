import CodeBlock from '../CodeBlock';

export default function CodeBlockExample() {
  const pythonCode = `def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)

# Print first 10 numbers
for i in range(10):
    print(fibonacci(i))`;

  return (
    <div className="p-4 max-w-3xl">
      <CodeBlock code={pythonCode} language="python" showLineNumbers={true} />
    </div>
  );
}
