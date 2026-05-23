import { motion } from "framer-motion";
import {
  Facebook,
  Globe,
  Instagram,
  MapPin,
  Music2,
  Youtube,
} from "lucide-react";
import type { RosterMusicianCardData } from "@/lib/rosterCardData";
import rosterPlaceholder from "@/assets/studio2.jpg";

type RosterMusicianCardProps = {
  musician: RosterMusicianCardData;
  index?: number;
};

const RosterMusicianCard = ({ musician, index = 0 }: RosterMusicianCardProps) => {
  const socials = [
    { href: musician.social.instagram, label: "Instagram", icon: Instagram },
    { href: musician.social.facebook, label: "Facebook", icon: Facebook },
    { href: musician.social.tiktok, label: "TikTok", icon: TikTokIcon },
    { href: musician.social.youtube, label: "YouTube", icon: Youtube },
    { href: musician.social.spotify, label: "Spotify", icon: Music2 },
    { href: musician.social.website, label: "Website", icon: Globe },
    { href: musician.social.epk, label: "EPK", icon: Globe },
  ].filter((s) => Boolean(s.href));

  return (
    <motion.article
      className="group h-full"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-white/15 bg-gradient-to-b from-white/[0.08] to-white/[0.03] shadow-lg shadow-black/20 transition-all duration-300 hover:border-teal-500/35 hover:shadow-teal-950/30">
        <div className="relative aspect-[4/3] overflow-hidden bg-slate-900">
          <img
            src={musician.image}
            alt=""
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            onError={(e) => {
              e.currentTarget.src = rosterPlaceholder;
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#07090d] via-[#07090d]/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <h3 className="text-xl font-display font-bold text-white leading-tight">
              {musician.name}
            </h3>
            {musician.location && (
              <p className="mt-1 flex items-center gap-1.5 text-sm text-teal-200/95">
                <MapPin className="h-3.5 w-3.5 shrink-0" aria-hidden />
                {musician.location}
              </p>
            )}
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-4 p-5">
          {musician.genres.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {musician.genres.map((genre) => (
                <span
                  key={genre}
                  className="rounded-full border border-teal-500/30 bg-teal-950/50 px-2.5 py-0.5 text-xs font-medium text-teal-100"
                >
                  {genre}
                </span>
              ))}
            </div>
          )}

          {musician.instruments && (
            <p className="text-sm text-gray-300">
              <span className="font-medium text-gray-200">Plays:</span>{" "}
              {musician.instruments}
            </p>
          )}

          {musician.bio && (
            <p className="text-sm text-gray-400 leading-relaxed line-clamp-4">
              {musician.bio}
            </p>
          )}

          <dl className="grid gap-2 text-xs text-gray-400 border-t border-white/10 pt-3">
            {musician.availableFor.length > 0 && (
              <div>
                <dt className="font-medium text-gray-300 mb-1">Available for</dt>
                <dd className="flex flex-wrap gap-1.5">
                  {musician.availableFor.map((item) => (
                    <span
                      key={item}
                      className="rounded-md bg-white/5 px-2 py-0.5 text-gray-300"
                    >
                      {item}
                    </span>
                  ))}
                </dd>
              </div>
            )}
            {musician.travelDistance && (
              <div className="flex gap-2">
                <dt className="font-medium text-gray-300 shrink-0">Travel</dt>
                <dd>{musician.travelDistance}</dd>
              </div>
            )}
            {musician.minimumGigRate && (
              <div className="flex gap-2">
                <dt className="font-medium text-gray-300 shrink-0">Rate</dt>
                <dd>{musician.minimumGigRate}</dd>
              </div>
            )}
            {musician.availability.length > 0 && (
              <div className="flex gap-2">
                <dt className="font-medium text-gray-300 shrink-0">When</dt>
                <dd>{musician.availability.join(", ")}</dd>
              </div>
            )}
          </dl>

          {socials.length > 0 && (
            <div className="mt-auto flex flex-wrap gap-2 pt-1">
              {socials.map(({ href, label, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-lg border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-medium text-gray-200 transition-colors hover:border-teal-500/40 hover:bg-teal-950/40 hover:text-white"
                  aria-label={label}
                >
                  <Icon className="h-3.5 w-3.5" aria-hidden />
                  {label}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.article>
  );
};

const TikTokIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
  </svg>
);

export default RosterMusicianCard;
