import { z } from "zod";

export const messageSchema = z.object({
  role: z.enum(['user', 'assistant']),
  content: z.string(),
});

export const chatRequestSchema = z.object({
  messages: z.array(messageSchema),
  model: z.enum(['gpt-4', 'claude-3.5-sonnet', 'gemini-pro']),
});

export type Message = z.infer<typeof messageSchema>;
export type ChatRequest = z.infer<typeof chatRequestSchema>;
export type AIModel = ChatRequest['model'];
