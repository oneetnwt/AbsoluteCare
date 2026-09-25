import { useState } from "react";
import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import FeaturesSection from "../components/FeaturesSection";
import PortalAccessSection from "../components/PortalAccessSection";
import Footer from "../components/Footer";
import HipaaModal from "../components/HipaaModal";

function LandingPage({ onNavigate }) {
  const [isHipaaModalOpen, setIsHipaaModalOpen] = useState(false);

  return (
    <div className="min-h-svh bg-white text-care-ink dark:bg-care-night dark:text-care-night-ink">
      <Header
        onNavigate={onNavigate}
        onOpenHipaa={() => setIsHipaaModalOpen(true)}
      />

      <main>
        <HeroSection
          onNavigate={onNavigate}
          onOpenHipaa={() => setIsHipaaModalOpen(true)}
        />
        <PortalAccessSection onNavigate={onNavigate} />
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
