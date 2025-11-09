import { z } from "zod";

export const messageSchema = z.object({
  role: z.enum(['user', 'assistant']),
  content: z.string(),
});

export const chatRequestSchema = z.object({
  messages: z.array(messageSchema),
  model: z.enum(['perplexity-pro', 'gemini-pro']),
});

export const skillSwapSchema = z.object({
  id: z.string(),
  userId: z.string(),
  userName: z.string(),
  offer: z.string(),
  need: z.string(),
  tags: z.array(z.string()),
  commentsCount: z.number(),
  createdAt: z.string(),
});

export const insertSkillSwapSchema = skillSwapSchema.omit({ id: true, commentsCount: true, createdAt: true });

export type Message = z.infer<typeof messageSchema>;
export type ChatRequest = z.infer<typeof chatRequestSchema>;
export type AIModel = ChatRequest['model'];
export type SkillSwap = z.infer<typeof skillSwapSchema>;
export type InsertSkillSwap = z.infer<typeof insertSkillSwapSchema>;
