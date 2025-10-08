import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';
import globeImage from '@assets/generated_images/Interactive_academic_globe_with_flags_8fd0cde2.png';

interface CountryMarker {
  name: string;
  flag: string;
  specialists: number;
  students: number;
  position: { x: string; y: string };
}

export default function HeroSection() {
  const { t, language } = useLanguage();
  const [isHovering, setIsHovering] = useState(false);
  const [hoveredCountry, setHoveredCountry] = useState<CountryMarker | null>(null);

  const scrollToResearch = () => {
    const element = document.getElementById('research');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const countries: CountryMarker[] = [
    {
      name: language === 'ru' ? 'Европейский Союз' : language === 'de' ? 'Europäische Union' : 'European Union',
      flag: '🇪🇺',
      specialists: 245,
      students: 1850,
      position: { x: '35%', y: '40%' },
    },
    {
      name: language === 'ru' ? 'СНГ' : language === 'de' ? 'GUS' : 'CIS',
      flag: '🇷🇺',
      specialists: 180,
      students: 1420,
      position: { x: '60%', y: '35%' },
    },
    {
      name: language === 'ru' ? 'Китай' : language === 'de' ? 'China' : 'China',
      flag: '🇨🇳',
      specialists: 320,
      students: 2340,
      position: { x: '70%', y: '50%' },
    },
    {
      name: language === 'ru' ? 'США' : language === 'de' ? 'USA' : 'USA',
      flag: '🇺🇸',
      specialists: 290,
      students: 2150,
      position: { x: '25%', y: '48%' },
    },
  ];

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div
        className={`absolute inset-0 bg-cover bg-center transition-all duration-[3000ms] ${
          isHovering ? 'scale-110' : 'scale-100'
        }`}
        style={{
          backgroundImage: `linear-gradient(rgba(15, 23, 42, 0.7), rgba(15, 23, 42, 0.8)), url(${globeImage})`,
        }}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      />

      {countries.map((country, index) => (
        <button
          key={index}
          className="absolute z-20 text-4xl hover:scale-125 transition-transform duration-200 cursor-pointer"
          style={{
            left: country.position.x,
            top: country.position.y,
            transform: 'translate(-50%, -50%)',
            filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.5))',
          }}
          onMouseEnter={() => setHoveredCountry(country)}
          onMouseLeave={() => setHoveredCountry(null)}
          data-testid={`flag-marker-${index}`}
        >
          {country.flag}
        </button>
      ))}

      {hoveredCountry && (
        <div
          className="absolute z-30 bg-card/95 backdrop-blur-sm border shadow-xl rounded-lg p-4 pointer-events-none"
          style={{
            left: hoveredCountry.position.x,
            top: `calc(${hoveredCountry.position.y} + 60px)`,
            transform: 'translateX(-50%)',
          }}
          data-testid="country-tooltip"
        >
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl">{hoveredCountry.flag}</span>
            <h3 className="font-serif font-semibold text-foreground">{hoveredCountry.name}</h3>
          </div>
          <div className="space-y-1 text-sm text-muted-foreground whitespace-nowrap">
            <p>
              <span className="font-medium">
                {language === 'ru' ? 'Специалисты' : language === 'de' ? 'Spezialisten' : 'Specialists'}:
              </span>{' '}
              {hoveredCountry.specialists}
            </p>
            <p>
              <span className="font-medium">
                {language === 'ru' ? 'Студенты' : language === 'de' ? 'Studenten' : 'Students'}:
              </span>{' '}
              {hoveredCountry.students}
            </p>
          </div>
        </div>
      )}
      
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
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/80 hover:text-white transition-colors animate-bounce z-10"
        data-testid="button-scroll-down"
        aria-label="Scroll down"
      >
        <ChevronDown className="h-8 w-8" />
      </button>
    </section>
  );
}
