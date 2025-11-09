import type { Express } from "express";
import { createServer, type Server } from "http";
import OpenAI from "openai";
import { GoogleGenAI } from "@google/genai";
import { chatRequestSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  const perplexityKeys = [
    process.env.PERPLEXITY_API_KEY,
    process.env.PERPLEXITY_API_KEY2,
    process.env.PERPLEXITY_API_KEY3,
  ].filter(Boolean) as string[];

  const geminiKeys = [
    process.env.GEMINI_API_KEY,
    process.env.GEMINI_API_KEY2,
    process.env.GEMINI_API_KEY3,
  ].filter(Boolean) as string[];

  let perplexityIndex = 0;
  let geminiIndex = 0;

  const getNextPerplexityClient = () => {
    if (perplexityKeys.length === 0) return null;
    const key = perplexityKeys[perplexityIndex];
    perplexityIndex = (perplexityIndex + 1) % perplexityKeys.length;
    return {
      client: new OpenAI({ 
        apiKey: key,
        baseURL: "https://api.perplexity.ai"
      }),
      keyIndex: perplexityIndex === 0 ? perplexityKeys.length - 1 : perplexityIndex - 1
    };
  };

  const getNextGeminiClient = () => {
    if (geminiKeys.length === 0) return null;
    const key = geminiKeys[geminiIndex];
    geminiIndex = (geminiIndex + 1) % geminiKeys.length;
    return {
      client: new GoogleGenAI({ apiKey: key }),
      keyIndex: geminiIndex === 0 ? geminiKeys.length - 1 : geminiIndex - 1
    };
  };

  app.post("/api/chat", async (req, res) => {
    try {
      const { messages, model } = chatRequestSchema.parse(req.body);
      
      console.log(`Chat request: model=${model}, messages=${messages.length}`);

      res.setHeader("Content-Type", "text/event-stream");
      res.setHeader("Cache-Control", "no-cache");
      res.setHeader("Connection", "keep-alive");

      if (model === "perplexity-pro") {
        const maxRetries = perplexityKeys.length;
        let lastError: Error | null = null;

        for (let attempt = 0; attempt < maxRetries; attempt++) {
          const clientInfo = getNextPerplexityClient();
          if (!clientInfo) {
            throw new Error("Perplexity API key is not configured");
          }

          const { client, keyIndex } = clientInfo;
          console.log(`Perplexity attempt ${attempt + 1}/${maxRetries} using key ${keyIndex + 1}`);

          try {
            const stream = await client.chat.completions.create({
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

            res.write("data: [DONE]\n\n");
            res.end();
            console.log(`Chat completed: model=${model}, key=${keyIndex + 1}`);
            return;
          } catch (error: any) {
            lastError = error;
            console.error(`Perplexity key ${keyIndex + 1} failed:`, error.message);
            
            if (error?.status === 429 || error?.status >= 500) {
              console.log(`Retryable error (${error.status}), trying next key...`);
              continue;
            }
            throw error;
          }
        }

        throw lastError || new Error("All Perplexity API keys failed");
      } else if (model === "gemini-pro") {
        const maxRetries = geminiKeys.length;
        let lastError: Error | null = null;

        for (let attempt = 0; attempt < maxRetries; attempt++) {
          const clientInfo = getNextGeminiClient();
          if (!clientInfo) {
            throw new Error("Gemini API key is not configured");
          }

          const { client, keyIndex } = clientInfo;
          console.log(`Gemini attempt ${attempt + 1}/${maxRetries} using key ${keyIndex + 1}`);

          try {
            const chat = client.chats.create({
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

            res.write("data: [DONE]\n\n");
            res.end();
            console.log(`Chat completed: model=${model}, key=${keyIndex + 1}`);
            return;
          } catch (error: any) {
            lastError = error;
            console.error(`Gemini key ${keyIndex + 1} failed:`, error.message);
            
            if (error?.status === 429 || error?.status >= 500) {
              console.log(`Retryable error (${error.status}), trying next key...`);
              continue;
            }
            throw error;
          }
        }

        throw lastError || new Error("All Gemini API keys failed");
      }
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
