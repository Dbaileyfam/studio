import { getSupabaseAdmin } from "./supabaseAdmin.js";

const BUCKET = "roster-photos";
const MAX_BYTES = 5 * 1024 * 1024;
const ALLOWED_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
]);

function extensionForType(contentType: string): string {
  if (contentType === "image/png") return "png";
  if (contentType === "image/webp") return "webp";
  if (contentType === "image/gif") return "gif";
  return "jpg";
}

/** Upload profile photo; returns public URL stored in profile.profilePhotoLink */
export async function uploadRosterProfilePhoto(
  profileId: string,
  bytes: ArrayBuffer,
  contentType: string
): Promise<string> {
  if (!ALLOWED_TYPES.has(contentType)) {
    throw new Error("Photo must be JPG, PNG, WebP, or GIF");
  }
  if (bytes.byteLength > MAX_BYTES) {
    throw new Error("Photo must be 5 MB or smaller");
  }

  const supabase = getSupabaseAdmin();
  const path = `${profileId}/${crypto.randomUUID()}.${extensionForType(contentType)}`;

  const { error: uploadError } = await supabase.storage
    .from(BUCKET)
    .upload(path, bytes, { contentType, upsert: false });

  if (uploadError) {
    console.error(uploadError);
    throw new Error(
      uploadError.message.includes("Bucket not found")
        ? "Photo storage is not set up yet. Use a profile photo link (URL) instead, or ask 801 Family Studios to enable roster photos in Supabase."
        : "Could not upload photo"
    );
  }

  const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
  return data.publicUrl;
}
