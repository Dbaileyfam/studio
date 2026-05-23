import AnimatedPageTransition from "@/components/AnimatedPageTransition";
import RosterMusicianCard from "@/components/RosterMusicianCard";
import type { RosterMusicianCardData } from "@/lib/rosterCardData";
import PageSEO from "@/components/PageSEO";
import { Button } from "@/components/ui/button";
import {
  fetchPublicRoster,
  isRosterBrowseConfigured,
} from "@/lib/rosterApi";
import { publicRosterToCard } from "@/lib/rosterPublicCard";
import { motion } from "framer-motion";
import { Loader2, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { ROSTER_EDIT_PATH } from "@/lib/musicianRoster";
import { Link } from "react-router-dom";
const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: (custom: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: custom * 0.12, duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  }),
};

type LoadState =
  | { status: "loading" }
  | { status: "ready"; cards: RosterMusicianCardData[] }
  | { status: "error"; message: string }
  | { status: "unconfigured" };

const MusicianRosterBrowse = () => {
  const [state, setState] = useState<LoadState>({ status: "loading" });

  useEffect(() => {
    if (!isRosterBrowseConfigured()) {
      setState({ status: "unconfigured" });
      return;
    }

    let cancelled = false;

    fetchPublicRoster()
      .then((profiles) => {
        if (cancelled) return;
        setState({
          status: "ready",
          cards: profiles.map(publicRosterToCard),
        });
      })
      .catch((err) => {
        if (cancelled) return;
        setState({
          status: "error",
          message: err instanceof Error ? err.message : "Could not load roster",
        });
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <AnimatedPageTransition>
      <PageSEO
        title="Available Musicians"
        description="Browse active 801 Musician Roster members available for fill-in gigs, sessions, and private events nationwide."
        path="/musician-roster/browse"
        keywords={[
          "hire musicians",
          "musician roster USA",
          "fill-in musician",
          "session musicians",
          "801 musician roster",
        ]}
      />
      <div className="page-container">
        <div className="page-content">
          <div className="container-inner max-w-6xl mx-auto">
            <motion.div
              className="text-center mb-12 md:mb-16"
              variants={fadeIn}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              custom={0}
            >
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-teal-600 to-teal-500 mb-5">
                <Users className="h-7 w-7 text-white" />
              </div>
              <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4 text-balance">
                Available Musicians
              </h1>
              <p className="text-lg text-gray-200 max-w-2xl mx-auto leading-relaxed">
                Active members of the 801 Musician Roster — available for fill-in gigs,
                solo shows, studio work, and private events. Contact through links on
                each profile or reach out to 801 Family Studios.
              </p>
              <p className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
                <Button
                  asChild
                  variant="outline"
                  className="border-teal-500/40 text-teal-200 hover:bg-teal-950/40"
                >
                  <Link to="/musician-roster">Join the roster</Link>
                </Button>
                <Button
                  asChild
                  variant="ghost"
                  className="text-teal-300 hover:text-teal-200 hover:bg-teal-950/30"
                >
                  <Link to={ROSTER_EDIT_PATH}>Edit your listing</Link>
                </Button>
              </p>
            </motion.div>

            {state.status === "loading" && (
              <div className="flex flex-col items-center py-20 text-gray-300">
                <Loader2 className="h-10 w-10 animate-spin text-teal-400 mb-4" />
                <p>Loading roster…</p>
              </div>
            )}

            {state.status === "unconfigured" && (
              <div className="rounded-2xl border border-white/15 bg-white/5 p-10 text-center max-w-xl mx-auto space-y-4">
                <p className="text-gray-200 leading-relaxed">
                  Public listings are not live yet. Profiles and subscriptions are
                  still being collected — they will show here automatically once the
                  roster database is connected.
                </p>
                <p className="text-sm text-gray-400 leading-relaxed">
                  If you just joined and paid, your profile is on file. The browse
                  page will update as soon as setup is complete (usually same day).
                </p>
                <p className="text-sm text-gray-300">
                  Want to join?{" "}
                  <Link to="/musician-roster" className="text-teal-300 underline">
                    Sign up for the roster
                  </Link>
                  .
                </p>
              </div>
            )}

            {state.status === "error" && (
              <div className="rounded-2xl border border-red-500/30 bg-red-950/20 p-8 text-center max-w-lg mx-auto">
                <p className="text-gray-200">{state.message}</p>
                <Button
                  type="button"
                  variant="outline"
                  className="mt-4 border-white/20 text-white"
                  onClick={() => window.location.reload()}
                >
                  Try again
                </Button>
              </div>
            )}

            {state.status === "ready" && state.cards.length === 0 && (
              <div className="rounded-2xl border border-white/15 bg-white/5 p-10 text-center max-w-lg mx-auto">
                <p className="text-gray-200 leading-relaxed">
                  No active musicians on the roster yet. Be the first to{" "}
                  <Link to="/musician-profile-form" className="text-teal-300 underline">
                    create a profile
                  </Link>{" "}
                  and subscribe.
                </p>
              </div>
            )}

            {state.status === "ready" && state.cards.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
                {state.cards.map((musician, index) => (
                  <RosterMusicianCard
                    key={`${musician.name}-${index}`}
                    musician={musician}
                    index={index}
                  />
                ))}
              </div>
            )}

            <motion.div
              className="text-center mt-16 pt-8 border-t border-white/10"
              variants={fadeIn}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              custom={0}
            >
              <p className="text-gray-300 mb-4">
                Need a musician for your event or session?
              </p>
              <Button asChild className="bg-white/10 hover:bg-white/20 text-white border border-white/20">
                <Link to="/contact">Contact 801 Family Studios</Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </AnimatedPageTransition>
  );
};

export default MusicianRosterBrowse;
