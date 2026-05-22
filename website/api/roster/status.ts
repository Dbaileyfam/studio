import { corsHeaders, jsonResponse } from "../lib/cors";
import { getSupabaseAdmin } from "../lib/supabaseAdmin";

export async function OPTIONS(request: Request) {
  return new Response(null, { status: 204, headers: corsHeaders(request) });
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const profileId = searchParams.get("profile_id")?.trim();

    if (!profileId) {
      return jsonResponse(request, { error: "profile_id is required" }, 400);
    }

    const supabase = getSupabaseAdmin();
    const { data, error } = await supabase
      .from("roster_profiles")
      .select("id, status, email, full_name")
      .eq("id", profileId)
      .maybeSingle();

    if (error) {
      console.error(error);
      return jsonResponse(request, { error: "Lookup failed" }, 500);
    }

    if (!data) {
      return jsonResponse(request, { error: "Profile not found" }, 404);
    }

    return jsonResponse(request, {
      profileId: data.id,
      status: data.status,
      email: data.email,
      fullName: data.full_name,
    });
  } catch (err) {
    console.error(err);
    const message = err instanceof Error ? err.message : "Server error";
    return jsonResponse(request, { error: message }, 500);
  }
}
