import AnimatedPageTransition from "@/components/AnimatedPageTransition";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Instagram, Facebook, Youtube, Music } from "lucide-react";
import tribeImage from "@/assets/Tribeof1.jpg";
import swaggerImage from "@/assets/swagger1.jpg";
import loomImage from "@/assets/loom1.png";
import fngImage from "@/assets/fng2.jpg";
import dubnectarImage from "@/assets/dub-nectar-band.jpg";

const FeaturedArtists = () => {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: custom * 0.2, duration: 0.7, ease: [0.22, 1, 0.36, 1] },
    }),
  };

  const artists = [
    {
      name: "Funk & Gonzo",
      genre: "Rock/Ska/Funk",
      description: "A high-energy fusion of rock power, ska rhythms, and funky bass lines. Their explosive performances blend punchy horns with groovy rhythms, creating an irresistible sound that keeps the crowd dancing.",
      image: fngImage,
      social: {
        instagram: "https://www.instagram.com/funkandgonzo/",
        facebook: "https://www.facebook.com/funkandgonzo",
        youtube: "https://www.youtube.com/@funkandgonzo",
        music: "https://open.spotify.com/artist/61KvymSakWx4OhkTCNrSwq"
      }
    },
    {
      name: "Dubnectar",
      genre: "Reggae/Funk",
      description: "Blending smooth reggae rhythms with infectious funk grooves, Dubnectar creates an uplifting musical experience that gets everyone moving. Their vibrant performances combine island vibes with soulful funk elements.",
      image: dubnectarImage,
      social: {
        instagram: "https://www.instagram.com/dubnectar/",
        facebook: "https://www.facebook.com/dubnectar",
        youtube: "https://www.youtube.com/@dubnectar",
        music: "https://open.spotify.com/artist/3VOB8pqczKq08vAJYIXmeO"
      }
    },
    {
      name: "Tribe of I",
      genre: "Reggae/Rock",
      description: "Blending reggae rhythms with rock energy for a unique island sound. Their music carries messages of unity, love, and positive vibrations through powerful performances.",
      image: tribeImage,
      social: {
        instagram: "https://www.instagram.com/tribeofi/",
        facebook: "https://www.facebook.com/tribeofi",
        youtube: "https://www.youtube.com/@tribeofi",
        music: "https://open.spotify.com/artist/5Tar1xOfXyy1tPlUYIAzwt"
      }
    },
    {
      name: "Swagger",
      genre: "Celtic Rock",
      description: "A dynamic Celtic rock band that fuses traditional Irish melodies with powerful rock elements. Their energetic performances feature driving rhythms and a soaring fiddle that creates an unforgettable Celtic rock experience.",
      image: swaggerImage,
      social: {
        instagram: "https://www.instagram.com/swaggertheband/",
        facebook: "https://www.facebook.com/swaggertheband",
        youtube: "https://www.youtube.com/@swaggertheband",
        music: "https://open.spotify.com/artist/7tPoZvl7OYT2rQDdzCQpfR"
      }
    }
  ];

  return (
    <AnimatedPageTransition>
      <div className="page-container min-h-screen overflow-y-auto" style={{ backgroundColor: '#7851A9' }}>
        <div className="page-content py-8">
          <div className="container-inner max-w-7xl mx-auto px-4">
            <motion.div
              className="max-w-3xl mx-auto text-center mb-12"
              variants={fadeIn}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              custom={0}
            >
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-6 text-balance text-white">
                Featured Local Artists
              </h1>
              <p className="text-lg text-gray-200 mb-4 text-pretty">
                Discover local talent that drive the Utah music scene. Each artist brings their unique style and energy to create amazing music.
              </p>
              <p className="text-lg text-gray-200 mb-8 text-pretty">
                To learn more or to book, please click on any of their links.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 justify-center justify-items-center">
              {artists.map((artist, index) => (
                <motion.div
                  key={artist.name}
                  variants={fadeIn}
                  initial="initial"
                  whileInView="animate"
                  viewport={{ once: true }}
                  custom={index * 0.2 + 0.4}
                  className="bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow group"
                >
                  <div className="aspect-[3/2] overflow-hidden relative">
                    <img
                      src={artist.image}
                      alt={artist.name}
                      className="absolute inset-0 w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
                      style={{ pointerEvents: 'auto' }}
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2">{artist.name}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">{artist.genre}</p>
                    <p className="text-gray-600 dark:text-gray-300 mb-6 text-pretty">
                      {artist.description}
                    </p>
                    <div className="flex items-center justify-center gap-4">
                      <a
                        href={artist.social.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 hover:text-pink-600 dark:text-gray-400 dark:hover:text-pink-400 transition-colors"
                        aria-label={`${artist.name} on Instagram`}
                      >
                        <Instagram className="h-5 w-5" />
                      </a>
                      <a
                        href={artist.social.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
                        aria-label={`${artist.name} on Facebook`}
                      >
                        <Facebook className="h-5 w-5" />
                      </a>
                      <a
                        href={artist.social.youtube}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400 transition-colors"
                        aria-label={`${artist.name} on YouTube`}
                      >
                        <Youtube className="h-5 w-5" />
                      </a>
                      <a
                        href={artist.social.music}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 hover:text-green-600 dark:text-gray-400 dark:hover:text-green-400 transition-colors"
                        aria-label={`${artist.name} on Spotify`}
                      >
                        <Music className="h-5 w-5" />
                      </a>
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

export default FeaturedArtists; 