import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route, useLocation, Navigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { ThemeProvider } from "next-themes";

// Pages
import Index from "./pages/Index";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import FeaturedArtists from "./pages/FeaturedArtists";
import UpcomingShows from "./pages/UpcomingShows";
import Store from "./pages/Store";
import StoreCheckout from "./pages/StoreCheckout";
import ServiceDetail from "./pages/ServiceDetail";
import LegacyServiceRedirect from "./pages/LegacyServiceRedirect";
import { SERVICES, getServicePath } from "@/lib/services";

// Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import InteractiveBackground from "./components/InteractiveBackground";
import MusicalNoteTrail from "./components/MusicalNoteTrail";
import ScrollToTop from "./components/ScrollToTop";

const queryClient = new QueryClient();

// Wrapper component to handle AnimatePresence with location
const AnimatedRoutes = () => {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait" key={location.pathname}>
      <Routes location={location}>
        <Route path="/" element={<Index />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/featured-artists" element={<FeaturedArtists />} />
        <Route path="/upcoming-shows" element={<UpcomingShows />} />
        <Route path="/store" element={<Store />} />
        <Route path="/store/checkout" element={<StoreCheckout />} />
        {SERVICES.map((service) => (
          <Route
            key={service.slug}
            path={getServicePath(service.slug)}
            element={<ServiceDetail />}
          />
        ))}
        <Route path="/services" element={<Navigate to="/#our-services" replace />} />
        <Route path="/services/:slug" element={<LegacyServiceRedirect />} />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <HashRouter>
        <ScrollToTop />
        <InteractiveBackground />
        <MusicalNoteTrail />
        <div className="flex flex-col min-h-screen relative z-[1]">
          <Navbar />
          <main className="flex-grow">
            <AnimatedRoutes />
          </main>
          <Footer />
        </div>
      </HashRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
