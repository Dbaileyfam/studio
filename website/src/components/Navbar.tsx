import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Menu, X } from "lucide-react";
import { isRosterPublicPath, ROSTER_PUBLICLY_DISABLED } from "@/lib/musicianRoster";
import { SERVICES, getServicePath, type ServiceSlug } from "@/lib/services";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const servicesRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setServicesOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (servicesRef.current && !servicesRef.current.contains(event.target as Node)) {
        setServicesOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/featured-artists", label: "Featured Artists" },
    { path: "/musician-roster", label: "Musician Roster" },
    { path: "/musician-roster/browse", label: "Browse Musicians" },
    { path: "/upcoming-shows", label: "Upcoming Shows" },
    { path: "/store", label: "Store" },
    { path: "/contact", label: "Contact" },
  ].filter((item) => !(ROSTER_PUBLICLY_DISABLED && isRosterPublicPath(item.path)));

  const isPathActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname === path;
  };

  const isServiceActive = (slug: ServiceSlug) =>
    location.pathname === getServicePath(slug);

  const anyServiceActive = SERVICES.some((service) => isServiceActive(service.slug));

  const linkClass = (active: boolean) =>
    `inline-flex items-center px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 relative ${
      active
        ? "text-[var(--bg-base)] bg-white/95 shadow-lg"
        : "text-white hover:text-gray-200"
    }`;

  const mobileLinkClass = (active: boolean) =>
    `block px-3 py-3 rounded-md text-base font-medium transition-all duration-300 ${
      active
        ? "text-[var(--bg-base)] bg-white/95 shadow-lg"
        : "text-white hover:text-gray-200 hover:bg-white/10"
    }`;

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled || isOpen
          ? "bg-[var(--nav-bg)] backdrop-blur-xl border-b border-white/10 shadow-lg shadow-black/20"
          : "bg-transparent"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <nav
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        aria-label="Main navigation"
      >
        <div className="flex items-center justify-between h-16 md:h-20">
          <motion.div
            className="flex-shrink-0"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <Link
              to="/"
              className="text-2xl md:text-3xl font-bold text-white hover:text-gray-200 transition-colors duration-300"
            >
              <span className="bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
                801FamilyStudios
              </span>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden lg:block">
            <div className="ml-6 flex items-center gap-1 xl:gap-2">
              <motion.div className="flex items-center" whileHover={{ y: -2 }}>
                <Link to="/" className={linkClass(isPathActive("/"))}>
                  Home
                </Link>
              </motion.div>

              <div className="relative" ref={servicesRef}>
                <motion.button
                  type="button"
                  onClick={() => setServicesOpen((open) => !open)}
                  className={linkClass(anyServiceActive || servicesOpen)}
                  aria-expanded={servicesOpen}
                  aria-haspopup="true"
                >
                  Services
                  <ChevronDown
                    className={`ml-1 h-4 w-4 transition-transform ${servicesOpen ? "rotate-180" : ""}`}
                  />
                </motion.button>
                <AnimatePresence>
                  {servicesOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.15 }}
                      className="absolute left-0 top-full mt-2 w-56 rounded-xl border border-white/15 bg-[var(--nav-bg)]/95 backdrop-blur-xl shadow-xl py-2 z-50"
                      role="menu"
                    >
                      <Link
                        to="/#our-services"
                        className="block px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/10"
                        role="menuitem"
                        onClick={() => setServicesOpen(false)}
                      >
                        Overview on home
                      </Link>
                      <div className="my-2 h-px bg-white/10" aria-hidden />
                      {SERVICES.map((service) => (
                        <Link
                          key={service.slug}
                          to={getServicePath(service.slug)}
                          className={`block px-4 py-2 text-sm transition-colors ${
                            isServiceActive(service.slug)
                              ? "text-teal-300 bg-white/10 font-semibold"
                              : "text-gray-200 hover:text-white hover:bg-white/10"
                          }`}
                          role="menuitem"
                          onClick={() => setServicesOpen(false)}
                        >
                          {service.navLabel}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {navItems.slice(1).map((item) => (
                <motion.div key={item.path} className="flex items-center" whileHover={{ y: -2 }}>
                  <Link to={item.path} className={linkClass(isPathActive(item.path))}>
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Tablet: compact service links */}
          <div className="hidden md:flex lg:hidden items-center gap-3 text-xs">
            {SERVICES.slice(0, 4).map((service) => (
              <Link
                key={service.slug}
                to={getServicePath(service.slug)}
                className={`whitespace-nowrap font-medium transition-colors ${
                  isServiceActive(service.slug)
                    ? "text-teal-300"
                    : "text-white/90 hover:text-white"
                }`}
              >
                {service.navLabel}
              </Link>
            ))}
            <button
              type="button"
              onClick={() => setIsOpen(true)}
              className="text-white/90 hover:text-white font-medium"
            >
              More
            </button>
          </div>

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

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="md:hidden max-h-[calc(100vh-4rem)] overflow-y-auto"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <motion.div className="px-2 pt-2 pb-4 space-y-1 bg-[var(--nav-bg)] backdrop-blur-xl border-t border-white/10">
              <Link to="/" onClick={() => setIsOpen(false)} className={mobileLinkClass(isPathActive("/"))}>
                Home
              </Link>

              <p className="px-3 pt-3 pb-1 text-xs font-semibold uppercase tracking-wider text-gray-400">
                Services
              </p>
              <Link
                to="/#our-services"
                onClick={() => setIsOpen(false)}
                className={`${mobileLinkClass(false)} text-sm`}
              >
                Services overview
              </Link>
              {SERVICES.map((service, index) => (
                <motion.div
                  key={service.slug}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.04 }}
                >
                  <Link
                    to={getServicePath(service.slug)}
                    onClick={() => setIsOpen(false)}
                    className={mobileLinkClass(isServiceActive(service.slug))}
                  >
                    {service.navLabel}
                  </Link>
                </motion.div>
              ))}

              {navItems.slice(1).map((item, index) => (
                <motion.div
                  key={item.path}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: (SERVICES.length + index) * 0.04 }}
                >
                  <Link
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className={mobileLinkClass(isPathActive(item.path))}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;
