# Vercel build fix — “Root Directory website does not exist”

The roster API lives in the **`website`** folder on the **`main`** branch.

The **`gh-pages`** branch only contains the built static site (`index.html`, `assets/`) — it has **no** `website/` folder. If Vercel builds `gh-pages` with Root Directory `website`, the build fails.

## Fix in Vercel (pick one setup)

### Option A — Recommended (monorepo, root `vercel.json`)

1. [Vercel Dashboard](https://vercel.com/dashboard) → your project (e.g. `studio-theta-gules`) → **Settings** → **General**
2. **Root Directory** → leave **empty** (or click **Edit** → clear the field → **Save**)
3. **Settings** → **Git** → **Production Branch** → **`main`** (not `gh-pages`)
4. **Deployments** → **Redeploy** latest `main`

The repo root `vercel.json` runs `cd website && npm run build` and deploys `website/api` functions.

### Option B — Subfolder root

1. **Root Directory** → **`website`**
2. **Production Branch** → **`main`**
3. Redeploy

Do **not** use Root Directory `website` with branch `gh-pages`.

## After a successful deploy

- Health: `https://YOUR-PROJECT.vercel.app/api/health`
- Roster list: `https://YOUR-PROJECT.vercel.app/api/roster-list`

GitHub Pages (`npm run deploy`) stays on **`gh-pages`** for www.801familystudios.com — that is separate from Vercel (API only).
