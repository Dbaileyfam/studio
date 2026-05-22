import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route, useLocation } from "react-router-dom";
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
import ServicesIndex from "./pages/ServicesIndex";
import ServiceDetail from "./pages/ServiceDetail";

// Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import InteractiveBackground from "./components/InteractiveBackground";
import MusicalNoteTrail from "./components/MusicalNoteTrail";

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
        <Route path="/services" element={<ServicesIndex />} />
        <Route path="/services/:slug" element={<ServiceDetail />} />
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
