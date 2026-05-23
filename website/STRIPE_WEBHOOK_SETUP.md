# Stripe webhook setup (Musician Roster)

The webhook **already exists** on Vercel. You do not create it in Vercel — you **register this URL in Stripe** and add one env var on Vercel.

## Your webhook URL (copy exactly)

Use your real Vercel project URL if it is not `studio-theta-gules`:

```
https://studio-theta-gules.vercel.app/api/stripe-webhook
```

Alternate (same handler):

```
https://studio-theta-gules.vercel.app/api/stripe/webhook
```

**Test in a browser:** open the first URL. You should see plain text:

`Stripe webhook endpoint (POST only). Configure this URL in Stripe Dashboard → Webhooks.`

If you get 404, Vercel is not deployed from `main` yet — redeploy first (see `VERCEL_REDEPLOY_NOW.md`).

---

## Step 1 — Add the endpoint in Stripe

1. Go to [dashboard.stripe.com](https://dashboard.stripe.com) → **Developers** (top right).
2. Click **Webhooks** in the left sidebar (under Developers).
3. Click **Add endpoint** (or **+ Add destination** → **Webhook endpoint** on newer dashboards).
4. **Endpoint URL:** paste  
   `https://studio-theta-gules.vercel.app/api/stripe-webhook`
5. **Listen to:** choose **Events on your account** (default).
6. **Select events** — add all of these:
   - `checkout.session.completed`
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.payment_failed`
7. Click **Add endpoint** / **Create**.

## Step 2 — Copy the signing secret

1. Open the webhook you just created.
2. Find **Signing secret** → click **Reveal**.
3. Copy the value (starts with `whsec_`).

## Step 3 — Add it on Vercel

1. [vercel.com/dashboard](https://vercel.com/dashboard) → your roster API project.
2. **Settings** → **Environment Variables**.
3. Add:
   - **Name:** `STRIPE_WEBHOOK_SECRET`
   - **Value:** `whsec_...` (paste from Stripe)
   - **Environments:** Production (and Preview if you test there)
4. **Save**.
5. **Deployments** → **Redeploy** the latest `main` deployment (required so the new variable loads).

## Step 4 — Confirm it works

In Stripe → **Webhooks** → your endpoint → **Send test webhook** → pick `customer.subscription.updated` → Send.

- **Success:** recent deliveries show `200`.
- **Failed `503`:** `STRIPE_WEBHOOK_SECRET` missing on Vercel — repeat Step 3 and redeploy.
- **Failed `400`:** signature mismatch — wrong secret or old deployment.

---

## All roster API URLs (reference)

| Purpose | URL |
|--------|-----|
| Health check | `GET /api/health` |
| Public roster list | `GET /api/roster-list` or `/api/roster/list` |
| Stripe webhook | `POST /api/stripe-webhook` or `/api/stripe/webhook` |
| Request edit link | `POST /api/roster-request-edit-link` |

Live site (GitHub Pages) does **not** host these — only Vercel does.
