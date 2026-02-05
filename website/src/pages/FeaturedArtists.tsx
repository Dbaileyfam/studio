import AnimatedPageTransition from "@/components/AnimatedPageTransition";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Instagram, Facebook, Youtube, Music } from "lucide-react";
import tribeImage from "@/assets/Tribeof1.jpg";
import swaggerImage from "@/assets/swagger1.jpg";

import fngImage from "@/assets/fng2.jpg";
import dubnectarImage from "@/assets/dub-nectar-band.jpg";
import alleyKatsImage from "@/assets/TheAlleyKats.jpeg";
import fearAndLoathingImage from "@/assets/Fearandloathing.JPEG";
import stealThisBandImage from "@/assets/Stealthisband.JPEG";
// Image imports
import djNapoImage from "@/assets/djnapo.jpg";
import niceAndSwellImage from "@/assets/niceandswell.JPG";
import masterKennedyImage from "@/assets/masterkennedy-qzdRC3be.jpg";
import belleroseImage from "@/assets/IMG_0710.jpg";
import placeholderImage from "@/assets/801-family-studios-logo.png";


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
      name: "Bellerose",
      genre: "Roots Rock, Blues, Modern Blues Rock, Rhythm & Blues, Old Soul",
      description: "West coast rock meets dustbowl twang... with the blues in between. Kelly Bellerose is a Salt Lake City-based singer, songwriter, and recording artist borne from the effervescent brush strokes that have colored her life, offering music that digs deep into American soil to cultivate a rootsy core. Kelly's homegrown and gutsy voice is peppered with a bluesy edge, and although she's a West Coast girl, her Okie lineage echoes through every note she sings. This is the essence of the BELLEROSE BAND sound.",
      image: belleroseImage,
      imageFit: "cover" as const,
      social: {
        instagram: "https://www.instagram.com/bellerose_music/",
        facebook: "https://www.facebook.com/kelly.bellerose.3",
        youtube: "https://www.youtube.com/@kellybellerose5153",
        music: "https://open.spotify.com/artist/4wfkMUFPjgTR80I0sCuG1S"
      }
    },
    {
      name: "DJ Napo",
      genre: "DJ/Electronic",
      description: "A dynamic DJ and electronic music producer known for creating high-energy mixes and innovative electronic sounds. DJ Napo brings the party to life with his unique blend of electronic beats, house music, and crowd-pleasing tracks that keep audiences dancing all night long.",
      image: djNapoImage,
      social: {
        instagram: "https://www.instagram.com/djnapo_k/",
        facebook: "https://www.facebook.com/Napo1DJ",
        youtube: "",
        music: ""
      }
    },
    {
      name: "Dubnectar",
      genre: "Reggae/Funk",
      description: "Blending smooth reggae rhythms with infectious funk grooves, Dubnectar creates an uplifting musical experience that gets everyone moving. Their vibrant performances combine island vibes with soulful funk elements.",
      image: dubnectarImage,
      social: {
        instagram: "https://www.instagram.com/thedubnectar/",
        facebook: "https://www.facebook.com/newbornslaves",
        youtube: "https://www.youtube.com/@DubNectar",
        music: "https://open.spotify.com/artist/3VOB8pqczKq08vAJYIXmeO"
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
    },
    {
      name: "Funk & Gonzo",
      genre: "Rock/Ska/Funk",
      description: "A high-energy fusion of rock power, ska rhythms, and funky bass lines. Their explosive performances blend punchy horns with groovy rhythms, creating an irresistible sound that keeps the crowd dancing.",
      image: fngImage,
      social: {
        instagram: "https://www.instagram.com/funkandgonzoofficial/",
        facebook: "https://www.facebook.com/funkandgonzo",
        youtube: "https://www.youtube.com/@funkandgonzo801",
        music: "https://open.spotify.com/artist/61KvymSakWx4OhkTCNrSwq"
      }
    },
    {
      name: "Master Kennedy",
      genre: "Afrobeat/Reggae/Hip-Hop",
      description: "Congolese producer, sound engineer, singer-songwriter, rapper, and guitarist based in Salt Lake City. Master Kennedy blends modern styles like Afrobeats, Afro Pop, Reggae, and Hip-Hop, creating a unique sound called 'AFROREGGAE'. Born to a musical family in Kinshasa, DRC, he began his career as a gospel singer and has opened for international artists like Tekno, P-Square, Diamond Platnumz, and Awilo Longomba. His dynamic performances combine traditional African rhythms with contemporary urban sounds, delivering an energetic and culturally rich musical experience.",
      image: masterKennedyImage,
      social: {
        instagram: "https://www.instagram.com/master_kennedy1/",
        facebook: "https://www.facebook.com/myster.kennedy.7", 
        youtube: "https://www.youtube.com/channel/UCmT4d70esXH1xmz7pjCT6lA",
        music: "https://open.spotify.com/artist/6F1ND138wm0jllEX9YB5n9"
      }
    },
    {
      name: "Nice&Swell",
      genre: "Alternative Reggae/Punk Rock",
      description: "An Alternative Reggae punk rock band from Huntington Beach, California, formed by two good friends who shared a passion for music. Griz and F!sh met giving surf lessons and decided to buy a drum kit on Sep 15th, 2022, that day they wrote the song 'hourglass' and Nice&Swell was born. The two continued to write and perform as a duo until they linked up with lead guitarist, John Wedner and Bassist, Brendyn Zion Quiroz who helped the music come to life and flourish. With 9,480 monthly listeners on Spotify, they bring a unique blend of reggae rhythms and punk rock energy.",
      image: niceAndSwellImage,
      social: {
        instagram: "https://www.instagram.com/niceandswell/",
        facebook: "https://www.facebook.com/niceand.swell.2025",
        youtube: "https://www.youtube.com/@niceandswell",
        music: "https://open.spotify.com/artist/0PgHQcMOnw6BKTTk9TkN65"
      }
    },
    {
      name: "Steal This Band",
      genre: "Nu Metal Covers",
      description: "A powerhouse nu metal cover band that brings the raw energy and aggressive sound of the late 90s and early 2000s back to life. With crushing guitar riffs, thunderous bass lines, and intense vocals, they deliver authentic renditions of nu metal classics from bands like Korn, Limp Bizkit, Linkin Park, and System of a Down. Their high-octane performances capture the essence of the nu metal era, complete with the signature blend of heavy metal, hip-hop, and industrial elements that defined the genre. Perfect for venues looking to recreate that explosive nu metal atmosphere and give audiences an authentic throwback experience.",
      image: stealThisBandImage,
      social: {
        instagram: "https://www.instagram.com/reel/DMyZuYpuef2/?utm_source=ig_web_copy_link&igsh=dGhlZGhyYnhhY242",
        facebook: "",
        youtube: "",
        music: ""
      }
    },
    {
      name: "Swagger",
      genre: "Celtic Rock",
      description: "A dynamic Celtic rock band that fuses traditional Irish melodies with powerful rock elements. Their energetic performances feature driving rhythms and a soaring fiddle that creates an unforgettable Celtic rock experience.",
      image: swaggerImage,
      social: {
        instagram: "https://www.instagram.com/rockwithswagger/",
        facebook: "https://www.facebook.com/swaggertheband",
        youtube: "https://www.youtube.com/@SwaggerTheBand",
        music: "https://open.spotify.com/artist/7tPoZvl7OYT2rQDdzCQpfR"
      }
    },
    {
      name: "Tribe of I",
      genre: "Reggae/Rock",
      description: "Blending reggae rhythms with rock energy for a unique island sound. Their music carries messages of unity, love, and positive vibrations through powerful performances.",
      image: tribeImage,
      social: {
        instagram: "https://www.instagram.com/thetribeofi/",
        facebook: "https://www.facebook.com/tribeofi",
        youtube: "https://www.youtube.com/channel/UCiPafv7rtfQD9ebuW8TwmCA",
        music: "https://open.spotify.com/artist/5Tar1xOfXyy1tPlUYIAzwt"
      }
    }
  ];

  console.log("FeaturedArtists component rendering...");
  console.log("Artists data:", artists);

  return (
    <AnimatedPageTransition>
      <div className="page-container">
        <div className="page-content">
          <div className="container-inner">
            {/* Header Section */}
            <motion.div
              className="text-center mb-20"
              variants={fadeIn}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              custom={0}
            >

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold tracking-tight mb-6 text-balance bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
                Featured Artists
              </h1>
              <p className="text-xl text-gray-200 max-w-4xl mx-auto leading-relaxed mb-8">
                Discover the incredible talent that makes up our music scene. Each artist brings their unique style and passion to create unforgettable performances. From intimate acoustic sets to full-band experiences, our featured artists are available for private events, corporate functions, and special occasions.
              </p>
            </motion.div>

            {/* Artists Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
              {artists.map((artist, index) => (
                <EnhancedArtistCard key={artist.name} artist={artist} index={index} />
              ))}
            </div>

            {/* Book Bands Section */}
                <motion.div
              className="text-center mt-20"
                  variants={fadeIn}
                  initial="initial"
                  whileInView="animate"
                  viewport={{ once: true }}
              custom={0}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Want to Work with These Artists?
              </h2>
              <p className="text-lg text-gray-200 mb-8 max-w-2xl mx-auto">
                Our featured artists are available for studio recordings, collaborations, music projects, and other creative endeavors. Get in touch to discuss how we can help bring your musical vision to life.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  asChild
                  size="lg"
                  className="rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-sm px-8 py-3 text-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-xl"
                >
                  <Link to="/contact">Contact Us</Link>
                </Button>

              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </AnimatedPageTransition>
  );
};

// Enhanced Artist Card Component with gradient borders and morphing backgrounds
const EnhancedArtistCard = ({ artist, index }: { artist: any; index: number }) => {
  return (
    <motion.div
      className="group relative"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        whileHover={{ y: -8, scale: 1.02 }}
    >
      {/* Enhanced Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-purple-500/20 to-blue-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-700 scale-110 group-hover:scale-125"></div>
      
      {/* Morphing Background Shapes */}
      <div className="absolute inset-0 overflow-hidden rounded-3xl">
        {/* Morphing Circle */}
        <motion.div
          className="absolute top-4 right-4 w-16 h-16 bg-gradient-to-br from-purple-400/20 to-blue-400/20 rounded-full"
          animate={{
            scale: [1, 1.3, 1],
            borderRadius: ["50%", "30%", "50%"],
            rotate: [0, 180, 360],
          }}
          transition={{
            scale: { duration: 4, repeat: Infinity, ease: "easeInOut" },
            borderRadius: { duration: 6, repeat: Infinity, ease: "easeInOut" },
            rotate: { duration: 8, repeat: Infinity, ease: "linear" }
          }}
        />
        
        {/* Morphing Triangle */}
        <motion.div
          className="absolute bottom-4 left-4 w-12 h-12 bg-gradient-to-br from-pink-400/20 to-purple-400/20"
          style={{
            clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)"
          }}
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 180, 270, 360],
          }}
          transition={{
            scale: { duration: 3, repeat: Infinity, ease: "easeInOut" },
            rotate: { duration: 10, repeat: Infinity, ease: "linear" }
          }}
        />
        
        {/* Floating Dots */}
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
      
      {/* Artist Card with Gradient Border */}
      <motion.div 
        className="relative bg-white/10 backdrop-blur-sm rounded-3xl overflow-hidden border border-white/20 hover:border-white/40 transition-all duration-500 h-full flex flex-col"
        whileHover={{
          boxShadow: "0 25px 50px -12px rgba(139, 92, 246, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.1)"
        }}
      >
        {/* Animated Gradient Border */}
        <div className="absolute inset-0 rounded-3xl p-[2px]">
          <motion.div
            className="absolute inset-0 rounded-3xl bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            animate={{
              background: [
                "linear-gradient(45deg, #8b5cf6, #ec4899, #3b82f6)",
                "linear-gradient(45deg, #3b82f6, #8b5cf6, #ec4899)",
                "linear-gradient(45deg, #ec4899, #3b82f6, #8b5cf6)",
                "linear-gradient(45deg, #8b5cf6, #ec4899, #3b82f6)",
              ],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear"
            }}
                    />
                  </div>
        
        {/* Card Content */}
        <div className="relative bg-[#3f51b5]/20 backdrop-blur-sm rounded-3xl overflow-hidden h-full flex flex-col z-10">
          {/* Image Container with Enhanced Effects */}
          <div className="relative aspect-[3/2] overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900">
            <motion.img
              src={artist.image}
              alt={`${artist.name} performing`}
              className={`w-full h-full object-center transition-all duration-700 ${artist.imageFit === "cover" ? "object-cover" : "object-contain"}`}
              style={{ pointerEvents: 'auto' }}
              whileHover={{ 
                scale: 1.1,
                filter: "brightness(1.1) contrast(1.05)"
              }}
              onError={(e) => {
                console.log('Image failed to load:', artist.name);
                e.currentTarget.style.display = 'none';
              }}
            />
            
            {/* Enhanced Image Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
            
            {/* Enhanced Genre Badge */}
            <motion.div 
              className="absolute top-4 left-4 bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium border border-white/30"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              {artist.genre}
            </motion.div>
          </div>

          {/* Content */}
          <div className="p-6 flex-grow flex flex-col">
            {/* Artist Name */}
            <motion.h3 
              className="text-2xl font-bold text-white mb-3 group-hover:text-gray-100 transition-colors duration-300"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              {artist.name}
            </motion.h3>
            
            {/* Description */}
            <p className="text-gray-200 leading-relaxed mb-6 flex-grow group-hover:text-gray-100 transition-colors duration-300">
                      {artist.description}
                    </p>

            {/* Social Media Links */}
            <div className="flex flex-wrap gap-3 justify-center">
              {artist.social.instagram && (
                <motion.a
                        href={artist.social.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:shadow-lg"
                  whileHover={{ y: -3, scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Instagram size={16} />
                  Instagram
                </motion.a>
              )}
              
              {artist.social.facebook && (
                <motion.a
                        href={artist.social.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:shadow-lg"
                  whileHover={{ y: -3, scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Facebook size={16} />
                  Facebook
                </motion.a>
              )}
              
              {artist.social.youtube && (
                <motion.a
                        href={artist.social.youtube}
                        target="_blank"
                        rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:shadow-lg"
                  whileHover={{ y: -3, scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Youtube size={16} />
                  YouTube
                </motion.a>
              )}
              
              {artist.social.music && (
                <motion.a
                        href={artist.social.music}
                        target="_blank"
                        rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:shadow-lg"
                  whileHover={{ y: -3, scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Music size={16} />
                  Music
                </motion.a>
              )}
            </div>
          </div>

          {/* Enhanced Hover Effect Line */}
          <motion.div 
            className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-1 bg-gradient-to-r from-transparent via-purple-400 to-transparent rounded-full"
            initial={{ width: 0 }}
            whileHover={{ width: "75%" }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
};

export default FeaturedArtists; 