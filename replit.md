# Candela - Intelligent Coding Assistant

## Overview

Candela is a web-based intelligent AI chat application that provides conversations with multiple AI models (Perplexity Pro and Gemini) through a clean, dark purple-themed chat interface with text-to-speech capabilities. The application features Firebase authentication (email/password and Google sign-in), stores chat history in Firestore for persistent access across sessions, and includes a skill swap platform for peer-to-peer knowledge exchange.

## Recent Changes (November 9, 2025)

- **Dual Deployment Architecture**: Updated to support Firebase hosting for frontend (qubits-polaris.web.app) with Replit backend (candela-code-mind-MaSTeRgAmEr393.replit.app)
- **CORS Configuration**: Added proper cross-origin headers to enable Firebase frontend to access Replit backend
- **API Configuration**: Environment-aware API routing that automatically detects Firebase hosting vs Replit preview
- **Connect Page Redesign**: Transformed from profile directory to skill swap platform where users exchange expertise
- **Back Navigation**: Replaced logout button on chat page with back arrow to landing page

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
- Firebase Authentication context for user authentication state
- Local React state for UI interactions and chat management
- Firestore for persistent chat history storage

**Key UI Components:**
- `Login` and `Signup`: Authentication pages with dark purple gradient theme (#1a1221, #7312d4)
- `AppSidebar`: Navigation with model selector, chat history, and new chat button
- `ChatMessage`: Renders user and assistant messages with markdown support
- `CodeBlock`: Syntax-highlighted code blocks using react-syntax-highlighter with VS Code Dark+ theme
- `ChatInput`: Auto-expanding textarea for message composition
- `EmptyState`: Welcome screen highlighting key features

**Features:**
- Text-to-speech: Automatically reads aloud the first 2 sentences of AI responses using Web Speech API

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
The application integrates with two AI providers through their official SDKs:
- **Perplexity Pro**: Uses OpenAI-compatible API with streaming chat completions
- **Google Gemini Pro**: Uses `@google/genai` SDK with streaming generation

All models are accessed through a unified interface where the frontend specifies the desired model, and the backend routes requests to the appropriate provider.

### Data Storage

**Firebase Firestore:**
- Chat history stored in Firestore `chats` collection
- Each chat document contains: id, title, messages, userId, createdAt, updatedAt timestamps
- Real-time sync capabilities for chat updates
- Security rules enforce user-based access control (users can only access their own chats)
- Composite index on userId + updatedAt for efficient chat retrieval

**Firestore Schema:**
```typescript
interface Chat {
  id: string;
  title: string;
  timestamp: string;
  messages: Message[];
  userId: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}
```

### Authentication & Authorization

**Firebase Authentication:**
- Email/password authentication
- Google OAuth authentication via Firebase Auth
- Authentication context (`AuthContext`) manages auth state across the app
- Protected routes: unauthenticated users redirected to login page
- Sign-out functionality available in chat interface

**Security Implementation:**
- Firebase Authentication tokens used for user identification
- Firestore security rules ensure users can only access their own data
- Environment variables for Firebase configuration:
  - `VITE_FIREBASE_API_KEY`
  - `VITE_FIREBASE_AUTH_DOMAIN`
  - `VITE_FIREBASE_PROJECT_ID`
  - `VITE_FIREBASE_STORAGE_BUCKET`
  - `VITE_FIREBASE_MESSAGING_SENDER_ID`
  - `VITE_FIREBASE_APP_ID`
- AI provider API keys stored in server environment variables:
  - `PERPLEXITY_API_KEY`
  - `GEMINI_API_KEY`

## External Dependencies

**AI Service Providers:**
- **Perplexity API**: Perplexity Pro model access via OpenAI-compatible endpoint
- **Google Generative AI API**: Gemini Pro model access

**Firebase Services:**
- **Firebase Authentication**: User authentication with email/password and Google OAuth
- **Firebase Firestore**: NoSQL database for chat history persistence
- **Firebase Hosting**: Static site hosting with SPA routing support

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