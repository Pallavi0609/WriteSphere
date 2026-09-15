# WriteSphere

WriteSphere is an AI-powered writing assistant that helps users plan, draft, and polish essays and articles. It combines Google Gemini (via Genkit) for content generation with Firebase for authentication and data storage.

## Core Features

- **AI Outline Generation** – Generates structured essay/article outlines from a topic, tone, and word limit.
- **AI Draft Generation** – Produces full article/essay drafts based on topic, tone, style, and purpose.
- **Grammar & Style Correction** – Two dedicated AI flows: strict grammar-only correction, and broader style/tone improvement (academic, casual, formal, persuasive).
- **Multilingual Support** – English plus Hindi, Tamil, Telugu, Kannada, and Bengali.
- **History Tracking** – Saves past drafts and outlines (topic, date, language) with view/edit/delete.
- **User Dashboard** – Overview of writing sessions, saved drafts, and profile/settings.
- **Authentication** – Email/password and Google sign-in via Firebase Auth, with per-user data isolation enforced through Firestore security rules.

## Tech Stack

- **Framework**: Next.js 15 (App Router), TypeScript, Tailwind CSS, shadcn/ui
- **AI**: Genkit + Google Gemini (`gemini-2.5-flash`)
- **Backend/Auth/DB**: Firebase Auth, Firestore
- **Validation**: Zod schemas for all AI flow inputs/outputs

## AI Flows (`src/ai/flows`)

| Flow | Purpose |
|---|---|
| `generate-essay-outline.ts` | Creates a hierarchical outline from a topic/tone/word limit |
| `generate-article-draft.ts` | Generates a full draft from topic, tone, style, and purpose |
| `correct-grammar.ts` | Grammar/spelling/punctuation-only correction (preserves meaning, tone, and formatting) |
| `improve-style.ts` | Rewrites text for a target tone (academic, casual, formal, persuasive) |
| `check-grammar-and-style.ts` | Combined grammar + style review with suggestions |

## Getting Started

### Prerequisites
- Node.js 18+
- A Firebase project (Auth + Firestore enabled)
- A Google AI (Gemini) API key

### Setup

```bash
npm install
```

Create a `.env.local` file in the project root:

```
GEMINI_API_KEY=your_google_ai_api_key
```

Firebase client config lives in `src/firebase/config.ts`. Firestore access is restricted by `firestore.rules` (per-user ownership on drafts and generation history).

### Run locally

```bash
npm run dev
```

Runs on [http://localhost:9004](http://localhost:9004).

To iterate on AI flows directly (Genkit dev UI):

```bash
npm run genkit:dev
```

### Build for production

```bash
npm run build
npm run start
```

## Project Structure

```
src/
  ai/flows/       # Genkit AI flows (outline, draft, grammar, style)
  app/            # Next.js pages: dashboard, login/signup, history, drafts, admin, etc.
  components/     # Shared UI components (shadcn/ui based)
  firebase/       # Firebase client/admin setup, auth hooks, Firestore hooks
  hooks/          # React hooks
  lib/            # Utilities
docs/
  blueprint.md    # Original product/design spec
firestore.rules    # Firestore security rules (per-user data isolation)
```

## Notes

- This project was scaffolded in Firebase Studio and has since been extended with custom AI flows, auth, and multi-page UI.
- `docs/blueprint.md` contains the original feature/design spec this app was built against.
