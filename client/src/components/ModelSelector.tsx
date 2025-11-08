import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';

export type AIModel = 'gpt-4' | 'claude-3.5-sonnet' | 'gemini-pro';

interface ModelSelectorProps {
  value: AIModel;
  onChange: (model: AIModel) => void;
}

const models = [
  { value: 'gpt-4' as const, label: 'GPT-4 (OpenAI)' },
  { value: 'claude-3.5-sonnet' as const, label: 'Claude 3.5 Sonnet (Anthropic)' },
  { value: 'gemini-pro' as const, label: 'Gemini Pro (Google)' },
];

export default function ModelSelector({ value, onChange }: ModelSelectorProps) {
  return (
    <div className="space-y-2 p-4 border-b border-border">
      <Label htmlFor="model-select" className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
        AI Model
      </Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger id="model-select" className="w-full" data-testid="select-model">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {models.map((model) => (
            <SelectItem key={model.value} value={model.value} data-testid={`option-${model.value}`}>
              {model.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
