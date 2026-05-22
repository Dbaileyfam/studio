import AnimatedPageTransition from "@/components/AnimatedPageTransition";
import PageSEO from "@/components/PageSEO";
import { Button } from "@/components/ui/button";
import { ROSTER_STRIPE_URL } from "@/lib/musicianRoster";
import { motion } from "framer-motion";
import { ArrowRight, Music2, Users } from "lucide-react";
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
  "You keep 100% of your gig pay — no commission to 801",
  "Complete your profile after subscribing so we can review and publish you",
];

const MusicianRoster = () => {
  return (
    <AnimatedPageTransition>
      <PageSEO
        title="801 Musician Roster"
        description="Join the 801 Musician Roster for $9/month. Get listed for fill-in gigs, solo performances, studio work, and private events in Sandy and the Salt Lake area. Keep 100% of your gig pay."
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
                studio work, private events, and booking opportunities. Members keep
                100% of their gig pay — 801 Family Studios does not take commission.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button
                  asChild
                  size="lg"
                  className="bg-gradient-to-r from-teal-600 to-teal-500 hover:from-teal-500 hover:to-teal-400 text-white font-semibold px-8 shadow-lg"
                >
                  <a
                    href={ROSTER_STRIPE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Join the Roster — $9/month
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </a>
                </Button>
              </div>
              <p className="mt-6 text-sm text-gray-400 max-w-md mx-auto">
                Secure checkout on Stripe. After payment you will be redirected to
                complete your musician profile.
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
              Already subscribed?{" "}
              <Link
                to="/musician-profile-form"
                className="text-teal-300 hover:text-teal-200 font-medium"
              >
                Complete your profile
              </Link>
            </motion.p>
          </motion.div>
        </div>
      </div>
    </AnimatedPageTransition>
  );
};

export default MusicianRoster;
