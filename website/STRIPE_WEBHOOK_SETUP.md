# Stripe webhook setup (Musician Roster)

The webhook **already exists** on Vercel. You do not create it in Vercel — you **register this URL in Stripe** and add one env var on Vercel.

## “All events” shows nothing — that is normal

On **All events**, Stripe does **not** show a list. There are zero rows under that option. Pick **All events**, then click **Continue** anyway.

If **Selected events** is also completely empty (no Checkout / Customer sections at all), the Dashboard picker is broken for your account — **skip the UI** and use the script below.

## Bypass Stripe UI (recommended if the event list is empty)

1. Copy **`STRIPE_SECRET_KEY`** from Vercel (same value as on the project) or Stripe → **Developers** → **API keys** (Secret key, **Live** mode if roster is live).
2. In Terminal, from the `website` folder:

```bash
cd website
chmod +x scripts/create-stripe-webhook.sh
export STRIPE_SECRET_KEY=sk_live_YOUR_KEY_HERE
./scripts/create-stripe-webhook.sh
```

3. Copy the **`secret`** (`whsec_...`) from the output.
4. Vercel → **Environment Variables** → **`STRIPE_WEBHOOK_SECRET`** = that value → **Redeploy**.

This uses Stripe’s classic API and registers the same five events the roster needs.

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

## Step 1 — Add the destination in Stripe (new “Event destinations” UI)

1. Go to [dashboard.stripe.com](https://dashboard.stripe.com) → **Developers** → **Webhooks** (or **Workbench** → **Webhooks**).
2. Click **+ Add destination** (or **Create new destination**).

### Screen: “Configure your event destination”

**Event destination scope**

- Choose **Your account** (first option).  
- Do **not** choose **Connected accounts** unless you use Stripe Connect for other businesses.

**API version**

- Leave the default (e.g. `2026-04-22.dahlia`) — that is fine.

**Events**

Stripe’s new picker often **does not add events from the search box** (you type, nothing happens). Use one of these instead:

**Easiest (recommended):** choose **All events**, then **Continue**.  
Our server only acts on the 5 roster events below; extra events are ignored.

**Or pick events manually (no search):**

1. Stay on **Selected events**.
2. **Scroll** the list — do not rely on search.
3. Expand these sections and **check the box** next to each name:
   - **Checkout** → `checkout.session.completed`
   - **Customer** → `customer.subscription.created`, `customer.subscription.updated`, `customer.subscription.deleted`
   - **Invoice** → `invoice.payment_failed`
4. Try short search terms only if needed: `checkout`, `subscription`, `invoice` (not the full dotted name).

**Test vs Live:** use the same mode (toggle top-right) as your real $9/month roster payments.

You should see **Selected events** count go up (or use **All events**).

Click **Continue** (or **Next**).

### If search still does nothing

- Refresh the page and try again, or use **All events**.
- Make sure **Your account** is selected (not Connected accounts).
- On a later step, if asked **Snapshot** vs **Thin** payload, choose **Snapshot** (classic events our API expects).

### Next screen: destination type

- Choose **Webhook** / **Webhook endpoint** (not Amazon EventBridge or Azure).
- Click **Continue**.

### Next screen: endpoint URL

- **Endpoint URL:**  
  `https://studio-theta-gules.vercel.app/api/stripe-webhook`
- Optional description: `801 Musician Roster`
- Click **Create destination** / **Add endpoint**.

If you never see a URL field, you are still on the events screen — finish selecting the 5 events above, then Continue.

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
