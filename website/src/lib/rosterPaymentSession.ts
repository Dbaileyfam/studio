const STORAGE_KEY = "801_roster_checkout_session";
const MAX_AGE_MS = 48 * 60 * 60 * 1000; // 48 hours to complete profile after checkout

type StoredRosterPayment = {
  sessionId: string;
  savedAt: number;
};

const isCheckoutSessionId = (value: string | null | undefined): value is string =>
  Boolean(value?.trim().startsWith("cs_"));

export function saveRosterPaymentSession(sessionId: string): void {
  if (!isCheckoutSessionId(sessionId)) return;
  const payload: StoredRosterPayment = {
    sessionId: sessionId.trim(),
    savedAt: Date.now(),
  };
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  } catch {
    /* private mode / quota */
  }
}

export function readRosterPaymentSession(): string | null {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as StoredRosterPayment;
    if (!isCheckoutSessionId(parsed.sessionId)) return null;
    if (Date.now() - parsed.savedAt > MAX_AGE_MS) {
      sessionStorage.removeItem(STORAGE_KEY);
      return null;
    }
    return parsed.sessionId;
  } catch {
    return null;
  }
}

/** True if visitor arrived from Stripe checkout (URL param or saved session). */
export function hasRosterPaymentAccess(searchParams: URLSearchParams): boolean {
  const fromUrl = searchParams.get("session_id");
  if (isCheckoutSessionId(fromUrl)) {
    saveRosterPaymentSession(fromUrl);
    return true;
  }
  return Boolean(readRosterPaymentSession());
}

export function clearRosterPaymentSession(): void {
  try {
    sessionStorage.removeItem(STORAGE_KEY);
  } catch {
    /* ignore */
  }
}
