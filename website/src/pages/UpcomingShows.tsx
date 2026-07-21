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
      id: "headshine-dub-nectar-july23",
      title: "Headshine with Dub Nectar",
      subtitle: "Redemption Bar and Grill • Herriman, UT",
      imageSrc: "/images/upcoming/headshine-dub-nectar-july23-redemption.png",
      imageAlt:
        "Flyer: Headshine with Dub Nectar at Redemption Bar and Grill on July 23, 2026 in Herriman",
      date: "Thursday, July 23, 2026",
      venue: "Redemption Bar and Grill",
      address: "3517 Maradona Dr., Herriman, UT",
      time: "9 PM · $20",
      note: "Headshine with Dub Nectar — doors and details on the flyer.",
      accent: "from-yellow-500/30 to-red-500/30",
    },
    {
      id: "headshine-rise-n-shine-july24",
      title: "Rise N Shine Sessions presents Headshine",
      subtitle: "Featuring Dub Nectar & Fear & Loathing • Taylorsville, UT",
      imageSrc: "/images/upcoming/headshine-rise-n-shine-july24.png",
      imageAlt:
        "Flyer: Rise N Shine Sessions with Headshine, Dub Nectar, and Fear & Loathing on July 24, 2026 in Taylorsville",
      date: "Friday, July 24, 2026",
      venue: "Backyard Outdoor Music Experience",
      address: "4531 S Butterfield Circle, Taylorsville, UT",
      time: "Advance $30 · Day of $35",
      note: "150 tickets only · All ages (12 & under free) · BBQ food & drinks.",
      accent: "from-red-500/25 to-blue-500/30",
    },
    {
      id: "unaffected-madame-savage-july31",
      title: "Liquid Joe's Presents Rock Night",
      subtitle: "The Unaffected · Madame Savage · HNR HR",
      imageSrc: "/images/upcoming/unaffected-madame-savage-july31-liquid-joes.png",
      imageAlt:
        "Flyer: Rock Night with The Unaffected, Madame Savage, and HNR HR at Liquid Joe's on July 31, 2026",
      date: "Friday, July 31, 2026",
      venue: "Liquid Joe's",
      address: "1249 E 3300 S, Salt Lake City, UT 84106",
      time: "9:00 PM · 21+",
      note: "Support local bands — real music, no filter, all heart.",
      accent: "from-red-500/30 to-stone-500/25",
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
