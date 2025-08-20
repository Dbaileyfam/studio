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
import benBrintonImage from "@/assets/BenBrinton.PNG";
import stealThisBandImage from "@/assets/Stealthisband.jpeg";


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
    },
    {
      name: "Ben Brinton",
      genre: "Acoustic/Singer-Songwriter",
      description: "Ben delivers a rich and captivating musical experience, blending a curated mix of beloved classics and rare gems through the shimmer of his 12-string acoustic guitar and masterful use of a looper pedal. With a velvety voice that draws listeners in, his original songs unfold like intimate stories—equally at home beside a crackling campfire, a chic cocktail lounge, or a private celebration under the stars. As a seasoned songwriter and producer, Ben crafts original music with depth and soul, bringing a personal touch that elevates each performance beyond the expected. Backed by over 20 years of live performance, Ben ensures a seamless, professional setup with high-quality sound tailored to the space. His compact, self-contained rig fits elegantly into any environment, offering a refined, flexible, and tasteful presence for discerning hosts and audiences alike.",
      image: benBrintonImage,
      social: {
        instagram: "https://www.instagram.com/benbrintonmusic/",
        facebook: "https://www.facebook.com/btbrinton",
        youtube: "https://www.youtube.com/@ddamionmusic1921",
        music: "https://open.spotify.com/album/4EkkVXuongVMH1mtwYCKSL?si=Ddy9m7YiSSGgmU2FkRJwwA"
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
              <span className="inline-block py-3 px-8 mb-6 text-lg font-bold bg-gradient-to-r from-white/20 to-white/10 text-white rounded-full border border-white/20 backdrop-blur-sm">
                Local Talent
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold tracking-tight mb-6 text-balance bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
                Featured Local Artists
              </h1>
              <p className="text-xl text-gray-200 max-w-4xl mx-auto leading-relaxed mb-8">
                Discover the incredible talent that makes up our local music scene. Each artist brings their unique style and passion to create unforgettable performances. From intimate acoustic sets to full-band experiences, our featured artists are available for private events, corporate functions, and special occasions.
              </p>
            </motion.div>

            {/* Artists Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
              {artists.map((artist, index) => (
                <motion.div
                  key={artist.name}
                  className="group relative"
                  variants={fadeIn}
                  initial="initial"
                  whileInView="animate"
                  viewport={{ once: true }}
                  custom={index}
                  whileHover={{ y: -8 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {/* Card Background Glow */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  {/* Artist Card */}
                  <div className="relative bg-white/10 backdrop-blur-sm rounded-3xl overflow-hidden border border-white/20 hover:border-white/40 transition-all duration-500 h-full flex flex-col">
                    {/* Image Container */}
                    <div className="relative aspect-[3/2] overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900">
                      <img
                        src={artist.image}
                        alt={`${artist.name} performing`}
                        className="w-full h-full object-cover object-center transition-all duration-700 group-hover:scale-110"
                        style={{ pointerEvents: 'auto' }}
                        onError={(e) => {
                          console.log('Image failed to load:', artist.name);
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                      
                      {/* Image Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      
                      {/* Genre Badge */}
                      <div className="absolute top-4 left-4 bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium border border-white/30">
                        {artist.genre}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 flex-grow flex flex-col">
                      {/* Artist Name */}
                      <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-gray-100 transition-colors duration-300">
                        {artist.name}
                      </h3>
                      
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
                            className="flex items-center gap-2 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg"
                            whileHover={{ y: -2 }}
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
                            className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg"
                            whileHover={{ y: -2 }}
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
                            className="flex items-center gap-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg"
                            whileHover={{ y: -2 }}
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
                            className="flex items-center gap-2 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg"
                            whileHover={{ y: -2 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <Music size={16} />
                            Music
                          </motion.a>
                        )}
                      </div>
                    </div>

                    {/* Hover Effect Line */}
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-1 bg-gradient-to-r from-transparent via-white to-transparent group-hover:w-3/4 transition-all duration-500 rounded-full"></div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Book Now Section */}
            <motion.div
              className="text-center mt-20"
              variants={fadeIn}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              custom={0}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Ready to Book Your Event?
              </h2>
              <p className="text-lg text-gray-200 mb-8 max-w-2xl mx-auto">
                Our featured artists are available for private events, corporate functions, weddings, and special occasions. Get in touch to discuss your needs and secure your date.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  asChild
                  size="lg"
                  className="rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-sm px-8 py-3 text-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-xl"
                >
                  <Link to="/#/event-booking">Event Booking</Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  className="rounded-full bg-white text-[#3f51b5] hover:bg-gray-100 border-0 px-8 py-3 text-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-xl"
                >
                  <Link to="/#/contact">Contact Us</Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </AnimatedPageTransition>
  );
};

export default FeaturedArtists; 