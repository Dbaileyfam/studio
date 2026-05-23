import { ensureProfileEditable } from "../roster-server/rosterAccess.js";
import { corsHeaders, jsonResponse } from "../roster-server/cors.js";
import { getSupabaseAdmin } from "../roster-server/supabaseAdmin.js";

export async function OPTIONS(request: Request) {
  return new Response(null, { status: 204, headers: corsHeaders(request) });
}

/** Load profile for self-service edit (requires secret edit_token from thank-you email/page). */
export async function GET(request: Request) {
  try {
    const token = new URL(request.url).searchParams.get("token")?.trim();
    if (!token) {
      return jsonResponse(request, { error: "token is required" }, 400);
    }

    const supabase = getSupabaseAdmin();
    const { data, error } = await supabase
      .from("roster_profiles")
      .select("id, status, email, full_name, profile")
      .eq("edit_token", token)
      .maybeSingle();

    if (error) {
      console.error(error);
      return jsonResponse(request, { error: "Could not load profile" }, 500);
    }

    if (!data) {
      return jsonResponse(request, { error: "Invalid or expired edit link" }, 404);
    }

    const access = await ensureProfileEditable(data.id as string);
    if (access.allowed === false) {
      return jsonResponse(request, { error: access.message }, 403);
    }

    const profile = data.profile as Record<string, unknown>;
    return jsonResponse(request, {
      profileId: data.id,
      email: data.email,
      fullName: data.full_name,
      profile: {
        ...profile,
        email: data.email,
        fullName: data.full_name,
      },
    });
  } catch (err) {
    console.error(err);
    const message = err instanceof Error ? err.message : "Server error";
    return jsonResponse(request, { error: message }, 500);
  }
}
