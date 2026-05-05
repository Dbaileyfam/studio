import AnimatedPageTransition from "@/components/AnimatedPageTransition";
import { motion } from "framer-motion";
import { Calendar, Clock, ExternalLink, MapPin } from "lucide-react";

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
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold tracking-tight mb-6 text-balance text-white">
                Upcoming Shows
              </h1>
              <p className="text-lg text-gray-200 max-w-2xl mx-auto">
                Stay in the loop with live events and performances connected with 801 Family Studios.
              </p>
            </motion.div>

            <div className="space-y-12 max-w-5xl mx-auto">
              {[
                {
                  title: "The Bellerose Band with Unseen Corners and The Beer Pressure",
                  link: "https://fb.me/e/7PnCoqubx",
                  date: "Date on Facebook Event",
                  venue: "Venue listed on event page",
                  time: "Time listed on event page",
                  note: "Lineup: Bellerose Band, Unseen Corners, and The Beer Pressure",
                  accent: "from-amber-500/30 to-orange-500/30",
                },
                {
                  title: "Vana Liya at Soundwell",
                  link: "https://fb.me/e/5OADAGbMw",
                  date: "Date on Facebook Event",
                  venue: "Soundwell",
                  time: "Time listed on event page",
                  note: "Presented at Soundwell with live island-reggae vibes.",
                  accent: "from-cyan-500/30 to-blue-500/30",
                },
                {
                  title: "NYAHMIDI Live at Redemption Bar & Grill",
                  link: "https://www.facebook.com/share/15cqDxRBmWw/",
                  date: "Saturday, May 9",
                  venue: "Redemption Bar & Grill",
                  time: "9 PM",
                  note: "Tickets: $10. Powerful roots and reggae night.",
                  accent: "from-emerald-500/30 to-teal-500/30",
                },
              ].map((event, index) => (
                <motion.div
                  key={event.link}
                  className="max-w-3xl mx-auto"
                  variants={fadeIn}
                  initial="initial"
                  whileInView="animate"
                  viewport={{ once: true }}
                  custom={index * 0.1 + 0.1}
                >
                  <div className="relative overflow-hidden rounded-3xl border border-white/20 bg-white/10 backdrop-blur-sm shadow-2xl">
                    <div className={`absolute inset-0 bg-gradient-to-br ${event.accent} opacity-40 pointer-events-none`} />
                    <div className="relative p-7 md:p-9">
                      <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-7 leading-tight">
                        {event.title}
                      </h2>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        <div className="rounded-2xl border border-white/20 bg-black/20 px-4 py-3 text-center">
                          <div className="flex items-center justify-center gap-2 text-gray-200 text-sm mb-1">
                            <Calendar className="w-4 h-4" />
                            <span className="uppercase tracking-wide">Date</span>
                          </div>
                          <p className="text-white font-semibold">{event.date}</p>
                        </div>
                        <div className="rounded-2xl border border-white/20 bg-black/20 px-4 py-3 text-center">
                          <div className="flex items-center justify-center gap-2 text-gray-200 text-sm mb-1">
                            <MapPin className="w-4 h-4" />
                            <span className="uppercase tracking-wide">Venue</span>
                          </div>
                          <p className="text-white font-semibold">{event.venue}</p>
                        </div>
                        <div className="rounded-2xl border border-white/20 bg-black/20 px-4 py-3 text-center">
                          <div className="flex items-center justify-center gap-2 text-gray-200 text-sm mb-1">
                            <Clock className="w-4 h-4" />
                            <span className="uppercase tracking-wide">Time</span>
                          </div>
                          <p className="text-white font-semibold">{event.time}</p>
                        </div>
                      </div>

                      <p className="text-gray-100 text-center mb-7 leading-relaxed">
                        {event.note}
                      </p>

                      <div className="flex justify-center">
                        <a
                          href={event.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group inline-flex items-center gap-3 px-7 py-3 rounded-full bg-gradient-to-r from-[#3f51b5] via-[#5c6bc0] to-[#7e8ce0] text-white text-sm font-semibold tracking-wide border border-white/30 shadow-lg shadow-indigo-900/40 hover:shadow-xl hover:shadow-indigo-700/50 hover:scale-105 hover:from-[#4b60d4] hover:to-[#8c99f0] transition-all duration-300"
                        >
                          <span className="uppercase">View Facebook Event</span>
                          <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/20 group-hover:bg-white/30 transition-colors duration-300">
                            <ExternalLink className="w-3.5 h-3.5" />
                          </span>
                        </a>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AnimatedPageTransition>
  );
};

export default UpcomingShows;
