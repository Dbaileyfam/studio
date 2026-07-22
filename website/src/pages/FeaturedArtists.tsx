import AnimatedPageTransition from "@/components/AnimatedPageTransition";
import ArtistProfileCard from "@/components/ArtistProfileCard";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import tribeImage from "@/assets/Tribeof1.jpg";
import swaggerImage from "@/assets/swagger1.jpg";

import fngImage from "@/assets/fng2.jpg";
import dubNectarLogo from "@/assets/dub-nectar-logo.png";
import alleyKatsImage from "@/assets/TheAlleyKats.jpeg";
import fearAndLoathingImage from "@/assets/Fearandloathing.JPEG";
import stealThisBandImage from "@/assets/Stealthisband.JPEG";
// Image imports
import djNapoImage from "@/assets/djnapo.jpg";
import niceAndSwellImage from "@/assets/niceandswell.JPG";
import masterKennedyImage from "@/assets/masterkennedy-qzdRC3be.jpg";
import belleroseImage from "@/assets/IMG_0710.jpg";
import bigElectricImage from "@/assets/big-electric.jpg";
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
        music: "https://open.spotify.com/artist/5zu4Hxw96i76KQ6ffhFaCj?si=IiuWvU1EQkKCcm6Nh7QbpA",
        website: "https://www.thealleykatsvibe.com/index.html",
        epk: "https://www.thealleykatsvibe.com/epk.html"
      }
    },
    {
      name: "The Bellerose Band",
      genre: "Roots Rock, Blues, Modern Blues Rock, Rhythm & Blues, Old Soul",
      description: "West coast rock meets dustbowl twang... with the blues in between. Kelly Bellerose is a Salt Lake City-based singer, songwriter, and recording artist borne from the effervescent brush strokes that have colored her life, offering music that digs deep into American soil to cultivate a rootsy core. Kelly's homegrown and gutsy voice is peppered with a bluesy edge, and although she's a West Coast girl, her Okie lineage echoes through every note she sings. This is the essence of the BELLEROSE BAND sound.",
      image: belleroseImage,
      imageFit: "cover" as const,
      social: {
        instagram: "https://www.instagram.com/bellerose_music/",
        facebook: "https://www.facebook.com/kelly.bellerose.3",
        youtube: "https://www.youtube.com/@kellybellerose5153",
        music: "https://open.spotify.com/artist/4wfkMUFPjgTR80I0sCuG1S",
        website: "https://bellerosemusic.com/",
        epk: "https://kellybellerosethebelleroseband.bandzoogle.com/home"
      }
    },
    {
      name: "Big Electric",
      genre: "Rock / Funk / Party Covers",
      description:
        "Park City’s high-voltage cover band — throwbacks and deep-cut bangers from the ’60s to the 2000s, blended with rock, funk, and jam-infused interludes that keep the party going. Seasoned players from Salt Lake City, New York, the West Coast, and Europe plug in and light up the night.",
      image: bigElectricImage,
      social: {
        instagram: "https://www.instagram.com/big_electric_band/",
        facebook: "",
        youtube: "",
        music: "",
      },
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
      name: "Dub Nectar",
      genre: "Reggae/Funk",
      description: "Blending smooth reggae rhythms with infectious funk grooves, Dub Nectar creates an uplifting musical experience that gets everyone moving. Their vibrant performances combine island vibes with soulful funk elements.",
      image: dubNectarLogo,
      imageFit: "contain" as const,
      social: {
        instagram: "https://www.instagram.com/thedubnectar/",
        facebook: "https://www.facebook.com/newbornslaves",
        youtube: "https://www.youtube.com/@DubNectar",
        music: "https://open.spotify.com/artist/3VOB8pqczKq08vAJYIXmeO",
        website: "https://www.dubnectar.com",
        epk: "https://www.dubnectar.com/epk.html"
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
      name: "The Unaffected",
      genre: "Rock / Hard Rock / Alternative",
      description:
        "High-energy rock from Salt Lake City blending hard rock and metal power, pop-rock melody, blues soul, and grunge attitude. The Unaffected fearlessly mixes diverse sounds into a unique sonic identity that defies categorization — from intimate rooms to stages like Whisky A Go Go.",
      image:
        "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1080&q=80",
      social: {
        instagram: "https://www.instagram.com/the_unaffected_/",
        facebook: "",
        youtube: "",
        music: "",
        website: "https://dbaileyfam.github.io/theunaffectedepk/",
        epk: "https://dbaileyfam.github.io/theunaffectedepk/",
      },
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
        music: "https://open.spotify.com/artist/5Tar1xOfXyy1tPlUYIAzwt",
        epk: "https://dbaileyfam.github.io/TribeofIEPK/#bio"
      }
    }
  ];

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

            {/* Two-column layout: artists left, playlist right */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
              {/* Artists - left side */}
              <div className="lg:col-span-7 xl:col-span-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
                  {artists.map((artist, index) => (
                    <ArtistProfileCard key={artist.name} artist={artist} index={index} />
                  ))}
                </div>
              </div>

              {/* Spotify Playlist - right side, sticky on desktop */}
              <motion.div
                className="lg:col-span-5 xl:col-span-4 lg:sticky lg:top-28 self-start"
                variants={fadeIn}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                custom={0}
              >
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 text-center lg:text-left">
                  Listen on Spotify
                </h2>
                <div className="rounded-2xl overflow-hidden border border-white/20 bg-white/5 p-4 md:p-6">
                  <iframe
                    title="801 Family Studios Featured Artists Playlist"
                    className="rounded-xl w-full"
                    src="https://open.spotify.com/embed/playlist/030kAPK335FET5i53afT9d?utm_source=generator"
                    width="100%"
                    height="352"
                    frameBorder="0"
                    allowFullScreen
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    loading="lazy"
                  />
                </div>
              </motion.div>
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

export default FeaturedArtists;
