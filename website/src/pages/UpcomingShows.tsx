import AnimatedPageTransition from "@/components/AnimatedPageTransition";
import { motion } from "framer-motion";
import { Calendar, Clock, ExternalLink, MapPin, Ticket } from "lucide-react";

const UpcomingShows = () => {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: custom * 0.2, duration: 0.7, ease: [0.22, 1, 0.36, 1] },
    }),
  };

  const events = [
    {
      id: "pearl-rock-night-sept11",
      title: "The Pearl on Main Presents: Rock Night",
      subtitle: "Cover Me Badd · The Unaffected · That.Sound.In.Your.Head · Ella Kenning",
      imageSrc: "/images/upcoming/pearl-rock-night-sept11.png",
      imageAlt:
        "Flyer: Rock Night at The Pearl on Main on September 11, 2026 in Midvale with Cover Me Badd, The Unaffected, That.Sound.In.Your.Head, and Ella Kenning",
      date: "Friday, September 11, 2026",
      venue: "The Pearl on Main",
      address: "7711 S. Main Street, Midvale, UT",
      time: "Doors 7:00 PM · Music 8:00 PM · Presale $15 · At doors $20 · All ages",
      note: "Support local bands — real music, no filter, all heart.",
      accent: "from-red-500/30 to-amber-500/25",
    },
    {
      id: "random-precision-sept11-dlc",
      title: "Random Precision",
      subtitle: "Featuring the music of Pink Floyd • The DLC • Salt Lake City, UT",
      imageSrc: "/images/upcoming/random-precision-sept11-dlc.png",
      imageAlt:
        "Flyer: Random Precision featuring the music of Pink Floyd at The DLC on September 11, 2026 in Salt Lake City",
      date: "Friday, September 11, 2026",
      venue: "The DLC",
      address: "5 E 400 S, Salt Lake City, UT 84111",
      time: "8:00 PM · 21 & over",
      note: "Pink Floyd tribute night at The DLC.",
      accent: "from-blue-500/30 to-purple-500/30",
    },
  ];

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
              {events.map((event, index) => (
                <motion.div
                  key={event.id}
                  className="max-w-3xl mx-auto"
                  variants={fadeIn}
                  initial="initial"
                  whileInView="animate"
                  viewport={{ once: true }}
                  custom={index * 0.1 + 0.1}
                >
                  <div className="relative overflow-hidden rounded-3xl border border-white/20 bg-white/10 backdrop-blur-sm shadow-2xl">
                    <div className={`absolute inset-0 bg-gradient-to-br ${event.accent} opacity-40 pointer-events-none`} />

                    <div className="relative">
                      <div className="border-b border-white/15 bg-black/30">
                        <img
                          src={event.imageSrc}
                          alt={event.imageAlt}
                          className="w-full h-auto max-h-[min(78vh,920px)] object-contain bg-black/40"
                          loading="lazy"
                        />
                      </div>

                      <div className="p-7 md:p-9 space-y-6">
                        <div className="text-center space-y-2">
                          <h2 className="text-2xl md:text-3xl font-bold text-white leading-tight">{event.title}</h2>
                          <p className="text-gray-200 text-sm md:text-base leading-relaxed">{event.subtitle}</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="rounded-2xl border border-white/20 bg-black/20 px-4 py-3 text-center">
                            <div className="flex items-center justify-center gap-2 text-gray-200 text-sm mb-1">
                              <Calendar className="w-4 h-4" />
                              <span className="uppercase tracking-wide">Date</span>
                            </div>
                            <p className="text-white font-semibold text-sm md:text-base">{event.date}</p>
                          </div>
                          <div className="rounded-2xl border border-white/20 bg-black/20 px-4 py-3 text-center">
                            <div className="flex items-center justify-center gap-2 text-gray-200 text-sm mb-1">
                              <MapPin className="w-4 h-4" />
                              <span className="uppercase tracking-wide">Venue</span>
                            </div>
                            <p className="text-white font-semibold text-sm md:text-base">{event.venue}</p>
                            <p className="text-gray-300 text-xs mt-1">{event.address}</p>
                          </div>
                          <div className="rounded-2xl border border-white/20 bg-black/20 px-4 py-3 text-center">
                            <div className="flex items-center justify-center gap-2 text-gray-200 text-sm mb-1">
                              <Clock className="w-4 h-4" />
                              <span className="uppercase tracking-wide">Details</span>
                            </div>
                            <p className="text-white font-semibold text-sm md:text-base">{event.time}</p>
                          </div>
                        </div>

                        <p className="text-gray-100 text-center leading-relaxed">{event.note}</p>

                        {"primaryCta" in event && event.primaryCta && (
                          <div className="flex flex-col sm:flex-row gap-3 justify-center">
                            <a
                              href={event.primaryCta.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="group btn-brand inline-flex items-center justify-center gap-2 px-7 py-3 hover:scale-105"
                            >
                              <span className="uppercase">{event.primaryCta.label}</span>
                              <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/20 group-hover:bg-white/30 transition-colors duration-300">
                                {event.primaryCta.icon === "ticket" ? (
                                  <Ticket className="w-3.5 h-3.5" />
                                ) : (
                                  <ExternalLink className="w-3.5 h-3.5" />
                                )}
                              </span>
                            </a>

                            {"secondaryCta" in event && event.secondaryCta && (
                              <a
                                href={event.secondaryCta.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-full border border-white/30 text-white text-sm font-semibold hover:bg-white/10 transition-colors"
                              >
                                <span className="uppercase">{event.secondaryCta.label}</span>
                                <ExternalLink className="w-4 h-4" />
                              </a>
                            )}
                          </div>
                        )}
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
