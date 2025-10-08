import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';
import InteractiveGlobe from './InteractiveGlobe';

export default function HeroSection() {
  const { t } = useLanguage();

  const scrollToResearch = () => {
    const element = document.getElementById('research');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-background via-primary/5 to-background">
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-32">
        <div className="text-center mb-16">
          <h1
            className="font-serif text-5xl md:text-7xl font-bold mb-6 leading-tight"
            data-testid="text-hero-title"
          >
            {t('hero.title')}
          </h1>
          <p className="text-lg md:text-xl mb-12 text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {t('hero.subtitle')}
          </p>
        </div>

        <div className="mb-12">
          <InteractiveGlobe />
        </div>

        <div className="text-center">
          <Button
            size="lg"
            onClick={scrollToResearch}
            className="text-lg px-8"
            data-testid="button-hero-cta"
          >
            {t('hero.cta')}
          </Button>
        </div>
      </div>

      <button
        onClick={scrollToResearch}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted-foreground hover:text-foreground transition-colors animate-bounce"
        data-testid="button-scroll-down"
        aria-label="Scroll down"
      >
        <ChevronDown className="h-8 w-8" />
      </button>
    </section>
  );
}
