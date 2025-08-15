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
import brennanWestImage from "@/assets/Brennan-west-band.jpg";
import c1trusImage from "@/assets/C1trus.JPG";
import alleyKatsImage from "@/assets/TheAlleyKats.jpeg";
import fearAndLoathingImage from "@/assets/Fearandloathing.JPEG";


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
    },
    {
      name: "Brennan West Band",
      genre: "Country/Rock",
      description: "A dynamic country rock band that blends traditional country storytelling with modern rock energy. Their powerful performances feature heartfelt lyrics, driving rhythms, and Brennan's exceptional brass playing. Known for delivering flawless covers and original compositions that showcase their musical versatility and authentic American sound.",
      image: brennanWestImage,
      social: {
        instagram: "https://www.instagram.com/brennanwestband/",
        facebook: "https://www.facebook.com/brennanwestband",
        youtube: "https://www.youtube.com/@brennanwestband",
        music: "https://open.spotify.com/artist/brennanwestband"
      }
    },
    {
      name: "C1trus",
      genre: "Electronic",
      description: "A dynamic electronic band that blends cutting-edge electronic production with powerful vocal performances. Their innovative sound combines pulsating beats, atmospheric synths, and compelling vocals to create an immersive electronic music experience that pushes the boundaries of the genre.",
      image: c1trusImage,
      social: {
        instagram: "https://www.instagram.com/c1trus_official_/",
        facebook: "https://facebook.com/benjamin.michael.wells",
        youtube: "",
        music: "https://open.spotify.com/track/6vtu4sWylmea1lrgOIpTd3?si=d1a798f19f0d4520"
      }
    },
    {
      name: "The Alley Kats",
      genre: "Reggae",
      description: "Multi-talented Wyoming Reggae band. The Alley Kats takes pride in being genuine to others and are a class act. Spreading the message of love and positive vibrations is an everyday mission. Front man Austin Taylor views this unique sound as a form of medicine for the soul.",
      image: alleyKatsImage,
      social: {
        instagram: "https://www.instagram.com/the_alley_kats/",
        facebook: "https://www.facebook.com/groups/alleykatsofficial/",
        youtube: "https://www.youtube.com/channel/UC2PH9AtEi2_BSlQSkaKYPcQ",
        music: "https://open.spotify.com/artist/5zu4Hxw96i76KQ6ffhFaCj?si=IiuWvU1EQkKCcm6Nh7QbpA"
      }
    },
    {
      name: "Fear and Loathing",
      genre: "Alternative Rock",
      description: "Salt Lake City three-piece creating punk, rock, reggae music psychedelically fused together for your listening pleasure. The band's self-produced 2018 debut EP set the stage for their sound, followed by their latest release, Two Tone - produced at Aggressive Audio. Fear and Loathing has brought their music to stages across SLC, playing venues like Kilby Court, Soundwell, Ice House, and the Hog Wallow Pub. Eventually taking their sound to Southern Utah and even as far as Iowa for Farm Fresh Reggae Festival!",
      image: fearAndLoathingImage,
      social: {
        instagram: "https://www.instagram.com/fearandloathing_slc/",
        facebook: "https://www.facebook.com/profile.php?id=100046384759113",
        youtube: "https://youtube.com/@fearloathingslc5577?si=tD6B7DkETJRhlzPf",
        music: "https://open.spotify.com/artist/36q7AdiQMhhLhnZJsxuYMT?si=x4t3uCi3QbCm0rSkWWx7_A"
      }
    }
  ];

  console.log("FeaturedArtists component rendering...");
  console.log("Artists data:", artists);

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
                Featured Artists
              </h1>
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
                  <div className="aspect-[3/2] overflow-hidden relative bg-black">
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
                      {artist.social.instagram && (
                        <a
                          href={artist.social.instagram}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-600 hover:text-pink-600 dark:text-gray-400 dark:hover:text-pink-400 transition-colors"
                          aria-label={`${artist.name} on Instagram`}
                        >
                          <Instagram className="h-5 w-5" />
                        </a>
                      )}
                      {artist.social.facebook && (
                        <a
                          href={artist.social.facebook}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
                          aria-label={`${artist.name} on Facebook`}
                        >
                          <Facebook className="h-5 w-5" />
                        </a>
                      )}
                      {artist.social.youtube && (
                        <a
                          href={artist.social.youtube}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-600 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400 transition-colors"
                          aria-label={`${artist.name} on YouTube`}
                        >
                          <Youtube className="h-5 w-5" />
                        </a>
                      )}
                      {artist.social.music && (
                        <a
                          href={artist.social.music}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-600 hover:text-green-600 dark:text-gray-400 dark:hover:text-green-400 transition-colors"
                          aria-label={`${artist.name} on Spotify`}
                        >
                          <Music className="h-5 w-5" />
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            
            {/* Booking Button at Bottom */}
            <div className="text-center mt-16 mb-8">
              <Link 
                to="/contact" 
                className="inline-flex items-center px-8 py-4 bg-white text-purple-900 font-semibold rounded-lg hover:bg-gray-100 transition-colors duration-200 shadow-lg hover:shadow-xl text-lg"
              >
                Book an Artist
              </Link>
            </div>
          </div>
        </div>
      </div>
    </AnimatedPageTransition>
  );
};

export default FeaturedArtists; 