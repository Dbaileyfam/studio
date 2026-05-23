# Vercel is still running old API code — redeploy now

The live site (GitHub Pages) is updated, but **Vercel has not redeployed** since the edit-link fix.

Check: open this URL in a browser (POST with curl is easier):

```bash
curl -sS -X POST "https://studio-theta-gules.vercel.app/api/roster-request-edit-link" \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com"}'
```

- **Old API** (needs redeploy): `"sent":false` and message about "inbox and spam"
- **New API** (fixed): `"ok":false` and `"apiVersion":2` in responses when profile exists

## Redeploy in Vercel (about 2 minutes)

1. [vercel.com/dashboard](https://vercel.com/dashboard) → project **studio-theta-gules** (or your roster API project)
2. **Deployments**
3. Click **⋯** on the latest deployment from branch **`main`** (or click **Create Deployment**)
4. Choose branch **`main`** → **Deploy**
5. Wait until status is **Ready**
6. Run the curl check again — you should see `"apiVersion":2`

Also confirm **Settings → Environments → Production → Branch tracking** = **`main`**.

## Get your edit link today (without waiting)

In [Supabase](https://supabase.com/dashboard) → your project → **SQL Editor** → run:

```sql
select
  email,
  full_name,
  'https://www.801familystudios.com/musician-roster/edit?token=' || edit_token::text as edit_url
from roster_profiles
where status = 'active';
```

Open the `edit_url` for your row in the browser.
