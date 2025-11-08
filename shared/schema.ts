import { z } from "zod";

export const messageSchema = z.object({
  role: z.enum(['user', 'assistant']),
  content: z.string(),
});

export const chatRequestSchema = z.object({
  messages: z.array(messageSchema),
  model: z.enum(['perplexity-pro', 'gemini-pro']),
});

export type Message = z.infer<typeof messageSchema>;
export type ChatRequest = z.infer<typeof chatRequestSchema>;
export type AIModel = ChatRequest['model'];
