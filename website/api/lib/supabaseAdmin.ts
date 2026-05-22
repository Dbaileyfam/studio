import { createClient } from "@supabase/supabase-js";

export function getSupabaseAdmin() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    throw new Error("SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are required");
  }
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
