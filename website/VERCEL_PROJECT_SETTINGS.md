# Vercel project settings (801 roster API)

Use **one** setup only. The repo has `vercel.json` inside the **`website`** folder (not the repo root).

## Required settings

| Setting | Value |
|--------|--------|
| **Root Directory** | **Leave empty** (repo root) — build runs via `/vercel.json` → `cd website && …` |
| **Production branch** | **`main`** (Settings → Environments → Production → Branch tracking) |
| **Framework Preset** | **Other** (not Next.js) — Vite site + `/api` serverless functions |

Do **not** set Root Directory to empty while using the `website` folder layout.

Do **not** build from branch **`gh-pages`** — that branch is static-only (built `dist/`). It has **no `website/` folder**, which causes:

> The specified Root Directory "website" does not exist.

## Fix: Root Directory "website" does not exist

Do these in order. **Branch is not under Git anymore** in the current Vercel dashboard.

### Step 1 — Production branch (`main`, not `gh-pages`)

1. [vercel.com](https://vercel.com) → open your project (e.g. `studio-theta-gules`)
2. Top tabs: **Settings** (not Deployments)
3. **Left sidebar** → **Environments** (under “Build and Deployment” or its own item)
4. Click the **Production** row/card (not Preview)
5. Find **Branch Tracking** (or “Branch”)
6. Change the branch name to **`main`** → **Save**

If you do not see **Environments** in the sidebar, use the Settings search box and type `branch` or `production`.

### Step 2 — Root Directory (leave empty)

If saving **`website`** as Root Directory fails even on **`main`**, use the repo-root `vercel.json` instead:

1. **Settings** → **Build and Deployment** → **Root Directory**
2. **Clear the field** (empty / `.` — not `website`) → **Save**
3. Builds use `/vercel.json` at the repo root, which runs `cd website && npm run build`

**Why `website` might fail:** the connected repo in Vercel must be **`Dbaileyfam/studio`** (monorepo). If the project was linked to a copy of the app without a `website/` folder, or Root Directory is set to `website` when the app is already at the repo root, validation fails.

**Optional (monorepo layout):** Root Directory = `website` also works when Git shows `Dbaileyfam/studio` and you can save it without error. Do not use both — pick empty + root `vercel.json` **or** `website` as root, not both.

### Step 3 — Redeploy

1. **Deployments** tab
2. Open the latest deployment from branch **`main`**
3. **⋯** menu → **Redeploy**

Or push any commit to `main` to trigger a new build.

### What the Git page is for

**Settings → Git** only shows the connected repo (GitHub), deploy hooks, and PR comments — **not** production branch or root directory.

If Production Branch is already `main` and you still see the error:

- Confirm the Git repo is **`Dbaileyfam/studio`** (monorepo with a `website/` folder on `main`), not a separate repo that only contains the app at the root.
- If the app lives at the **repo root** (no `website/` folder), set Root Directory to **empty** instead — but then `/api/*` must live at `api/` in that repo layout (this project expects `website/api/`).

## Build and Deployment

Settings are driven by `website/vercel.json` (`buildCommand` + `outputDirectory` + native `api/**/*.ts` functions — no legacy `builds` block).

| Field | Value |
|--------|--------|
| Root Directory | `website` |
| Framework Preset | **Other** |
| Build Command | *(from vercel.json)* `npm run build` |
| Output Directory | *(from vercel.json)* `dist` via static-build |

## `NOT_FOUND` on `/api/health` or `/api/*`

That plain-text `NOT_FOUND` with an id like `sfo1::...` means **Vercel has no serverless function** at that path (static-only deploy).

1. Confirm **Root Directory** = `website`.
2. Redeploy latest `main` after the `vercel.json` fix (native `functions`, no `builds` array).
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
