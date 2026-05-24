import { Link } from "react-router-dom";
import {
  ROSTER_COMMISSION_DISCLAIMER,
  ROSTER_PLATFORM_DISCLAIMER,
  ROSTER_TAXES_FEES_NOTE,
} from "@/lib/musicianRoster";

type RosterLegalNoticeProps = {
  /** "compact" for browse cards area; "full" for hub/form pages */
  variant?: "compact" | "full";
  className?: string;
};

/** Short roster legal notice — connection only, no job guarantee, third-party conduct. */
const RosterLegalNotice = ({
  variant = "full",
  className = "",
}: RosterLegalNoticeProps) => {
  if (variant === "compact") {
    return (
      <p className={`text-xs text-gray-400 leading-relaxed ${className}`}>
        {ROSTER_PLATFORM_DISCLAIMER}{" "}
        <Link to="/terms" className="text-teal-300/90 underline hover:text-teal-200">
          Terms of Service
        </Link>
      </p>
    );
  }

  return (
    <div
      className={`rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-xs text-gray-400 leading-relaxed space-y-2 ${className}`}
    >
      <p className="font-medium text-gray-300">Important — please read</p>
      <p>{ROSTER_PLATFORM_DISCLAIMER}</p>
      <p>
        {ROSTER_COMMISSION_DISCLAIMER} {ROSTER_TAXES_FEES_NOTE}
      </p>
      <p>
        See our{" "}
        <Link to="/terms" className="text-teal-300 underline hover:text-teal-200">
          Terms of Service
        </Link>{" "}
        and{" "}
        <Link to="/privacy" className="text-teal-300 underline hover:text-teal-200">
          Privacy Policy
        </Link>
        .
      </p>
    </div>
  );
};

export default RosterLegalNotice;
