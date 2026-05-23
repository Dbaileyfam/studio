import { ensureProfileEditable } from "./lib/rosterAccess.js";
import { corsHeaders, jsonResponse } from "./lib/cors.js";
import { getSupabaseAdmin } from "./lib/supabaseAdmin.js";

export async function OPTIONS(request: Request) {
  return new Response(null, { status: 204, headers: corsHeaders(request) });
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      token?: string;
      profile?: Record<string, unknown>;
    };

    const token = body.token?.trim();
    const profile = body.profile;

    if (!token) {
      return jsonResponse(request, { error: "token is required" }, 400);
    }
    if (!profile || typeof profile !== "object") {
      return jsonResponse(request, { error: "profile is required" }, 400);
    }

    const supabase = getSupabaseAdmin();
    const { data: row, error: lookupError } = await supabase
      .from("roster_profiles")
      .select("id, status, email, full_name")
      .eq("edit_token", token)
      .maybeSingle();

    if (lookupError || !row) {
      return jsonResponse(request, { error: "Invalid or expired edit link" }, 404);
    }

    const access = await ensureProfileEditable(row.id as string);
    if (!access.allowed) {
      return jsonResponse(request, { error: access.message }, 403);
    }

    const fullName = String(profile.fullName ?? row.full_name).trim();
    const email = String(profile.email ?? row.email).trim().toLowerCase();

    const { error: updateError } = await supabase
      .from("roster_profiles")
      .update({
        full_name: fullName,
        email,
        profile,
        updated_at: new Date().toISOString(),
      })
      .eq("id", row.id);

    if (updateError) {
      console.error(updateError);
      return jsonResponse(request, { error: "Could not save profile" }, 500);
    }

    return jsonResponse(request, {
      ok: true,
      message: "Your public roster listing has been updated.",
    });
  } catch (err) {
    console.error(err);
    const message = err instanceof Error ? err.message : "Server error";
    return jsonResponse(request, { error: message }, 500);
  }
}
