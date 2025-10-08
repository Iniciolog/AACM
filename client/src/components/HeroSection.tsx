import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';
import globeImage from '@assets/generated_images/Interactive_academic_globe_with_flags_8fd0cde2.png';

export default function HeroSection() {
  const { t } = useLanguage();

  const scrollToResearch = () => {
    const element = document.getElementById('research');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(rgba(15, 23, 42, 0.7), rgba(15, 23, 42, 0.8)), url(${globeImage})`,
        }}
      />
      
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center text-white">
        <h1
          className="font-serif text-5xl md:text-7xl font-bold mb-6 leading-tight"
          data-testid="text-hero-title"
        >
          {t('hero.title')}
        </h1>
        <p className="text-lg md:text-xl mb-12 text-gray-200 max-w-3xl mx-auto leading-relaxed">
          {t('hero.subtitle')}
        </p>
        <Button
          size="lg"
          onClick={scrollToResearch}
          className="text-lg px-8"
          data-testid="button-hero-cta"
        >
          {t('hero.cta')}
        </Button>
      </div>

      <button
        onClick={scrollToResearch}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/80 hover:text-white transition-colors animate-bounce"
        data-testid="button-scroll-down"
        aria-label="Scroll down"
      >
        <ChevronDown className="h-8 w-8" />
      </button>
    </section>
  );
}
