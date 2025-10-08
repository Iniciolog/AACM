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
import CelebritiesSection from '@/components/CelebritiesSection';
import AboutSection from '@/components/AboutSection';
import AwardsSection from '@/components/AwardsSection';
import FAQSection from '@/components/FAQSection';
import FilialsSection from '@/components/FilialsSection';
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
        <CelebritiesSection />
        <AboutSection />
        <AwardsSection />
        <FAQSection />
        <FilialsSection />
      </main>
      <Footer />
    </div>
  );
}
