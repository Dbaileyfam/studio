import { createClient } from "@supabase/supabase-js";

export function getSupabaseAdmin() {
  const rawUrl = process.env.SUPABASE_URL?.trim();
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();
  if (!rawUrl || !key) {
    throw new Error("SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are required");
  }
  const url = rawUrl.replace(/\/rest\/v1\/?$/i, "").replace(/\/$/, "");
  return createClient(url, key, { auth: { persistSession: false } });
}

export type RosterProfileRow = {
  id: string;
  status: "pending_payment" | "active" | "cancelled";
  email: string;
  full_name: string;
  profile: Record<string, unknown>;
  stripe_checkout_session_id: string | null;
};
