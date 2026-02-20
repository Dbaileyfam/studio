import { motion } from "framer-motion";
import { Mail, MapPin, Phone, Music, Instagram, Facebook } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-[#3f51b5] to-[#5c6bc0] text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Company Info */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <a href="/" className="inline-block mb-6">
              <h3 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
                801FamilyStudios
              </h3>
            </a>
            <p className="text-gray-200 leading-relaxed mb-6 max-w-md">
              Your home for all your music management needs. Professional services to help you organize, produce, and succeed in your musical journey.
            </p>
            <div className="flex space-x-4">
              <motion.a
                href="https://www.instagram.com/801familystudios/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/20 hover:bg-white/30 p-3 rounded-full transition-all duration-300 hover:scale-110"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Instagram size={20} />
              </motion.a>
              <motion.a
                href="https://www.facebook.com/profile.php?id=61573678227561"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/20 hover:bg-white/30 p-3 rounded-full transition-all duration-300 hover:scale-110"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Facebook size={20} />
              </motion.a>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4 className="text-lg font-semibold mb-6 text-white">Quick Links</h4>
            <ul className="space-y-3">
              {[
                { path: "/", label: "Home" },
                { path: "/featured-artists", label: "Featured Artists" },
                { path: "/upcoming-shows", label: "Upcoming Shows" },
                { path: "/contact", label: "Contact" },
              ].map((link) => (
                <li key={link.path}>
                  <a
                    href={link.path === "/" ? "/" : `#${link.path}`}
                    className="text-gray-200 hover:text-white transition-colors duration-300 hover:translate-x-1 inline-block"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="text-lg font-semibold mb-6 text-white">Contact Info</h4>
            <ul className="space-y-4">
              <li className="flex items-center space-x-3 text-gray-200">
                <Mail size={18} className="text-white/80" />
                <a href="mailto:info@801familystudios.com" className="hover:text-white transition-colors duration-300">
                  info@801familystudios.com
                </a>
              </li>
              <li className="flex items-center space-x-3 text-gray-200">
                <Mail size={18} className="text-white/80" />
                <a href="mailto:booking@801familystudios.com" className="hover:text-white transition-colors duration-300">
                  booking@801familystudios.com
                </a>
              </li>
              <li className="flex items-center space-x-3 text-gray-200">
                <MapPin size={18} className="text-white/80" />
                <span>Sandy, UT</span>
              </li>
              <li className="flex items-center space-x-3 text-gray-200">
                <Phone size={18} className="text-white/80" />
                <a href="tel:8019186782" className="hover:text-white transition-colors duration-300">
                  (801) 918-6782
                </a>
              </li>
              <li className="flex items-center space-x-3 text-gray-200">
                <Facebook size={18} className="text-white/80" />
                <a href="https://www.facebook.com/profile.php?id=61573678227561" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors duration-300">
                  Facebook
                </a>
              </li>
              <li className="flex items-center space-x-3 text-gray-200">
                <Instagram size={18} className="text-white/80" />
                <a href="https://www.instagram.com/801familystudios/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors duration-300">
                  Instagram
                </a>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          className="border-t border-white/20 mt-12 pt-8 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <p className="text-gray-300">
            © {currentYear} 801 Family Studios. All rights reserved. | Made with{" "}
            <Music className="inline-block w-4 h-4 text-pink-400 mx-1" />
            for music lovers
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
