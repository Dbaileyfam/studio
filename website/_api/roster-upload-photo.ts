import { corsHeaders, jsonResponse } from "../roster-server/cors.js";
import { ensureProfileEditable } from "../roster-server/rosterAccess.js";
import { uploadRosterProfilePhoto } from "../roster-server/rosterPhotoUpload.js";
import { getSupabaseAdmin } from "../roster-server/supabaseAdmin.js";

export async function OPTIONS(request: Request) {
  return new Response(null, { status: 204, headers: corsHeaders(request) });
}

export async function POST(request: Request) {
  try {
    const form = await request.formData();
    const token = String(form.get("token") ?? "").trim();
    const file = form.get("file");

    if (!token) {
      return jsonResponse(request, { error: "token is required" }, 400);
    }
    if (!(file instanceof File) || file.size === 0) {
      return jsonResponse(request, { error: "file is required" }, 400);
    }

    const supabase = getSupabaseAdmin();
    const { data: row, error: lookupError } = await supabase
      .from("roster_profiles")
      .select("id")
      .eq("edit_token", token)
      .maybeSingle();

    if (lookupError || !row) {
      return jsonResponse(request, { error: "Invalid or expired edit link" }, 404);
    }

    const profileId = row.id as string;
    const access = await ensureProfileEditable(profileId);
    if (access.allowed === false) {
      return jsonResponse(request, { error: access.message }, 403);
    }

    const contentType = file.type || "image/jpeg";
    const bytes = await file.arrayBuffer();
    const url = await uploadRosterProfilePhoto(profileId, bytes, contentType);

    return jsonResponse(request, { ok: true, url });
  } catch (err) {
    console.error(err);
    const message = err instanceof Error ? err.message : "Upload failed";
    return jsonResponse(request, { error: message }, 500);
  }
}
