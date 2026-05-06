# SoundWave AI — Viral Engine

AI-powered music marketing command center that autonomously generates content, posts across platforms, and tracks campaign analytics.

## Run & Operate

- `npm run dev` — starts Next.js dev server on port 5000 (webpack mode)
- `npm run build` — production build
- `npm run start` — production server

## Stack

- **Framework**: Next.js 16.2.4 (App Router, webpack mode — Turbopack disabled due to CSS url() resolution bug)
- **UI**: Tailwind CSS v4, shadcn/ui (Radix UI), Framer Motion, Recharts
- **Fonts**: Space Grotesk, Syne, JetBrains Mono
- **AI**: Vercel AI SDK (`ai`, `@ai-sdk/react`)
- **State**: Zustand (`lib/store.ts`)
- **Language**: TypeScript 5.7

## Where things live

- `app/` — Next.js App Router pages
  - `app/page.tsx` — Landing page
  - `app/dashboard/` — Dashboard routes (overview, agents, analytics, campaigns, content, platforms, settings)
  - `app/api/agents/` — AI agent API routes
- `components/dashboard/` — Dashboard UI components (sidebar, charts, stats cards, etc.)
- `components/ui/` — shadcn/ui primitives
- `lib/agents/` — Agent logic (analytics, content, posting)
- `lib/store.ts` — Global Zustand store
- `lib/types.ts` — Shared TypeScript types
- `app/globals.css` — Tailwind v4 theme (CREOVA deep graphite + neon palette)

## Architecture decisions

- Webpack used instead of Turbopack (`--webpack` flag) — Turbopack fails to build Tailwind v4 CSS that contains `mask-image: url(...)` arbitrary value utilities
- `css-loader` configured with `url: false` via `next.config.mjs` webpack override to prevent resolution of CSS url() patterns as module paths
- Dark-only theme (no light mode variant), custom oklch color palette
- AI agents are simulated/demo mode — no real platform API keys required by default

## Product

- **Landing page** — Hero section with platform pills, features grid, how-it-works, CTA
- **Dashboard overview** — Stats cards, reach counter, engagement chart, platform breakdown, content queue, agent logs
- **Agents page** — View and control AI agents (analytics, content, posting)
- **Analytics** — Charts and metrics across platforms
- **Campaigns** — Campaign management
- **Content** — Content queue and scheduling
- **Platforms** — Platform connection management
- **Settings** — App configuration

## User preferences

_Populate as you build_

## Gotchas

- Must run with `--webpack` flag — Turbopack breaks Tailwind v4 CSS processing
- `next.config.mjs` has a webpack override that sets `css-loader url: false` — don't remove it

## Pointers

- Tailwind v4 docs: https://tailwindcss.com/docs/v4
- Next.js App Router: https://nextjs.org/docs/app
- Vercel AI SDK: https://sdk.vercel.ai
