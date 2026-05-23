# Vercel project settings (801 roster API)

Use **one** setup only. The repo has `vercel.json` inside the **`website`** folder (not the repo root).

## Required settings

| Setting | Value |
|--------|--------|
| **Root Directory** | `website` |
| **Production branch** | `main` (Settings → Environments → Production → Branch tracking) |
| **Framework Preset** | **Other** (not Next.js) — Vite site + `/api` serverless functions |

Do **not** set Root Directory to empty while using the `website` folder layout.

Do **not** build from branch **`gh-pages`** (no `api/` folder there).

## Build and Deployment

Settings are driven by `website/vercel.json` (hybrid static site + `/api` serverless).

| Field | Value |
|--------|--------|
| Root Directory | `website` |
| Framework Preset | **Other** |
| Build Command | *(from vercel.json)* `npm run build` |
| Output Directory | *(from vercel.json)* `dist` via static-build |

## `NOT_FOUND` on `/api/health` or `/api/*`

That plain-text `NOT_FOUND` with an id like `sfo1::...` means **Vercel has no serverless function** at that path (static-only deploy).

1. Confirm **Root Directory** = `website`.
2. Redeploy latest `main` after the `vercel.json` **builds** + `@vercel/node` fix.
3. Test: `https://studio-theta-gules.vercel.app/api/health` → JSON, not `NOT_FOUND`.

## If you see: `website/api/**/*.ts` doesn't match any Serverless Functions

That means Vercel is using an **old root-level `vercel.json`** or Root Directory is wrong.

1. **Root Directory** must be **`website`** (Settings → Build and Deployment).
2. There must be **no** `vercel.json` at the **repo root** (`studio/vercel.json`) — only `website/vercel.json`.
3. Redeploy from **`main`**.

With Root Directory = `website`, functions live at `api/**/*.ts` (e.g. `api/health.ts`, `api/stripe-webhook.ts`).

## After a successful deploy

- `https://studio-theta-gules.vercel.app/api/health`
- `https://studio-theta-gules.vercel.app/api/stripe-webhook` (GET shows plain-text OK message)

GitHub Pages (`npm run deploy`) is separate — www.801familystudios.com for the frontend only.
