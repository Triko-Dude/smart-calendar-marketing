<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Cursor Cloud specific instructions

This repo is a static Next.js 16 (Turbopack) marketing site for "Chrono" — no backend, database, or external services.

- Dev server: `npm run dev` serves on `http://localhost:3000` (the README mentions 3002, but no port is set so `next dev` uses the default 3000).
- No `.env` file is required to run. The README's `cp .env.example .env.local` step is optional (there is no committed `.env.example`); all `NEXT_PUBLIC_*` vars have code defaults.
- Other commands: `npm run lint`, `npm run build`, `npm run start`.
- `npm run lint` currently reports pre-existing warnings/errors in app code; these do not block `npm run build`, which succeeds and statically prerenders all routes.
- The `middleware.ts` deprecation warning ("use proxy instead") is benign and does not affect dev/build.
