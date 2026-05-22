# Musician Roster — automatic pay-after-profile

## Flow

1. Musician completes the profile form (no payment required first).
2. API saves the profile in Supabase as `pending_payment`.
3. Browser redirects to Stripe Checkout ($9/month).
4. Stripe webhook marks the profile `active` automatically — no manual approval to *start* the profile.
5. You still receive an email when a subscription goes active.

## One-time setup

### 1. Supabase

1. Create a project at [supabase.com](https://supabase.com).
2. Run `supabase/roster_profiles.sql` in the SQL editor.

### 2. Stripe

1. **Product** — $9/month subscription (you may already have this).
2. Copy the **Price ID** (`price_...`) → `STRIPE_ROSTER_PRICE_ID`.
3. **Developers → API keys** — Secret key → `STRIPE_SECRET_KEY`.
4. **Developers → Webhooks → Add endpoint**
   - URL: `https://YOUR-VERCEL-DEPLOYMENT.vercel.app/api/stripe/webhook`
   - Events: `checkout.session.completed`, `customer.subscription.deleted`
   - Copy signing secret → `STRIPE_WEBHOOK_SECRET`.

You do **not** need a Payment Link redirect URL anymore; Checkout is created by the API after the profile is saved.

### 3. Vercel (hosts API + optional full site)

1. Import the `website` folder as a Vercel project.
2. Add all variables from `.env.example`.
3. Deploy. Copy the deployment URL.
4. If the marketing site stays on GitHub Pages, set  
   `VITE_ROSTER_API_BASE=https://your-project.vercel.app`  
   and rebuild/redeploy the frontend.

### 4. GitHub Pages (optional split)

- Frontend: `npm run deploy` → gh-pages (as today).
- API: Vercel only, with `VITE_ROSTER_API_BASE` pointing at Vercel.

Or deploy everything on Vercel and use the custom domain there instead of gh-pages.

## Public roster page

- URL: `/musician-roster/browse`
- API: `GET /api/roster/list` returns profiles with `status = active`
- Cards use the same layout as Featured Artists (no email/phone exposed publicly)

## Fallback

If the API is not configured, the form falls back to email via FormSubmit and the Stripe Payment Link on the roster page.
