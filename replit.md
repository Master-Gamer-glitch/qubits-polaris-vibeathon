# Candela - Intelligent Coding Assistant

## Overview

Candela is a web-based intelligent coding assistant that provides code generation, modifications, and technical discussions powered by multiple state-of-the-art AI language models. The application allows users to interact with different AI models (GPT-4, Claude 3.5 Sonnet, and Gemini Pro) through a clean, developer-focused chat interface with sophisticated code rendering capabilities.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build System:**
- React 18 with TypeScript for type-safe component development
- Vite as the build tool and development server for fast HMR and optimized production builds
- Wouter for lightweight client-side routing

**UI Component Strategy:**
- shadcn/ui component library (New York style variant) built on Radix UI primitives
- Tailwind CSS for utility-first styling with custom design tokens
- Design system inspired by Linear, VS Code, and ChatGPT with focus on developer clarity
- Typography: Inter for UI elements, JetBrains Mono for code blocks
- Dark mode as default theme with CSS variables for theming

**State Management:**
- TanStack Query (React Query) for server state management and API data fetching
- Local React state for UI interactions and chat management
- No messages are currently persisted to a database (in-memory only)

**Key UI Components:**
- `AppSidebar`: Navigation with model selector, chat history, and new chat button
- `ChatMessage`: Renders user and assistant messages with markdown support
- `CodeBlock`: Syntax-highlighted code blocks using react-syntax-highlighter with VS Code Dark+ theme
- `ChatInput`: Auto-expanding textarea for message composition
- `EmptyState`: Welcome screen highlighting key features

### Backend Architecture

**Server Framework:**
- Express.js for HTTP server and API routing
- Server-side rendering setup for Vite in development mode
- Session management infrastructure via connect-pg-simple (configured but sessions not actively used in current implementation)

**API Design:**
- RESTful API with streaming support for AI responses
- `/api/chat` endpoint handles chat completions with Server-Sent Events (SSE) for real-time streaming
- Zod schemas for request/response validation (`chatRequestSchema`, `messageSchema`)

**AI Model Integration:**
The application integrates with three AI providers through their official SDKs:
- **OpenAI** (GPT-4): Uses `openai` SDK with streaming chat completions
- **Anthropic** (Claude 3.5 Sonnet): Uses `@anthropic-ai/sdk` with message streaming
- **Google** (Gemini Pro): Uses `@google/genai` SDK with streaming generation

All models are accessed through a unified interface where the frontend specifies the desired model, and the backend routes requests to the appropriate provider.

### Data Storage

**Current Implementation:**
- In-memory storage via `MemStorage` class (placeholder implementation)
- No persistent storage of chat history or user data
- Sessions configured with connect-pg-simple but not actively used

**Database Configuration:**
- Drizzle ORM configured with PostgreSQL dialect
- Database schema defined in `shared/schema.ts` (currently minimal, only chat request schemas)
- Migration system set up via drizzle-kit
- `@neondatabase/serverless` for PostgreSQL connectivity (likely targeting Neon serverless Postgres)

**Future Persistence Considerations:**
The architecture is prepared for adding persistent storage with:
- Schema definitions ready for Drizzle ORM
- Database URL configuration in place
- Migration tooling configured

### Authentication & Authorization

**Current State:**
- No authentication system implemented
- No user management or authorization checks
- API keys for AI providers stored in environment variables
- Sessions infrastructure configured but not enforced

**Security Posture:**
- API endpoints are currently open without authentication
- AI provider API keys must be configured via environment variables:
  - `OPENAI_API_KEY`
  - `ANTHROPIC_API_KEY`
  - `GEMINI_API_KEY`

## External Dependencies

**AI Service Providers:**
- **OpenAI API**: GPT-4 model access for chat completions
- **Anthropic API**: Claude 3.5 Sonnet model access
- **Google Generative AI API**: Gemini Pro model access

**Database:**
- **PostgreSQL**: Configured via `DATABASE_URL` environment variable, likely using Neon serverless
- Drizzle ORM for database operations and migrations

**Third-Party Libraries:**
- **Radix UI**: Headless UI component primitives for accessibility
- **shadcn/ui**: Pre-built component implementations
- **react-syntax-highlighter**: Code syntax highlighting with Prism
- **react-markdown**: Markdown rendering with GitHub Flavored Markdown support
- **Tailwind CSS**: Utility-first CSS framework

**Development Tools:**
- **Replit-specific plugins**: Runtime error overlay, cartographer, and dev banner for Replit environment
- **TypeScript**: Type checking across client and server
- **ESBuild**: Server bundle production builds
- **PostCSS**: CSS processing with Autoprefixer

**Font Services:**
- **Google Fonts**: Inter and JetBrains Mono font families