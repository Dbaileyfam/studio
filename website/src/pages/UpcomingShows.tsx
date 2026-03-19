import AnimatedPageTransition from "@/components/AnimatedPageTransition";
import { motion } from "framer-motion";
import { Calendar, MapPin, Clock, DollarSign, ExternalLink } from "lucide-react";

const UpcomingShows = () => {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: custom * 0.2, duration: 0.7, ease: [0.22, 1, 0.36, 1] },
    }),
  };

  return (
    <AnimatedPageTransition>
      <div className="page-container">
        <div className="page-content">
          <div className="container-inner">
            {/* Header */}
            <motion.div
              className="text-center mb-16"
              variants={fadeIn}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              custom={0}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold tracking-tight mb-6 text-balance bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                Upcoming Shows
              </h1>
              <p className="text-lg text-gray-700 max-w-2xl mx-auto">
                Stay in the loop with live events and performances connected with 801 Family Studios.
              </p>
            </motion.div>

            <div className="space-y-12 max-w-4xl mx-auto">
              {/* SYSTEM OF A CLOWN */}
              <motion.div
                className="max-w-3xl mx-auto"
                variants={fadeIn}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                custom={0.1}
              >
                <div className="bg-gradient-to-br from-red-900/80 via-slate-900/90 to-purple-900/80 backdrop-blur-sm rounded-3xl border border-white/20 overflow-hidden shadow-2xl">
                  <div className="p-8 md:p-10 border-b border-white/15">
                    <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-4 leading-tight">
                      🚨 SYSTEM OF A CLOWN – LIVE IN SLC 🚨
                    </h2>
                    <p className="text-center text-sm uppercase tracking-[0.2em] text-red-300 mb-4">
                      System of a Down Tribute • Los Angeles
                    </p>
                    <p className="text-lg text-gray-100 text-center leading-relaxed mb-4">
                      From Los Angeles comes <span className="font-semibold text-white">System of a Clown</span> —
                      the wild, madcap tribute to System of a Down 🤡🔥
                    </p>
                    <p className="text-lg text-gray-100 text-center leading-relaxed mb-4">
                      Get ready for a chaotic night of heavy riffs, circus energy, and all the SOAD classics you love.
                    </p>
                    <p className="text-base text-gray-100 text-center leading-relaxed">
                      Joining the madness:{" "}
                      <span className="font-semibold text-white">
                        SALT LAKE&apos;S OWN: STEAL THIS BAND
                      </span>{" "}
                      – by Funk and Gonzo covering Korn, Deftones, RATM, Incubus, Slipknot &amp; more.
                    </p>
                  </div>
                  <div className="p-8 md:p-10 space-y-6">
                    <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 items-start sm:items-center p-6 rounded-2xl bg-white/5 border border-white/10">
                      <div className="flex items-center gap-3 shrink-0">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-600 to-purple-600 flex items-center justify-center">
                          <Calendar className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-300 uppercase tracking-wider">Date</p>
                          <p className="text-xl font-bold text-white">Friday, April 3</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <MapPin className="w-5 h-5 text-gray-200 shrink-0" />
                        <p className="text-lg text-gray-100">
                          Liquid Joe&apos;s – Salt Lake City, UT
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-6 sm:gap-10 justify-center pt-2 border-t border-white/15">
                      <div className="flex items-center gap-3">
                        <Clock className="w-5 h-5 text-gray-200" />
                        <p className="text-gray-100">
                          <span className="font-semibold text-white">Doors at 7 PM</span>
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <DollarSign className="w-5 h-5 text-gray-200" />
                        <p className="text-gray-100">
                          <span className="font-semibold text-white">21+</span>
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
                      <a
                        href="https://systemtribute.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black font-semibold text-sm uppercase tracking-wide hover:bg-gray-100 transition-colors"
                      >
                        🎟 Tickets: systemtribute.com
                        <ExternalLink className="w-4 h-4" />
                      </a>
                      <a
                        href="https://www.facebook.com/share/1CG32stLow/?mibextid=wwXIfr"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/40 text-white text-sm font-medium hover:bg-white/10 transition-colors"
                      >
                        View Facebook Event
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                    <p className="text-gray-100 text-center text-base pt-2">
                      Tag your crew and come lose your mind with us. 🤘
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* BELLEROSE @ A Bar Named Sue */}
              <motion.div
                className="max-w-3xl mx-auto"
                variants={fadeIn}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                custom={0.2}
              >
                <div className="bg-gradient-to-br from-amber-900/80 via-stone-900/90 to-yellow-900/60 backdrop-blur-sm rounded-3xl border border-white/20 overflow-hidden shadow-2xl">
                  <div className="p-8 md:p-10 border-b border-white/15">
                    <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-4 leading-tight">
                      🎸 Bellerose @ A Bar Named Sue
                    </h2>
                    <p className="text-center text-sm uppercase tracking-[0.15em] text-amber-200 mb-4">
                      West Coast Rock Meets Dust Bowl Twang with The Blues In Between
                    </p>
                    <p className="text-lg text-gray-100 text-center leading-relaxed">
                      Catch <span className="font-semibold text-white">Bellerose</span> live on State St. — rock, twang, and blues in one night.
                    </p>
                  </div>
                  <div className="p-8 md:p-10 space-y-6">
                    <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 items-start sm:items-center p-6 rounded-2xl bg-white/5 border border-white/10">
                      <div className="flex items-center gap-3 shrink-0">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-600 to-yellow-700 flex items-center justify-center">
                          <MapPin className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-300 uppercase tracking-wider">Venue</p>
                          <p className="text-xl font-bold text-white">A Bar Named Sue – State St.</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-6 sm:gap-10 justify-center pt-2 border-t border-white/15">
                      <div className="flex items-center gap-3">
                        <Clock className="w-5 h-5 text-gray-200" />
                        <p className="text-gray-100">
                          <span className="font-semibold text-white">9:30 PM</span>
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <DollarSign className="w-5 h-5 text-gray-200" />
                        <p className="text-gray-100">
                          <span className="font-semibold text-white">Free event</span>
                        </p>
                      </div>
                    </div>
                    <div className="flex justify-center pt-4">
                      <a
                        href="https://fb.me/e/4aRXL4KEL"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/40 text-white text-sm font-medium hover:bg-white/10 transition-colors"
                      >
                        View Facebook Event
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* NYAHMIDI - May 9 */}
              <motion.div
                className="max-w-3xl mx-auto"
                variants={fadeIn}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                custom={0.3}
              >
                <div className="bg-white/10 backdrop-blur-sm rounded-3xl border border-white/20 overflow-hidden shadow-2xl">
                  <div className="p-8 md:p-10 border-b border-white/20">
                    <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-6 leading-tight">
                      🔥 NYAHMIDI Live at Redemption Bar &amp; Grill
                    </h2>
                    <p className="text-lg text-gray-200 text-center leading-relaxed mb-4">
                      Feel the rhythm. Feed the soul. 🔥
                    </p>
                    <p className="text-lg text-gray-200 text-center leading-relaxed mb-4">
                      Get ready for a night of powerful roots, reggae vibes, and high-energy grooves as{" "}
                      <span className="font-semibold text-white">NYAHMIDI</span> takes over Redemption Bar &amp; Grill! 🌿🦁
                    </p>
                    <p className="text-lg text-gray-200 text-center leading-relaxed">
                      Expect deep basslines, conscious lyrics, and nonstop movement from start to finish. Whether
                      you&apos;re coming to skank, sway, or just soak in the atmosphere, this is the reggae night you
                      don&apos;t want to miss.
                    </p>
                  </div>
                  <div className="p-8 md:p-10 space-y-6">
                    <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 items-start sm:items-center p-6 rounded-2xl bg-white/5 border border-white/10">
                      <div className="flex items-center gap-3 shrink-0">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#3f51b5] to-[#5c6bc0] flex items-center justify-center">
                          <Calendar className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-400 uppercase tracking-wider">Date</p>
                          <p className="text-xl font-bold text-white">Saturday, May 9</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <MapPin className="w-5 h-5 text-gray-400 shrink-0" />
                        <p className="text-lg text-gray-200">Redemption Bar &amp; Grill</p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-6 sm:gap-10 justify-center pt-2 border-t border-white/20">
                      <div className="flex items-center gap-3">
                        <Clock className="w-5 h-5 text-gray-400" />
                        <p className="text-gray-200">
                          <span className="font-semibold text-white">9 PM</span>
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <DollarSign className="w-5 h-5 text-gray-400" />
                        <p className="text-gray-200">
                          <span className="font-semibold text-white">$10</span> Tickets 🎟
                        </p>
                      </div>
                    </div>
                    <p className="text-gray-200 text-center text-lg pt-2">
                      Come early, grab a drink, and lock in your spot — it&apos;s going to be a lion-hearted
                      celebration of music and unity.
                    </p>
                    <div className="flex justify-center pt-4">
                      <a
                        href="https://www.facebook.com/share/15cqDxRBmWw/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/40 text-white text-sm font-medium hover:bg-white/10 transition-colors"
                      >
                        View Facebook Event
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </AnimatedPageTransition>
  );
};

export default UpcomingShows;
