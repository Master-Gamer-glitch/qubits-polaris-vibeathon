# Candela Design Guidelines

## Design Approach
**Reference-Based Approach** drawing from:
- **Primary:** Linear (clean interface, excellent typography, developer-focused)
- **Secondary:** VS Code (code presentation, syntax highlighting patterns)
- **Tertiary:** ChatGPT (chat interaction patterns, message threading)

**Key Principles:**
1. Developer-first clarity and efficiency
2. Scannable code with proper hierarchy
3. Distraction-free focus on conversation
4. Professional, technical aesthetic

## Typography System

**Font Families:**
- Interface: Inter (Google Fonts) - All UI elements, chat messages
- Code: JetBrains Mono (Google Fonts) - Code blocks, inline code

**Hierarchy:**
- H1: text-2xl font-semibold (Main title: "Candela")
- H2: text-lg font-semibold (Section headers)
- Body: text-sm (Chat messages, UI text)
- Code inline: text-xs font-mono (Inline code snippets)
- Code blocks: text-sm font-mono (Code generation output)
- Labels: text-xs font-medium uppercase tracking-wide (Model selector, settings)

## Layout System

**Spacing Primitives:** Use Tailwind units of 2, 3, 4, 6, and 8 consistently.
- Micro spacing: p-2, gap-2 (tight groupings)
- Standard spacing: p-4, gap-4 (component padding)
- Section spacing: p-6, gap-6 (larger separations)
- Major spacing: p-8, gap-8 (layout-level divisions)

**Structure:**
- Fixed sidebar: w-64 (model selector, settings, chat history)
- Main chat area: flex-1 with max-w-4xl centered content
- Input area: Fixed bottom with backdrop blur
- Message width: max-w-3xl for optimal code readability

## Component Library

### Navigation & Sidebar
- Model selector dropdown at top (prominent placement)
- Chat history list with truncated titles
- Settings/preferences toggle
- New chat button (primary CTA)

### Chat Interface
**Message Layout:**
- User messages: Right-aligned with subtle background
- AI messages: Left-aligned, full width for code
- Avatar icons: 8x8 or 10x10 for sender identification
- Timestamp: text-xs opacity-60

**Code Blocks:**
- Language label (top-right corner)
- Copy button (hover state, top-right)
- Line numbers for blocks >10 lines
- Syntax highlighting via Prism.js or Highlight.js
- Horizontal scroll for long lines
- Rounded corners (rounded-lg)
- Padding: p-4

### Input Area
- Multi-line textarea with auto-expand (max 6 lines before scroll)
- Send button (icon or text)
- File attachment option (future-ready)
- Character/token counter (subtle, bottom-right)

### Utility Components
- Copy-to-clipboard: Icon button with success feedback
- Model badge: Small pill showing active model
- Loading states: Typing indicator (animated dots)
- Error messages: Inline with retry option

## Responsive Behavior

**Desktop (lg:):**
- Persistent sidebar
- Two-column layout
- Full chat width

**Tablet (md:):**
- Collapsible sidebar with hamburger menu
- Full-width chat when sidebar hidden

**Mobile (base):**
- Hidden sidebar (slide-in menu)
- Stack all elements vertically
- Fixed input at bottom

## Icon Library
Use **Heroicons** (outline style) via CDN for consistency:
- Send, Copy, Settings, Menu, Plus, Trash, Check icons

## Animations
**Minimal and Purposeful:**
- Message appearance: Subtle fade-in (150ms)
- Copy feedback: Checkmark replacement (200ms)
- Sidebar toggle: Smooth slide (250ms)
- NO scroll animations, parallax, or decorative motion

## Images
**No hero images** - This is a utility application focused on chat interaction. The interface should launch directly into the chat experience without marketing elements.

## Accessibility
- High contrast ratios for code and text
- Keyboard navigation for all interactions
- Focus indicators on interactive elements
- ARIA labels for icon-only buttons
- Screen reader friendly chat message structure

---

**Critical Implementation Notes:**
- Dark mode is the primary interface (developer preference)
- Code blocks must handle syntax highlighting for Python, HTML, CSS, JavaScript
- Messages stream in real-time character-by-character
- Maintain chat history scroll position when new messages arrive
- Input area remains accessible at all times (sticky positioning)