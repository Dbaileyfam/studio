import AnimatedPageTransition from "@/components/AnimatedPageTransition";
import PageSEO from "@/components/PageSEO";
import { Button } from "@/components/ui/button";
import { ROSTER_NO_COMMISSION, ROSTER_PROFILE_FORM_PATH } from "@/lib/musicianRoster";
import { fetchRosterProfileStatus, isRosterApiConfigured } from "@/lib/rosterApi";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";

const MusicianRosterThankYou = () => {
  const [searchParams] = useSearchParams();
  const profileId = searchParams.get("profile_id");
  const [status, setStatus] = useState<"loading" | "active" | "pending" | "unknown">(
    profileId ? "loading" : "unknown"
  );

  useEffect(() => {
    if (!profileId || !isRosterApiConfigured()) {
      if (profileId) setStatus("pending");
      return;
    }

    let cancelled = false;
    const poll = async () => {
      try {
        const result = await fetchRosterProfileStatus(profileId);
        if (cancelled) return;
        setStatus(result.status === "active" ? "active" : "pending");
      } catch {
        if (!cancelled) setStatus("pending");
      }
    };

    poll();
    const interval = setInterval(poll, 2500);
    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, [profileId]);

  const isActive = status === "active";

  return (
    <AnimatedPageTransition>
      <PageSEO
        title="Subscription Confirmed"
        description="Your 801 Musician Roster subscription is active."
        path="/musician-roster/thank-you"
        keywords={["musician roster subscription", "801 musician roster"]}
      />
      <div className="page-container">
        <div className="page-content">
          <motion.div
            className="container-inner max-w-lg mx-auto text-center py-8 md:py-12"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            {status === "loading" ? (
              <Loader2 className="h-14 w-14 text-teal-400 mx-auto mb-6 animate-spin" />
            ) : (
              <CheckCircle2 className="h-16 w-16 text-teal-400 mx-auto mb-6" aria-hidden />
            )}

            <h1 className="text-3xl md:text-4xl font-display font-bold text-white mb-4 text-balance">
              {isActive ? "You're on the roster" : "Payment received"}
            </h1>

            <p className="text-lg text-gray-200 leading-relaxed mb-2">
              {isActive
                ? "Your subscription is active and your profile has been published automatically."
                : "Thanks for subscribing. Your profile is activating now — this usually takes less than a minute."}
            </p>
            <p className="text-sm text-teal-200/90 mb-8">
              {ROSTER_NO_COMMISSION}
            </p>

            {!profileId && (
              <p className="text-sm text-amber-200/90 mb-6">
                If you paid without saving a profile first,{" "}
                <Link to={ROSTER_PROFILE_FORM_PATH} className="underline text-teal-300">
                  complete your profile here
                </Link>
                .
              </p>
            )}

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                asChild
                variant="outline"
                className="border-white/25 text-white hover:bg-white/10"
              >
                <Link to="/musician-roster">Musician Roster</Link>
              </Button>
              <Button
                asChild
                className="bg-gradient-to-r from-teal-600 to-teal-500 hover:from-teal-500 hover:to-teal-400 text-white font-semibold"
              >
                <Link to="/">
                  Home
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </AnimatedPageTransition>
  );
};

export default MusicianRosterThankYou;
