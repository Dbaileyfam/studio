import AnimatedPageTransition from "@/components/AnimatedPageTransition";
import PageSEO from "@/components/PageSEO";
import { Button } from "@/components/ui/button";
import {
  ROSTER_NO_COMMISSION,
  ROSTER_BROWSE_PATH,
  ROSTER_PROFILE_FORM_PATH,
} from "@/lib/musicianRoster";
import { motion } from "framer-motion";
import { ArrowRight, BadgePercent, Music2, Users } from "lucide-react";
import { Link } from "react-router-dom";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: (custom: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: custom * 0.15, duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  }),
};

const perks = [
  "Listed for fill-in gigs, solo shows, studio sessions, and private events",
  "Visible to bookers and venues searching the 801 roster",
  "Keep 100% of your gig pay — 801 Family Studios does not take commission on roster gigs",
  "Create your profile, then subscribe — your listing goes live automatically after payment",
];

const MusicianRoster = () => {
  return (
    <AnimatedPageTransition>
      <PageSEO
        title="801 Musician Roster"
        description="Join the 801 Musician Roster for $9/month. Get listed for fill-in gigs, solo performances, studio work, and private events in Sandy and the Salt Lake area. 801 Family Studios does not take commission — you keep 100% of your gig pay."
        path="/musician-roster"
        keywords={[
          "musician roster Utah",
          "fill-in musician Sandy",
          "session musicians Salt Lake",
          "hire musicians Utah",
        ]}
      />
      <div className="page-container">
        <div className="page-content">
          <motion.div className="container-inner max-w-3xl mx-auto">
            <motion.div
              className="text-center mb-12 md:mb-16"
              variants={fadeIn}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              custom={0}
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-teal-600 to-teal-500 mb-6 shadow-lg">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-6 text-balance">
                Join the 801 Musician Roster
              </h1>
              <p className="text-lg md:text-xl text-gray-200 leading-relaxed max-w-2xl mx-auto">
                Get listed as an available musician for fill-in gigs, solo performances,
                studio work, private events, and booking opportunities.
              </p>
              <motion.div
                className="mt-8 max-w-xl mx-auto rounded-2xl border border-teal-500/35 bg-gradient-to-br from-teal-950/50 to-teal-900/20 px-6 py-5 text-center"
                initial={{ opacity: 0, scale: 0.98 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
              >
                <div className="inline-flex items-center justify-center gap-2 text-teal-300 mb-2">
                  <BadgePercent className="h-5 w-5" aria-hidden />
                  <span className="text-sm font-semibold uppercase tracking-wide">
                    No commission on your gigs
                  </span>
                </div>
                <p className="text-lg md:text-xl font-semibold text-white leading-snug">
                  {ROSTER_NO_COMMISSION}
                </p>
                <p className="mt-2 text-sm text-gray-300">
                  Your $9/month membership is for listing and visibility only — not a cut
                  of what you earn from shows, sessions, or private events.
                </p>
              </motion.div>
              <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button
                  asChild
                  size="lg"
                  className="bg-gradient-to-r from-teal-600 to-teal-500 hover:from-teal-500 hover:to-teal-400 text-white font-semibold px-10 text-lg shadow-lg"
                >
                  <Link to={ROSTER_PROFILE_FORM_PATH}>
                    Create your profile
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-white/25 text-white hover:bg-white/10 px-8"
                >
                  <Link to={ROSTER_BROWSE_PATH}>Browse musicians</Link>
                </Button>
              </div>
              <p className="mt-4 text-sm text-gray-400 max-w-md text-center">
                Step 1: profile · Step 2: $9/month on Stripe · Listing activates
                automatically after payment
              </p>
            </motion.div>

            <motion.div
              variants={fadeIn}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              custom={1}
              className="rounded-3xl border border-white/15 bg-white/10 backdrop-blur-sm p-8 md:p-10"
            >
              <div className="flex items-center gap-3 mb-6">
                <Music2 className="h-6 w-6 text-teal-400" />
                <h2 className="text-xl font-bold text-white">What you get</h2>
              </div>
              <ul className="space-y-4">
                {perks.map((line) => (
                  <li key={line} className="flex gap-3 text-gray-200 leading-relaxed">
                    <span className="text-teal-400 font-bold shrink-0">✓</span>
                    {line}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.p
              variants={fadeIn}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              custom={2}
              className="text-center text-gray-400 text-sm mt-10"
            >
              Already started?{" "}
              <Link
                to={ROSTER_PROFILE_FORM_PATH}
                className="text-teal-300 hover:text-teal-200 font-medium"
              >
                Continue your profile
              </Link>
            </motion.p>
          </motion.div>
        </div>
      </div>
    </AnimatedPageTransition>
  );
};

export default MusicianRoster;
