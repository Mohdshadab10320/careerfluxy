import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroSection from "@/components/landing/HeroSection";
import FeaturesSection from "@/components/landing/FeaturesSection";
import HowItWorks from "@/components/landing/HowItWorks";
import PricingSection from "@/components/landing/PricingSection";
import TestimonialsSection from "@/components/landing/TestimonialsSection";
import LogoCloudSection from "@/components/landing/LogoCloudSection";
import AchieversStrip from "@/components/landing/AchieversStrip";
import StatsCounter from "@/components/landing/StatsCounter";
import CareerRoadmapSection from "@/components/landing/CareerRoadmapSection";
import FAQSection from "@/components/landing/FAQSection";

const Index = () => (
  <div className="min-h-screen bg-background overflow-x-hidden">
    <Navbar />
    <HeroSection />
    <LogoCloudSection />
    <FeaturesSection />
    <AchieversStrip />
    <HowItWorks />
    <CareerRoadmapSection />
    <StatsCounter />
    <PricingSection />
    <TestimonialsSection />
    <FAQSection />
    <Footer />
  </div>
);

export default Index;
