import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";
import GiftCardSection from "@/components/GiftCardSection";
import Footer from "@/components/Footer";
import {MapaUbicacion} from "@/components/Maps";
import WhatsAppButton from "@/components/WhatsappButton";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <ServicesSection />
      <AboutSection />
      <ContactSection />
      <GiftCardSection />
      <MapaUbicacion />
      <WhatsAppButton/>
      <Footer />
    </div>
  );
};

export default Index;
