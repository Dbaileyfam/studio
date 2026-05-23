import { Button } from "@/components/ui/button";
import { ROSTER_EDIT_PATH, ROSTER_STRIPE_URL } from "@/lib/musicianRoster";
import { CreditCard, Mail } from "lucide-react";
import { Link } from "react-router-dom";

const MusicianRosterPaywall = () => (
  <div className="rounded-3xl border border-amber-500/30 bg-amber-950/20 p-8 md:p-10 text-center max-w-xl mx-auto">
    <CreditCard className="h-12 w-12 text-amber-400 mx-auto mb-4" aria-hidden />
    <h2 className="text-2xl font-bold text-white mb-3">Subscription required</h2>
    <p className="text-gray-200 leading-relaxed mb-6">
      The musician profile form is only available after you subscribe through
      Stripe. Pay first, then you&apos;ll be redirected here to complete your profile.
    </p>
    <Button
      asChild
      size="lg"
      className="bg-gradient-to-r from-teal-600 to-teal-500 hover:from-teal-500 hover:to-teal-400 text-white font-semibold"
    >
      <Link to="/musician-roster">Join the roster — $9/month</Link>
    </Button>
    <p className="mt-6 text-sm text-gray-400">
      Already on the roster?{" "}
      <Link to={ROSTER_EDIT_PATH} className="text-teal-300 hover:text-teal-200 underline">
        Get your edit link
      </Link>
      . Already paid but seeing this message?{" "}
      <a
        href={ROSTER_STRIPE_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="text-teal-300 hover:text-teal-200 underline"
      >
        Open checkout again
      </a>{" "}
      or email{" "}
      <a
        href="mailto:info@801familystudios.com?subject=Musician%20Roster%20%E2%80%94%20paid%20profile%20access"
        className="inline-flex items-center gap-1 text-teal-300 hover:text-teal-200 underline"
      >
        <Mail className="h-4 w-4" />
        info@801familystudios.com
      </a>
      .
    </p>
  </div>
);

export default MusicianRosterPaywall;
