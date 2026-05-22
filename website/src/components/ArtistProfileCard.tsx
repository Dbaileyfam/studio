import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { Facebook, Globe, Instagram, Music, Youtube } from "lucide-react";

export type ArtistProfileSocial = {
  instagram?: string;
  facebook?: string;
  youtube?: string;
  music?: string;
  website?: string;
  epk?: string;
};

export type ArtistProfileCardData = {
  name: string;
  genre: string;
  description: string;
  image: string;
  imageFit?: "cover" | "contain";
  social: ArtistProfileSocial;
};

type ArtistProfileCardProps = {
  artist: ArtistProfileCardData;
  index?: number;
};

const ArtistProfileCard = ({ artist, index = 0 }: ArtistProfileCardProps) => {
  return (
    <motion.div
      className="group relative"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -8, scale: 1.02 }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-teal-500/15 via-amber-500/10 to-slate-500/15 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-700 scale-110 group-hover:scale-125" />

      <div className="absolute inset-0 overflow-hidden rounded-3xl">
        <motion.div
          className="absolute top-4 right-4 w-16 h-16 bg-gradient-to-br from-teal-400/25 to-amber-400/15 rounded-full"
          animate={{
            scale: [1, 1.3, 1],
            borderRadius: ["50%", "30%", "50%"],
            rotate: [0, 180, 360],
          }}
          transition={{
            scale: { duration: 4, repeat: Infinity, ease: "easeInOut" },
            borderRadius: { duration: 6, repeat: Infinity, ease: "easeInOut" },
            rotate: { duration: 8, repeat: Infinity, ease: "linear" },
          }}
        />
        <motion.div
          className="absolute bottom-4 left-4 w-12 h-12 bg-gradient-to-br from-amber-400/20 to-teal-400/20"
          style={{ clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)" }}
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 180, 270, 360],
          }}
          transition={{
            scale: { duration: 3, repeat: Infinity, ease: "easeInOut" },
            rotate: { duration: 10, repeat: Infinity, ease: "linear" },
          }}
        />
        {[1, 2, 3].map((i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white/30 rounded-full"
            style={{
              left: `${20 + i * 20}%`,
              top: `${15 + i * 25}%`,
            }}
            animate={{
              y: [0, -8, 0],
              opacity: [0.3, 0.8, 0.3],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 2 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.2,
            }}
          />
        ))}
      </div>

      <motion.div
        className="relative bg-white/10 backdrop-blur-sm rounded-3xl overflow-hidden border border-white/20 hover:border-white/40 transition-all duration-500 h-full flex flex-col"
        whileHover={{
          boxShadow:
            "0 25px 50px -12px rgba(20, 184, 166, 0.22), 0 0 0 1px rgba(255, 255, 255, 0.08)",
        }}
      >
        <div className="absolute inset-0 rounded-3xl p-[2px]">
          <motion.div
            className="absolute inset-0 rounded-3xl bg-gradient-to-r from-teal-500 via-amber-500 to-slate-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            animate={{
              background: [
                "linear-gradient(45deg, #14b8a6, #f59e0b, #64748b)",
                "linear-gradient(45deg, #64748b, #14b8a6, #f59e0b)",
                "linear-gradient(45deg, #f59e0b, #64748b, #14b8a6)",
                "linear-gradient(45deg, #14b8a6, #f59e0b, #64748b)",
              ],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        </div>

        <div className="relative bg-[var(--glass-surface)] backdrop-blur-md rounded-3xl overflow-hidden h-full flex flex-col z-10 border border-white/5">
          <div className="relative aspect-[3/2] overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900">
            <motion.img
              src={artist.image}
              alt={`${artist.name} profile`}
              className={`w-full h-full object-center transition-all duration-700 ${
                artist.imageFit === "contain" ? "object-contain" : "object-cover"
              }`}
              whileHover={{
                scale: 1.1,
                filter: "brightness(1.1) contrast(1.05)",
              }}
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
            <motion.div
              className="absolute top-4 left-4 max-w-[85%] bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium border border-white/30 line-clamp-2"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              {artist.genre}
            </motion.div>
          </div>

          <div className="p-6 flex-grow flex flex-col">
            <motion.h3
              className="text-2xl font-bold text-white mb-3 group-hover:text-gray-100 transition-colors duration-300"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              {artist.name}
            </motion.h3>

            <p className="text-gray-200 leading-relaxed mb-6 flex-grow group-hover:text-gray-100 transition-colors duration-300 whitespace-pre-line">
              {artist.description}
            </p>

            <div className="flex flex-wrap gap-3 justify-center">
              {artist.social.instagram && (
                <SocialButton
                  href={artist.social.instagram}
                  className="from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700"
                  icon={<Instagram size={16} />}
                  label="Instagram"
                />
              )}
              {artist.social.facebook && (
                <SocialButton
                  href={artist.social.facebook}
                  className="from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
                  icon={<Facebook size={16} />}
                  label="Facebook"
                />
              )}
              {artist.social.youtube && (
                <SocialButton
                  href={artist.social.youtube}
                  className="from-red-600 to-red-700 hover:from-red-700 hover:to-red-800"
                  icon={<Youtube size={16} />}
                  label="YouTube"
                />
              )}
              {artist.social.music && (
                <SocialButton
                  href={artist.social.music}
                  className="from-green-600 to-green-700 hover:from-green-700 hover:to-green-800"
                  icon={<Music size={16} />}
                  label="Music"
                />
              )}
              {artist.social.website && (
                <SocialButton
                  href={artist.social.website}
                  className="from-slate-600 to-slate-700 hover:from-slate-700 hover:to-slate-800"
                  icon={<Globe size={16} />}
                  label="Website"
                />
              )}
              {artist.social.epk && (
                <SocialButton
                  href={artist.social.epk}
                  className="from-amber-600 to-orange-700 hover:from-amber-700 hover:to-orange-800"
                  icon={<Globe size={16} />}
                  label="EPK"
                />
              )}
            </div>
          </div>

          <motion.div
            className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-1 bg-gradient-to-r from-transparent via-teal-400 to-transparent rounded-full"
            initial={{ width: 0 }}
            whileHover={{ width: "75%" }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
};

const SocialButton = ({
  href,
  className,
  icon,
  label,
}: {
  href: string;
  className: string;
  icon: ReactNode;
  label: string;
}) => (
  <motion.a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className={`flex items-center gap-2 bg-gradient-to-r ${className} text-white px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:shadow-lg`}
    whileHover={{ y: -3, scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
  >
    {icon}
    {label}
  </motion.a>
);

export default ArtistProfileCard;
