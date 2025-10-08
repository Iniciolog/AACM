import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import ResearchSection from '@/components/ResearchSection';
import EducationSection from '@/components/EducationSection';
import BooksSection from '@/components/BooksSection';
import MethodDescriptionSection from '@/components/MethodDescriptionSection';
import EducationProgramSection from '@/components/EducationProgramSection';
import ChannelsSection from '@/components/ChannelsSection';
import ServicesSection from '@/components/ServicesSection';
import RMTBusinessSection from '@/components/RMTBusinessSection';
import AwardsSection from '@/components/AwardsSection';
import CelebritiesSection from '@/components/CelebritiesSection';
import AboutSection from '@/components/AboutSection';
import FAQSection from '@/components/FAQSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <ResearchSection />
        <MethodDescriptionSection />
        <EducationProgramSection />
        <EducationSection />
        <BooksSection />
        <ChannelsSection />
        <ServicesSection />
        <RMTBusinessSection />
        <AwardsSection />
        <CelebritiesSection />
        <AboutSection />
        <FAQSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
