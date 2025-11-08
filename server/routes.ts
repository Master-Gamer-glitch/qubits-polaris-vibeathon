import type { Express } from "express";
import { createServer, type Server } from "http";
import OpenAI from "openai";
import { GoogleGenAI } from "@google/genai";
import { chatRequestSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Only initialize clients if API keys are available
  const perplexity = process.env.PERPLEXITY_API_KEY
    ? new OpenAI({ 
        apiKey: process.env.PERPLEXITY_API_KEY,
        baseURL: "https://api.perplexity.ai"
      })
    : null;

  const genai = process.env.GEMINI_API_KEY
    ? new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY })
    : null;

  app.post("/api/chat", async (req, res) => {
    try {
      const { messages, model } = chatRequestSchema.parse(req.body);
      
      console.log(`Chat request: model=${model}, messages=${messages.length}`);

      res.setHeader("Content-Type", "text/event-stream");
      res.setHeader("Cache-Control", "no-cache");
      res.setHeader("Connection", "keep-alive");

      if (model === "perplexity-pro") {
        if (!perplexity) {
          throw new Error("Perplexity API key is not configured");
        }
        const stream = await perplexity.chat.completions.create({
          model: "sonar-pro",
          messages: messages.map((msg) => ({
            role: msg.role,
            content: msg.content,
          })),
          stream: true,
        });

        for await (const chunk of stream) {
          const content = chunk.choices[0]?.delta?.content || "";
          if (content) {
            res.write(`data: ${JSON.stringify({ content })}\n\n`);
          }
        }
      } else if (model === "gemini-pro") {
        if (!genai) {
          throw new Error("Gemini API key is not configured");
        }
        const chat = genai.chats.create({
          model: "gemini-2.0-flash-exp",
          history: messages.slice(0, -1).map((msg) => ({
            role: msg.role === "assistant" ? "model" : "user",
            parts: [{ text: msg.content }],
          })),
        });

        const lastMessage = messages[messages.length - 1];
        const stream = await chat.sendMessageStream({
          message: lastMessage.content,
        });

        for await (const chunk of stream) {
          const content = chunk.text;
          if (content) {
            res.write(`data: ${JSON.stringify({ content })}\n\n`);
          }
        }
      }

      res.write("data: [DONE]\n\n");
      res.end();
      console.log(`Chat completed: model=${model}`);
    } catch (error) {
      console.error("Chat API error:", error);
      if (!res.headersSent) {
        res.status(500).json({
          error: error instanceof Error ? error.message : "Unknown error",
        });
      } else {
        res.write(`data: ${JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" })}\n\n`);
        res.end();
      }
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
