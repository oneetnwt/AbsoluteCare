import { useState } from "react";
import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import FeaturesSection from "../components/FeaturesSection";
import Footer from "../components/Footer";
import HipaaModal from "../components/HipaaModal";

function LandingPage({ onNavigate }) {
  const [isHipaaModalOpen, setIsHipaaModalOpen] = useState(false);

  return (
    <div className="min-h-svh overflow-x-hidden bg-care-canvas text-care-ink dark:bg-care-night dark:text-care-night-ink">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-care-green-900 focus:px-4 focus:py-3 focus:text-sm focus:font-bold focus:text-white"
      >
        Skip to main content
      </a>
      <Header
        onNavigate={onNavigate}
        onOpenHipaa={() => setIsHipaaModalOpen(true)}
      />

      <main id="main-content">
        <HeroSection
          onNavigate={onNavigate}
          onOpenHipaa={() => setIsHipaaModalOpen(true)}
        />
        <FeaturesSection />
      </main>

      <Footer
        onNavigate={onNavigate}
        onOpenHipaa={() => setIsHipaaModalOpen(true)}
      />

      <HipaaModal
        isOpen={isHipaaModalOpen}
        onClose={() => setIsHipaaModalOpen(false)}
      />
    </div>
  );
}

export default LandingPage;
