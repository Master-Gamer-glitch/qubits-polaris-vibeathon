import { Code2, Sparkles, Zap } from 'lucide-react';

export default function EmptyState() {
  const features = [
    {
      icon: Code2,
      title: 'Code Generation',
      description: 'Generate code in Python, HTML, CSS, and JavaScript',
    },
    {
      icon: Sparkles,
      title: 'Multiple AI Models',
      description: 'Switch between Perplexity and Gemini',
    },
    {
      icon: Zap,
      title: 'Smart Assistance',
      description: 'Get technical discussions and code modifications',
    },
  ];

  return (
    <div className="flex-1 flex items-center justify-center p-8">
      <div className="max-w-2xl text-center space-y-8">
        <div className="space-y-3">
          <h1 className="text-2xl font-semibold text-foreground">
            Welcome to Candela
          </h1>
          <p className="text-sm text-muted-foreground max-w-md mx-auto">
            Your intelligent coding assistant powered by state-of-the-art AI models
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="p-4 rounded-md border border-border bg-card/50 hover-elevate"
            >
              <feature.icon className="h-6 w-6 text-primary mb-3 mx-auto" />
              <h3 className="text-sm font-semibold mb-1">{feature.title}</h3>
              <p className="text-xs text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>

        <p className="text-xs text-muted-foreground mt-8">
          Start a conversation below to begin coding with AI assistance
        </p>
      </div>
    </div>
  );
}
