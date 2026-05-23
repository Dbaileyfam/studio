import { corsHeaders, jsonResponse } from "../roster-server/cors.js";
import { getSupabaseAdmin } from "../roster-server/supabaseAdmin.js";

export async function OPTIONS(request: Request) {
  return new Response(null, { status: 204, headers: corsHeaders(request) });
}

export async function GET(request: Request) {
  try {
    const supabase = getSupabaseAdmin();
    const { data, error } = await supabase
      .from("roster_profiles")
      .select("id, full_name, profile, updated_at")
      .eq("status", "active")
      .order("updated_at", { ascending: false });

    if (error) {
      console.error(error);
      return jsonResponse(
        request,
        { error: "Could not load roster", detail: error.message },
        500
      );
    }

    const profiles = (data ?? []).map((row) => ({
      id: row.id as string,
      fullName: row.full_name as string,
      profile: row.profile as Record<string, unknown>,
    }));

    return jsonResponse(request, { profiles });
  } catch (err) {
    console.error(err);
    const message = err instanceof Error ? err.message : "Server error";
    return jsonResponse(request, { error: message }, 500);
  }
}
