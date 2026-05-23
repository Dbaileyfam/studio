# Musician Roster — launch checklist

Work through these in order. Check each box when done.

---

## Step 1 — Fix Vercel API (`/api/health` returns JSON)

### A. Push the config fix

From repo root:

```bash
cd website
git add vercel.json
git commit -m "Fix Vercel API: drop legacy builds, use native api functions"
git push origin main
```

### B. Vercel project settings

[vercel.com/dashboard](https://vercel.com/dashboard) → **studio-theta-gules** (or your roster project):

| Setting | Where | Value |
|--------|--------|--------|
| Root Directory | Settings → Build and Deployment | `website` |
| Framework | Settings → Build and Deployment | **Other** |
| Production branch | Settings → Environments → Production | **`main`** |

### C. Redeploy

1. **Deployments** → latest **`main`** deploy (or **Create Deployment** → branch `main`)
2. Optional: disable build cache for this one redeploy
3. Wait until **Ready**

### D. Verify

Open: `https://studio-theta-gules.vercel.app/api/health`

- **Pass:** JSON with `"ok": true`
- **Fail:** `NOT_FOUND` → Deployment → **Building** tab → confirm **Serverless Functions** lists `api/health`, `api/roster-list`, etc.

---

## Step 2 — Stripe webhook

### Option A — Stripe Dashboard (recommended)

1. [dashboard.stripe.com/webhooks](https://dashboard.stripe.com/webhooks) → **Add destination** (or **Add endpoint**)
2. **Endpoint URL:** `https://studio-theta-gules.vercel.app/api/stripe-webhook`
3. Events (minimum):
   - `checkout.session.completed`
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.payment_failed`
4. Create → **Reveal** signing secret (`whsec_...`)

### Option B — Script

```bash
cd website
export STRIPE_SECRET_KEY=sk_live_...   # from Stripe → Developers → API keys
./scripts/create-stripe-webhook.sh
```

### Add secret on Vercel

1. Vercel → **Settings** → **Environment Variables**
2. Add **`STRIPE_WEBHOOK_SECRET`** = `whsec_...` (Production + Preview)
3. **Deployments** → **Redeploy** latest `main`

### Verify

- Browser GET: `https://studio-theta-gules.vercel.app/api/stripe-webhook` → plain text “POST only…”
- Stripe → your webhook → **Send test event** → should show **200**

---

## Step 3 — Supabase edit tokens (one-time SQL)

1. [supabase.com/dashboard](https://supabase.com/dashboard) → project **uweqigetjzpullofehls**
2. **SQL Editor** → **New query**
3. Paste contents of `website/supabase/roster_profiles_edit_token.sql`
4. **Run**

No error = edit links can be generated.

---

## Step 4 — Turn roster back on (GitHub Pages)

1. In `website/src/lib/musicianRoster.ts` set:

   ```ts
   export const ROSTER_PUBLICLY_DISABLED = false;
   ```

2. Deploy frontend:

   ```bash
   cd website
   npm run deploy
   ```

3. After ~2 min, visit [801familystudios.com/musician-roster](https://www.801familystudios.com/musician-roster) — should show the roster hub (not “on pause”).

---

## Step 5 — End-to-end test

| # | Action | Expected |
|---|--------|----------|
| 1 | `/api/health` on Vercel | `ok: true`, supabase + stripe true |
| 2 | Browse musicians on www site | Lists active profiles (or empty if none) |
| 3 | Submit profile form → Stripe Checkout | Redirects to Stripe, then thank-you |
| 4 | Thank-you / webhook | Profile `active` in Supabase |
| 5 | Edit page → enter roster email → **Get my edit link** | Link appears on page (`apiVersion: 2`) |
| 6 | Open edit link → save changes | Browse shows updates |
| 7 | Cancel subscription in Stripe | Profile hidden from browse; edit blocked |

---

## Quick links

- Vercel API health: https://studio-theta-gules.vercel.app/api/health
- Stripe webhook URL: https://studio-theta-gules.vercel.app/api/stripe-webhook
- Live roster: https://www.801familystudios.com/musician-roster
