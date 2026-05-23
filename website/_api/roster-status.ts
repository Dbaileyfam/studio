import { corsHeaders, jsonResponse } from "../roster-server/cors.js";
import { ensureRosterEditToken, rosterEditUrl } from "../roster-server/rosterEditToken.js";
import { getSupabaseAdmin } from "../roster-server/supabaseAdmin.js";
import { syncRosterProfileSubscription } from "../roster-server/rosterSubscriptionSync.js";

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
      .select("id, status, email, full_name, edit_token")
      .eq("id", profileId)
      .maybeSingle();

    if (error) {
      console.error(error);
      return jsonResponse(request, { error: "Lookup failed" }, 500);
    }

    if (!data) {
      return jsonResponse(request, { error: "Profile not found" }, 404);
    }

    const status = await syncRosterProfileSubscription(data.id as string);

    let editToken = data.edit_token as string | undefined;
    if (status === "active" && !editToken) {
      editToken = (await ensureRosterEditToken(supabase, data.id as string)) ?? undefined;
    }
    const editUrl = status === "active" && editToken ? rosterEditUrl(editToken) : undefined;

    return jsonResponse(request, {
      profileId: data.id,
      status,
      email: data.email,
      fullName: data.full_name,
      editUrl,
    });
  } catch (err) {
    console.error(err);
    const message = err instanceof Error ? err.message : "Server error";
    return jsonResponse(request, { error: message }, 500);
  }
}
