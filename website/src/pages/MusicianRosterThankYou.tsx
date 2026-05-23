import AnimatedPageTransition from "@/components/AnimatedPageTransition";
import PageSEO from "@/components/PageSEO";
import { Button } from "@/components/ui/button";
import {
  ROSTER_BROWSE_PATH,
  ROSTER_NO_COMMISSION,
  ROSTER_PROFILE_FORM_PATH,
} from "@/lib/musicianRoster";
import {
  activateRosterFromCheckout,
  fetchRosterProfileStatus,
  isRosterApiConfigured,
} from "@/lib/rosterApi";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { ArrowRight, CheckCircle2, Loader2, Users } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";

type PageStatus = "loading" | "active" | "pending" | "unlinked" | "error";

const MusicianRosterThankYou = () => {
  const [searchParams] = useSearchParams();
  const profileId = searchParams.get("profile_id");
  const sessionId = searchParams.get("session_id");
  const [status, setStatus] = useState<PageStatus>("loading");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!isRosterApiConfigured()) {
      setStatus(profileId || sessionId ? "pending" : "unlinked");
      return;
    }

    let cancelled = false;

    const sync = async (): Promise<boolean> => {
      try {
        if (sessionId) {
          const activated = await activateRosterFromCheckout(sessionId, profileId);
          if (cancelled) return true;
          if (activated.status === "active") {
            setStatus("active");
            return true;
          }
        }

        const id = profileId ?? null;
        if (!id) {
          setStatus(sessionId ? "pending" : "unlinked");
          return false;
        }

        const result = await fetchRosterProfileStatus(id);
        if (cancelled) return true;
        const active = result.status === "active";
        setStatus(active ? "active" : "pending");
        return active;
      } catch (err) {
        if (cancelled) return true;
        const msg = err instanceof Error ? err.message : "Could not confirm payment";
        const blocked =
          msg.includes("NetworkError") ||
          msg.includes("Failed to fetch") ||
          msg.includes("Load failed");
        setErrorMessage(
          blocked
            ? "We could not reach the roster server from your browser. Wait a minute and open Browse Musicians — your payment may still have gone through."
            : msg
        );
        setStatus("error");
        return true;
      }
    };

    let intervalId: ReturnType<typeof setInterval>;
    const tick = async () => {
      const done = await sync();
      if (done) clearInterval(intervalId);
    };

    tick();
    intervalId = setInterval(tick, 3000);
    return () => {
      cancelled = true;
      clearInterval(intervalId);
    };
  }, [profileId, sessionId]);

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
            className="container-inner max-w-xl mx-auto text-center py-8 md:py-12"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            {status === "loading" ? (
              <Loader2 className="h-14 w-14 text-teal-400 mx-auto mb-6 animate-spin" />
            ) : (
              <CheckCircle2
                className={`h-16 w-16 mx-auto mb-6 ${isActive ? "text-teal-400" : "text-amber-400"}`}
                aria-hidden
              />
            )}

            <h1 className="text-3xl md:text-4xl font-display font-bold text-white mb-4 text-balance">
              {isActive ? "You're on the roster" : "Payment received"}
            </h1>

            {status === "loading" && (
              <p className="text-lg text-gray-200 leading-relaxed mb-8">
                Confirming your subscription and publishing your profile…
              </p>
            )}

            {isActive && (
              <>
                <p className="text-lg text-gray-200 leading-relaxed mb-2">
                  Your $9/month subscription is active. Your profile is live on the public
                  musician roster — bookers can find you on the browse page now.
                </p>
                <p className="text-sm text-teal-200/90 mb-8">{ROSTER_NO_COMMISSION}</p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center mb-4">
                  <Button
                    asChild
                    size="lg"
                    className="bg-gradient-to-r from-teal-600 to-teal-500 hover:from-teal-500 hover:to-teal-400 text-white font-semibold"
                  >
                    <Link to={ROSTER_BROWSE_PATH}>
                      <Users className="mr-2 h-5 w-5" />
                      Browse musicians (see your listing)
                    </Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="border-white/25 text-white hover:bg-white/10"
                  >
                    <Link to="/musician-roster">Musician Roster</Link>
                  </Button>
                </div>
              </>
            )}

            {status === "pending" && (
              <>
                <p className="text-lg text-gray-200 leading-relaxed mb-2">
                  Thanks for subscribing. We&apos;re publishing your profile now — this usually
                  takes less than a minute. This page will update automatically.
                </p>
                <p className="text-sm text-teal-200/90 mb-8">{ROSTER_NO_COMMISSION}</p>
                <Button
                  asChild
                  variant="outline"
                  className="border-teal-500/40 text-teal-200 hover:bg-teal-950/40"
                >
                  <Link to={ROSTER_BROWSE_PATH}>Check browse page</Link>
                </Button>
              </>
            )}

            {status === "unlinked" && (
              <>
                <p className="text-lg text-gray-200 leading-relaxed mb-6">
                  We received a payment, but it isn&apos;t linked to a musician profile yet.
                  Complete your profile first, then pay using the checkout button on that form so
                  you appear on the roster automatically.
                </p>
                <Button
                  asChild
                  className="bg-gradient-to-r from-teal-600 to-teal-500 text-white font-semibold"
                >
                  <Link to={ROSTER_PROFILE_FORM_PATH}>
                    Complete your profile
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </>
            )}

            {status === "error" && (
              <>
                <p className="text-lg text-gray-200 leading-relaxed mb-4">
                  {errorMessage ?? "We could not confirm your listing yet."}
                </p>
                <p className="text-sm text-gray-400 mb-6">
                  If you were charged, your profile may still activate shortly. Try the browse
                  page in a minute or contact 801 Family Studios.
                </p>
                <Button asChild variant="outline" className="border-white/25 text-white">
                  <Link to="/contact">Contact us</Link>
                </Button>
              </>
            )}

            {isActive && (
              <p className="text-xs text-gray-500 mt-8">
                Share your roster listing:{" "}
                <span className="text-gray-400">801familystudios.com/musician-roster/browse</span>
              </p>
            )}
          </motion.div>
        </div>
      </div>
    </AnimatedPageTransition>
  );
};

export default MusicianRosterThankYou;
