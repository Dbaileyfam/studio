import AnimatedPageTransition from "@/components/AnimatedPageTransition";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Instagram, Facebook, Youtube, Music } from "lucide-react";

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
      name: "Funk and Gonzo",
      genre: "Rock/Ska/Funk",
      description: "A high-energy fusion of rock power, ska rhythms, and funky bass lines. Their explosive performances blend punchy horns with groovy rhythms, creating an irresistible sound that keeps the crowd dancing.",
      image: "/images/Funk-and-gonzo-band.JPEG",
      social: {
        instagram: "https://instagram.com/funkandgonzo",
        facebook: "https://facebook.com/funkandgonzo",
        youtube: "https://youtube.com/@funkandgonzo",
        music: "https://open.spotify.com/artist/funkandgonzo"
      }
    },
    {
      name: "Dubnectar",
      genre: "Reggae/Funk",
      description: "Blending smooth reggae rhythms with infectious funk grooves, Dubnectar creates an uplifting musical experience that gets everyone moving. Their vibrant performances combine island vibes with soulful funk elements.",
      image: "/images/dubnectar-collage.jpg",
      social: {
        instagram: "https://instagram.com/dubnectar",
        facebook: "https://facebook.com/dubnectar",
        youtube: "https://youtube.com/@dubnectar",
        music: "https://open.spotify.com/artist/dubnectar"
      }
    },
    {
      name: "Tribe of I",
      genre: "Reggae/Rock",
      description: "Blending reggae rhythms with rock energy for a unique island sound. Their music carries messages of unity, love, and positive vibrations through powerful performances.",
      image: "https://images.unsplash.com/photo-1511735111819-9a3f7709049c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1080&q=80",
      social: {
        instagram: "https://instagram.com/tribeofi",
        facebook: "https://facebook.com/tribeofi",
        youtube: "https://youtube.com/@tribeofi",
        music: "https://open.spotify.com/artist/tribeofi"
      }
    },
  ];

  return (
    <AnimatedPageTransition>
      <div className="page-container">
        <div className="page-content">
          <div className="container-inner">
            <motion.div
              className="max-w-3xl mx-auto text-center mb-12"
              variants={fadeIn}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              custom={0}
            >
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-6 text-balance">
                Featured Artists
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 text-pretty">
                Discover the talented artists who have worked with 801 Family Studios.
                Each brings their unique style and energy to create amazing music.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
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
                  <div className="aspect-[16/9] overflow-hidden">
                    <img
                      src={artist.image}
                      alt={artist.name}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
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

            <motion.div
              className="text-center mt-16"
              variants={fadeIn}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              custom={1.2}
            >
              <Button asChild size="lg" className="rounded-full">
                <Link to="/appointments">Book a Session</Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </AnimatedPageTransition>
  );
};

export default FeaturedArtists; 