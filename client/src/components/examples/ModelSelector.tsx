import { useState } from 'react';
import ModelSelector, { AIModel } from '../ModelSelector';

export default function ModelSelectorExample() {
  const [model, setModel] = useState<AIModel>('gpt-4');

  const handleChange = (newModel: AIModel) => {
    console.log('Model changed to:', newModel);
    setModel(newModel);
  };

  return (
    <div className="max-w-xs p-4">
      <ModelSelector value={model} onChange={handleChange} />
      <div className="mt-4 p-3 bg-muted/30 rounded-md text-sm">
        <p className="text-muted-foreground">Selected model:</p>
        <p className="font-mono text-foreground">{model}</p>
      </div>
    </div>
  );
}
