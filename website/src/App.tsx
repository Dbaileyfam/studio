import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router-dom";
import { LEGACY_PATH_REDIRECTS } from "@/lib/legacyRoutes";
import { AnimatePresence } from "framer-motion";
import { ThemeProvider } from "next-themes";

// Pages
import Index from "./pages/Index";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import FeaturedArtists from "./pages/FeaturedArtists";
import UpcomingShows from "./pages/UpcomingShows";
import Store from "./pages/Store";
import ServiceDetail from "./pages/ServiceDetail";
import LegacyServiceRedirect from "./pages/LegacyServiceRedirect";
import MusicianRoster from "./pages/MusicianRoster";
import MusicianRosterThankYou from "./pages/MusicianRosterThankYou";
import MusicianRosterBrowse from "./pages/MusicianRosterBrowse";
import MusicianProfileFormPage from "./pages/MusicianProfileFormPage";
import MusicianRosterEditPage from "./pages/MusicianRosterEditPage";
import RosterPublicGate from "./components/RosterPublicGate";
import TermsOfService from "./pages/TermsOfService";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import { SERVICES, getServicePath } from "@/lib/services";
import { STORE_PATH } from "@/lib/siteNav";

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
        <Route path="/terms" element={<TermsOfService />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/featured-artists" element={<FeaturedArtists />} />
        <Route path="/upcoming-shows" element={<UpcomingShows />} />
        <Route path={STORE_PATH} element={<Store />} />
        <Route path="/store" element={<Navigate to={STORE_PATH} replace />} />
        <Route path="/store/checkout" element={<Navigate to={`${STORE_PATH}#order-form`} replace />} />
        <Route
          path="/musician-roster"
          element={
            <RosterPublicGate>
              <MusicianRoster />
            </RosterPublicGate>
          }
        />
        <Route
          path="/musician-roster/thank-you"
          element={
            <RosterPublicGate>
              <MusicianRosterThankYou />
            </RosterPublicGate>
          }
        />
        <Route
          path="/musician-roster/browse"
          element={
            <RosterPublicGate>
              <MusicianRosterBrowse />
            </RosterPublicGate>
          }
        />
        <Route
          path="/musician-profile-form"
          element={
            <RosterPublicGate>
              <MusicianProfileFormPage />
            </RosterPublicGate>
          }
        />
        <Route
          path="/musician-roster/edit"
          element={
            <RosterPublicGate>
              <MusicianRosterEditPage />
            </RosterPublicGate>
          }
        />
        {SERVICES.map((service) => (
          <Route
            key={service.slug}
            path={getServicePath(service.slug)}
            element={<ServiceDetail />}
          />
        ))}
        {Object.entries(LEGACY_PATH_REDIRECTS).map(([oldPath, slug]) => (
          <Route
            key={oldPath}
            path={`/${oldPath}`}
            element={<Navigate to={getServicePath(slug)} replace />}
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
        <BrowserRouter>
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
      </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
