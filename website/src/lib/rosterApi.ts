import type { MusicianProfileFormData } from "@/lib/buildMusicianProfileEmail";

const apiBase = (import.meta.env.VITE_ROSTER_API_BASE ?? "").replace(/\/$/, "");

export type CreateRosterCheckoutResult = {
  profileId: string;
  checkoutUrl: string;
};

export type RosterProfileStatus = {
  profileId: string;
  status: "pending_payment" | "active" | "cancelled";
  email: string;
  fullName: string;
};

/** True when VITE_ROSTER_API_BASE is set (Vercel API) or site is served from Vercel with same-origin /api. */
export function isRosterApiConfigured(): boolean {
  return Boolean(import.meta.env.VITE_ROSTER_API_BASE?.trim());
}

async function parseJson<T>(res: Response): Promise<T> {
  const data = (await res.json()) as T & { error?: string };
  if (!res.ok) {
    throw new Error(data.error ?? `Request failed (${res.status})`);
  }
  return data;
}

export async function createRosterCheckout(
  data: MusicianProfileFormData
): Promise<CreateRosterCheckoutResult> {
  const url = apiBase
    ? `${apiBase}/api/roster/create-checkout`
    : "/api/roster/create-checkout";

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: data.email.trim(),
      fullName: data.fullName.trim(),
      profile: data,
    }),
  });

  return parseJson<CreateRosterCheckoutResult>(res);
}

export type PublicRosterProfile = {
  id: string;
  fullName: string;
  profile: Record<string, unknown>;
};

export async function fetchPublicRoster(): Promise<PublicRosterProfile[]> {
  const url = apiBase ? `${apiBase}/api/roster/list` : "/api/roster/list";
  const res = await fetch(url);
  const data = await parseJson<{ profiles: PublicRosterProfile[] }>(res);
  return data.profiles ?? [];
}

export async function fetchRosterProfileStatus(
  profileId: string
): Promise<RosterProfileStatus> {
  const url = apiBase
    ? `${apiBase}/api/roster/status?profile_id=${encodeURIComponent(profileId)}`
    : `/api/roster/status?profile_id=${encodeURIComponent(profileId)}`;

  const res = await fetch(url);
  return parseJson<RosterProfileStatus>(res);
}
