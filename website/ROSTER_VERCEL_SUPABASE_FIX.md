# Fix: `detail: "TypeError: fetch failed"`

This means Vercel **cannot reach** your Supabase project URL (network/DNS), not a missing table.

## Fix in 3 steps

### 1. Copy the exact URL from Supabase

1. [supabase.com/dashboard](https://supabase.com/dashboard) → your project  
2. **Project Settings** (gear) → **API**  
3. Under **Project URL**, click **Copy**  
   - Must look like: `https://abcdefghijklmnop.supabase.co`  
   - **No** `/rest/v1/` at the end  

### 2. Copy the secret key (try legacy if needed)

On the same **API** page:

**Option A (recommended first):** **Legacy API Keys** → **service_role** → reveal → copy  
- Starts with `eyJ...` (long JWT)

**Option B:** **Secret keys** → `sb_secret_...`

Use **one** of these as `SUPABASE_SERVICE_ROLE_KEY` in Vercel (not the publishable `sb_publishable_` key).

### 3. Update Vercel and redeploy

1. Vercel → **studio** → **Settings** → **Environment Variables**  
2. Edit **`SUPABASE_URL`** → paste Project URL only  
3. Edit **`SUPABASE_SERVICE_ROLE_KEY`** → paste service_role / sb_secret  
4. **Deployments** → **Redeploy** → **uncheck** build cache  

### 4. Test

Open: `https://studio-theta-gules.vercel.app/api/health`

Look for `"supabase": { "ok": true, "status": 200 }`.

Then: `https://studio-theta-gules.vercel.app/api/roster-list`  
Should show: `{"profiles":[]}`

## Also check

- Supabase project is **not paused** (free tier pauses after inactivity — open dashboard and resume).  
- No typo in the URL (every character must match the dashboard copy).
