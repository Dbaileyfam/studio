import { ROSTER_PUBLICLY_DISABLED } from "@/lib/musicianRoster";
import MusicianRosterUnavailable from "@/pages/MusicianRosterUnavailable";
import type { ReactNode } from "react";

/** Shows the pause page when the roster is disabled for the public. */
const RosterPublicGate = ({ children }: { children: ReactNode }) => {
  if (ROSTER_PUBLICLY_DISABLED) {
    return <MusicianRosterUnavailable />;
  }
  return <>{children}</>;
};

export default RosterPublicGate;
