import AnimatedPageTransition from "@/components/AnimatedPageTransition";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import logo from "@/assets/locologo.png";

const Index = () => {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: custom * 0.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] },
    }),
  };

  return (
    <AnimatedPageTransition>
      <div className="page-container">
        <div className="page-content">
          <div className="container-inner flex flex-col items-center">
            {/* Hero Section */}
            <section className="w-full pt-0 pb-2 md:pb-4 flex flex-col items-center relative">
              <motion.div
                className="text-center max-w-3xl mx-auto px-4 relative z-10"
                variants={fadeIn}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                custom={0}
              >
                <motion.div
                  className="text-center mb-4 relative"
                  variants={fadeIn}
                  initial="initial"
                  whileInView="animate"
                  viewport={{ once: true }}
                  custom={0}
                >
                </motion.div>
                <motion.div
                  className="w-96 md:w-[32rem] h-96 md:h-[32rem] mx-auto mb-8 bg-gradient-to-br from-[#3f51b5] to-[#5c6bc0] rounded-3xl flex items-center justify-center shadow-2xl border border-white/10 backdrop-blur-sm"
                  variants={fadeIn}
                  initial="initial"
                  whileInView="animate"
                  viewport={{ once: true }}
                  custom={0.2}
                  whileHover={{ 
                    scale: 1.02,
                    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
                  }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <img
                    src={logo}
                    alt="801 Family Studios Logo"
                    className="w-4/5 h-4/5 object-contain drop-shadow-lg"
                  />
                </motion.div>
                <motion.h1 
                  className="text-4xl md:text-5xl lg:text-6xl font-display font-bold tracking-tight mb-6 text-balance bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent"
                  variants={fadeIn}
                  initial="initial"
                  whileInView="animate"
                  viewport={{ once: true }}
                  custom={0.3}
                >
                  Your home for all your music management needs
                </motion.h1>
                <motion.p 
                  className="text-lg md:text-xl text-gray-100 mb-10 max-w-2xl mx-auto text-pretty leading-relaxed"
                  variants={fadeIn}
                  initial="initial"
                  whileInView="animate"
                  viewport={{ once: true }}
                  custom={0.4}
                >
                  Professional music management services to help you organize, produce, and succeed in your musical journey.
                </motion.p>
                <motion.div 
                  className="flex flex-col sm:flex-row gap-6 justify-center"
                  variants={fadeIn}
                  initial="initial"
                  whileInView="animate"
                  viewport={{ once: true }}
                  custom={0.5}
                >
                  <Button 
                    asChild 
                    size="lg" 
                    className="rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-sm px-8 py-3 text-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-xl"
                  >
                    <Link to="/featured-artists">Featured Artists</Link>
                  </Button>
                  <Button 
                    asChild 
                    size="lg" 
                    className="rounded-full bg-white text-[#3f51b5] hover:bg-gray-100 border-0 px-8 py-3 text-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-xl"
                  >
                    <Link to="/contact">Contact Us</Link>
                  </Button>
                </motion.div>
              </motion.div>

              <motion.div
                className="w-full mt-16 md:mt-24 aspect-[16/9] max-w-5xl mx-auto overflow-hidden rounded-3xl shadow-2xl relative group"
                variants={fadeIn}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                custom={1}
              >
                {/* Video Container */}
                <div className="relative w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl overflow-hidden">
                  {/* Video Element */}
                  <video
                    className="w-full h-full object-cover"
                    controls
                    preload="metadata"
                    crossOrigin="anonymous"
                    onLoadedMetadata={(e) => {
                      console.log('Video loaded successfully');
                    }}
                    onError={(e) => {
                      console.error('Video failed to load:', e);
                    }}
                    onLoadStart={() => {
                      console.log('Video loading started');
                    }}
                  >
                    <source src="801famstudiosvid.MOV" type="video/quicktime" />
                    <source src="801famstudiosvid.MOV" type="video/mp4" />
                    <source src="801famstudiosvid.MOV" type="video/x-msvideo" />
                    <source src="801famstudiosvid.MOV" type="video/*" />
                    Your browser does not support the video tag.
                  </video>
                  
                  {/* Browser Compatibility Message */}
                  <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm border border-white/20">
                    <span className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></span>
                      .MOV Format
                    </span>
                  </div>
                  
                  {/* Download Button */}
                  <div className="absolute top-4 left-4">
                    <a 
                      href="801famstudiosvid.MOV" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-block bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-full border border-white/30 transition-all duration-300 backdrop-blur-sm"
                    >
                      📥 Download
                    </a>
                  </div>
                  
                  {/* Video Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  {/* Floating Content Overlay */}
                  <div className="absolute bottom-6 left-6 right-6 z-20 text-white">
                    <h3 className="text-2xl md:text-3xl font-bold mb-2 drop-shadow-lg">801 Family Studios</h3>
                    <p className="text-lg opacity-90 drop-shadow-lg">Experience the energy and passion of live music</p>
                  </div>
                </div>
                
              </motion.div>
            </section>

            {/* Services Section */}
            <section className="w-full py-24">
              <motion.div
                className="text-center mb-20"
                variants={fadeIn}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                custom={0}
              >
                <span className="inline-block py-3 px-8 mb-6 text-lg font-bold bg-gradient-to-r from-white/20 to-white/10 text-white rounded-full border border-white/20 backdrop-blur-sm">
                  Our Services
                </span>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-balance text-white mb-6">
                  Recording and management services in one convenient location
                </h2>
                <p className="text-lg text-gray-200 max-w-3xl mx-auto leading-relaxed">
                  Comprehensive music services designed to elevate your sound and career
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 md:gap-12">
                {[
                  {
                    title: "Recording Services",
                    description: "Affordable and professional studio recording with dedicated sound engineers to help bring your music to life.",
                    icon: "🎙️",
                    gradient: "from-blue-500/20 to-purple-500/20",
                    borderColor: "border-blue-400/30"
                  },
                  {
                    title: "Booking Services",
                    description: "We'll help you find the perfect local venues and events for your music. Our team manages all the details, from negotiations to logistics, so you can focus on performing.",
                    icon: "🎸",
                    gradient: "from-green-500/20 to-teal-500/20",
                    borderColor: "border-green-400/30"
                  },
                  {
                    title: "Artist Management",
                    description: "Professional guidance to help you navigate the music industry, build your brand, and achieve your musical goals.",
                    icon: "🎵",
                    gradient: "from-orange-500/20 to-red-500/20",
                    borderColor: "border-orange-400/30"
                  },
                  {
                    title: "Advanced Drum Lessons",
                    description: "Take your drumming to the next level with personalized instruction from experienced professionals. Learn advanced techniques, timing, and musical theory.",
                    icon: "🥁",
                    gradient: "from-indigo-500/20 to-purple-500/20",
                    borderColor: "border-indigo-400/30"
                  }
                ].map((service, index) => (
                  <motion.div
                    key={service.title}
                    className="group relative"
                    variants={fadeIn}
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true }}
                    custom={index * 0.2}
                    whileHover={{ y: -8 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {/* Card Background */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                    
                    {/* Card Content */}
                    <div className={`relative bg-white/10 backdrop-blur-sm rounded-3xl p-8 border ${service.borderColor} hover:border-white/40 transition-all duration-500 h-full flex flex-col`}>
                      {/* Icon */}
                      <div className="text-6xl mb-6 text-center group-hover:scale-110 transition-transform duration-300">
                        {service.icon}
                      </div>
                      
                      {/* Title */}
                      <h3 className="text-2xl font-bold text-white mb-4 text-center group-hover:text-gray-100 transition-colors duration-300">
                        {service.title}
                      </h3>
                      
                      {/* Description */}
                      <p className="text-gray-200 leading-relaxed text-center flex-grow group-hover:text-gray-100 transition-colors duration-300">
                        {service.description}
                      </p>
                      
                      {/* Hover Effect Line */}
                      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-1 bg-gradient-to-r from-transparent via-white to-transparent group-hover:w-3/4 transition-all duration-500 rounded-full"></div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </AnimatedPageTransition>
  );
};

export default Index;
