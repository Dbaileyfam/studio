function normalizeSupabaseUrl(raw: string): string {
  return raw.replace(/\/rest\/v1\/?$/i, "").replace(/\/$/, "");
}

async function probeSupabase(): Promise<{
  configured: boolean;
  urlHost?: string;
  ok?: boolean;
  status?: number;
  error?: string;
}> {
  const rawUrl = process.env.SUPABASE_URL?.trim();
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();
  if (!rawUrl || !key) {
    return { configured: false };
  }

  const url = normalizeSupabaseUrl(rawUrl);
  let urlHost = url;
  try {
    urlHost = new URL(url).host;
  } catch {
    return { configured: true, ok: false, error: "SUPABASE_URL is not a valid URL" };
  }

  try {
    const res = await fetch(`${url}/rest/v1/roster_profiles?select=id&limit=1`, {
      headers: {
        apikey: key,
        Authorization: `Bearer ${key}`,
      },
    });
    return { configured: true, urlHost, ok: res.ok, status: res.status };
  } catch (err) {
    return {
      configured: true,
      urlHost,
      ok: false,
      error: err instanceof Error ? err.message : "fetch failed",
    };
  }
}

/** Simple check that serverless functions run and can reach Supabase. */
export async function GET() {
  const supabase = await probeSupabase();
  return Response.json({
    ok: true,
    env: {
      supabaseUrlSet: Boolean(process.env.SUPABASE_URL?.trim()),
      supabaseKeySet: Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY?.trim()),
      stripe: Boolean(process.env.STRIPE_SECRET_KEY?.trim()),
    },
    supabase,
  });
}
