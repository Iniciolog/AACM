import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import ResearchSection from '@/components/ResearchSection';
import EducationSection from '@/components/EducationSection';
import BooksSection from '@/components/BooksSection';
import ChannelsSection from '@/components/ChannelsSection';
import ServicesSection from '@/components/ServicesSection';
import RMTBusinessSection from '@/components/RMTBusinessSection';
import AboutSection from '@/components/AboutSection';
import FAQSection from '@/components/FAQSection';
import Footer from '@/components/Footer';

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <ResearchSection />
        <EducationSection />
        <BooksSection />
        <ChannelsSection />
        <ServicesSection />
        <RMTBusinessSection />
        <AboutSection />
        <FAQSection />
      </main>
      <Footer />
    </div>
  );
}
