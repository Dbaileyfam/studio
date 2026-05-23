import type { RosterDbStatus } from "./rosterSubscriptionSync.js";
import { syncRosterProfileSubscription } from "./rosterSubscriptionSync.js";

export const SUBSCRIPTION_INACTIVE_EDIT_MESSAGE =
  "Your roster subscription is not active. Your profile is hidden from the public browse page. Resubscribe to edit or go live again.";

export const SUBSCRIPTION_INACTIVE_LOOKUP_MESSAGE =
  "No active Musician Roster subscription for that email. If your membership expired, resubscribe to restore your listing.";

export async function ensureProfileEditable(
  profileId: string
): Promise<{ allowed: true } | { allowed: false; status: RosterDbStatus; message: string }> {
  const status = await syncRosterProfileSubscription(profileId);
  if (status === "active") {
    return { allowed: true };
  }
  return {
    allowed: false,
    status,
    message: SUBSCRIPTION_INACTIVE_EDIT_MESSAGE,
  };
}
