#!/usr/bin/env bash
# Create a classic Stripe webhook (bypasses the empty Workbench event picker).
# Usage:
#   export STRIPE_SECRET_KEY=sk_live_...   # same key as on Vercel
#   ./scripts/create-stripe-webhook.sh
#
# Or one line:
#   STRIPE_SECRET_KEY=sk_live_... ./scripts/create-stripe-webhook.sh

set -euo pipefail

WEBHOOK_URL="${WEBHOOK_URL:-https://studio-theta-gules.vercel.app/api/stripe-webhook}"

if [[ -z "${STRIPE_SECRET_KEY:-}" ]]; then
  echo "Error: set STRIPE_SECRET_KEY (from Stripe Dashboard → Developers → API keys, or copy from Vercel env)."
  exit 1
fi

echo "Creating webhook → $WEBHOOK_URL"
echo ""

response="$(curl -sS https://api.stripe.com/v1/webhook_endpoints \
  -u "$STRIPE_SECRET_KEY:" \
  -d "url=$WEBHOOK_URL" \
  -d "description=801 Musician Roster" \
  -d "enabled_events[]=checkout.session.completed" \
  -d "enabled_events[]=customer.subscription.created" \
  -d "enabled_events[]=customer.subscription.updated" \
  -d "enabled_events[]=customer.subscription.deleted" \
  -d "enabled_events[]=invoice.payment_failed")"

if command -v python3 >/dev/null 2>&1; then
  echo "$response" | python3 -m json.tool
  secret="$(echo "$response" | python3 -c "import sys,json; print(json.load(sys.stdin).get('secret',''))" 2>/dev/null || true)"
else
  echo "$response"
  secret=""
fi

echo ""
if [[ -n "$secret" && "$secret" == whsec_* ]]; then
  echo "Next steps:"
  echo "1. Vercel → Settings → Environment Variables"
  echo "2. Add STRIPE_WEBHOOK_SECRET = $secret"
  echo "3. Redeploy Vercel (main)"
else
  echo "If you see an error above, fix it and run again."
  echo "On success, copy the \"secret\" field (whsec_...) into Vercel as STRIPE_WEBHOOK_SECRET."
fi
