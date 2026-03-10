import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/featured-artists", label: "Featured Artists" },
    { path: "/upcoming-shows", label: "Upcoming Shows" },
    { path: "/contact", label: "Contact" },
  ];

  const merchStoreUrl = "https://801familymerch.myshopify.com";

  const isActive = (path: string) => {
    if (path === "/" && location.pathname === "/") return true;
    if (path !== "/" && location.pathname.includes(path)) return true;
    return false;
  };

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled || isOpen
          ? "bg-[#3f51b5]/95 backdrop-blur-md border-b border-white/20"
          : "bg-transparent"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <motion.div
            className="flex-shrink-0"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <a
              href="/"
              className="text-2xl md:text-3xl font-bold text-white hover:text-gray-200 transition-colors duration-300"
            >
              <span className="bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
                801FamilyStudios
              </span>
            </a>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center gap-6">
              <div className="flex items-center space-x-8">
                {navItems.map((item) => (
                  <motion.div key={item.path} className="flex items-center" whileHover={{ y: -2 }}>
                    <a
                      href={item.path === "/" ? "/" : `#${item.path}`}
                      className={`inline-flex items-center px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 relative group ${
                        isActive(item.path)
                          ? "text-[#3f51b5] bg-white/90 shadow-lg"
                          : "text-white hover:text-gray-200"
                      }`}
                    >
                      {item.label}
                      {isActive(item.path) && (
                        <motion.div
                          className="absolute inset-0 bg-white/90 rounded-md -z-10"
                          layoutId="activeTab"
                          transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        />
                      )}
                    </a>
                  </motion.div>
                ))}
              </div>
              <motion.a
                href={merchStoreUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-4 py-2 rounded-full text-sm font-semibold bg-white text-[#3f51b5] hover:bg-white/90 shadow-lg transition-all duration-300 hover:scale-105 whitespace-nowrap"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                Buy Merch Now
              </motion.a>
            </div>
          </div>

          {/* Mobile menu button */}
          <motion.div className="md:hidden">
            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-gray-200 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white transition-all duration-300"
              whileTap={{ scale: 0.95 }}
            >
              <span className="sr-only">Open main menu</span>
              <AnimatePresence mode="wait">
                {isOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="block h-6 w-6" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="block h-6 w-6" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </motion.div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="md:hidden"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="px-2 pt-2 pb-3 space-y-1 bg-[#3f51b5]/95 backdrop-blur-md border-t border-white/20">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.path}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <a
                    href={item.path === "/" ? "/" : `#${item.path}`}
                    onClick={() => setIsOpen(false)}
                    className={`block px-3 py-3 rounded-md text-base font-medium transition-all duration-300 ${
                      isActive(item.path)
                        ? "text-[#3f51b5] bg-white/90 shadow-lg"
                        : "text-white hover:text-gray-200 hover:bg-white/10"
                    }`}
                  >
                    {item.label}
                  </a>
                </motion.div>
              ))}
              <motion.a
                href={merchStoreUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsOpen(false)}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: navItems.length * 0.1 }}
                className="flex items-center justify-center mt-3 px-4 py-3 rounded-full text-base font-semibold bg-white text-[#3f51b5] hover:bg-white/90"
              >
                Buy Merch Now
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;
