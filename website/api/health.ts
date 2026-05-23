/** Simple check that serverless functions run (no Supabase required). */
export async function GET() {
  return Response.json({
    ok: true,
    supabase: Boolean(process.env.SUPABASE_URL?.trim()),
    stripe: Boolean(process.env.STRIPE_SECRET_KEY?.trim()),
  });
}
