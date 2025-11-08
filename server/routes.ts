import type { Express } from "express";
import { createServer, type Server } from "http";
import OpenAI from "openai";
import Anthropic from "@anthropic-ai/sdk";
import { GoogleGenAI } from "@google/genai";
import { chatRequestSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const anthropic = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY,
  });

  const genai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

  app.post("/api/chat", async (req, res) => {
    try {
      const { messages, model } = chatRequestSchema.parse(req.body);

      res.setHeader("Content-Type", "text/event-stream");
      res.setHeader("Cache-Control", "no-cache");
      res.setHeader("Connection", "keep-alive");

      if (model === "gpt-4") {
        const stream = await openai.chat.completions.create({
          model: "gpt-4",
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
      } else if (model === "claude-3.5-sonnet") {
        const stream = await anthropic.messages.stream({
          model: "claude-3-5-sonnet-20241022",
          max_tokens: 4096,
          messages: messages.map((msg) => ({
            role: msg.role,
            content: msg.content,
          })),
        });

        for await (const chunk of stream) {
          if (
            chunk.type === "content_block_delta" &&
            chunk.delta.type === "text_delta"
          ) {
            const content = chunk.delta.text;
            res.write(`data: ${JSON.stringify({ content })}\n\n`);
          }
        }
      } else if (model === "gemini-pro") {
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
    } catch (error) {
      console.error("Chat API error:", error);
      res.status(500).json({
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
