import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';
import { useState, useEffect } from 'react';
import globeImage from '@assets/globe-earth.jpg';

interface CountryMarker {
  name: string;
  flag: string;
  specialists: number;
  students: number;
  angle: number;
}

export default function HeroSection() {
  const { t, language } = useLanguage();
  const [isHovering, setIsHovering] = useState(false);
  const [hoveredCountry, setHoveredCountry] = useState<CountryMarker | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [flagPositions, setFlagPositions] = useState([
    { x: 150, y: -280 },
    { x: -250, y: -100 },
    { x: 180, y: 320 },
    { x: 150, y: 180 },
  ]);
  const [draggingIndex, setDraggingIndex] = useState<number | null>(null);

  const scrollToResearch = () => {
    const element = document.getElementById('research');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (draggingIndex === null) return;
    
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    const x = e.clientX - centerX;
    const y = e.clientY - centerY;
    
    setFlagPositions(prev => {
      const newPositions = [...prev];
      newPositions[draggingIndex] = { x, y };
      return newPositions;
    });
  };

  const handleMouseUp = () => {
    setDraggingIndex(null);
  };

  useEffect(() => {
    if (draggingIndex !== null) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [draggingIndex]);

  const countries: CountryMarker[] = [
    {
      name: language === 'ru' ? 'Европейский Союз' : language === 'de' ? 'Europäische Union' : 'European Union',
      flag: '🇪🇺',
      specialists: 245,
      students: 1850,
      angle: 0,
    },
    {
      name: language === 'ru' ? 'СНГ' : language === 'de' ? 'GUS' : 'CIS',
      flag: '🇷🇺',
      specialists: 180,
      students: 1420,
      angle: 0,
    },
    {
      name: language === 'ru' ? 'Китай' : language === 'de' ? 'China' : 'China',
      flag: '🇨🇳',
      specialists: 320,
      students: 2340,
      angle: 0,
    },
    {
      name: language === 'ru' ? 'США' : language === 'de' ? 'USA' : 'USA',
      flag: '🇺🇸',
      specialists: 290,
      students: 2150,
      angle: 0,
    },
  ];

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center globe-rotate"
        style={{
          backgroundImage: `linear-gradient(rgba(15, 23, 42, 0.3), rgba(15, 23, 42, 0.4)), url(${globeImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      />
      
      {countries.map((country, index) => {
        const pos = flagPositions[index];
        const x = pos.x;
        const y = pos.y;

        return (
          <div key={index} className="absolute z-20" style={{ left: '50%', top: '50%' }}>
            <button
              className={`absolute text-5xl hover:scale-125 transition-all duration-300 ${
                isEditMode ? 'cursor-move' : 'cursor-pointer'
              }`}
              style={{
                transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.6))',
              }}
              onMouseEnter={() => {
                if (!isEditMode) {
                  setHoveredCountry(country);
                  setHoveredIndex(index);
                }
              }}
              onMouseLeave={() => {
                if (!isEditMode) {
                  setHoveredCountry(null);
                  setHoveredIndex(null);
                }
              }}
              onMouseDown={(e) => {
                if (isEditMode) {
                  e.preventDefault();
                  setDraggingIndex(index);
                }
              }}
              data-testid={`flag-marker-${index}`}
            >
              {country.flag}
            </button>

            {isEditMode && (
              <div
                className="absolute text-xs bg-black/80 text-white px-2 py-1 rounded pointer-events-none whitespace-nowrap"
                style={{
                  transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px + 50px))`,
                }}
              >
                x:{x.toFixed(0)}, y:{y.toFixed(0)}
              </div>
            )}

            {hoveredCountry === country && hoveredIndex === index && (
              <div
                className="absolute z-30 bg-card/95 backdrop-blur-sm border shadow-xl rounded-lg p-4 pointer-events-none whitespace-nowrap"
                style={{
                  transform: `translate(calc(-50% + ${x}px + 80px), calc(-50% + ${y}px))`,
                }}
                data-testid="country-tooltip"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">{hoveredCountry.flag}</span>
                  <h3 className="font-serif font-semibold text-foreground">{hoveredCountry.name}</h3>
                </div>
                <div className="space-y-1 text-sm text-muted-foreground">
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
          </div>
        );
      })}

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center text-white">
        <h1
          className="font-serif text-5xl md:text-7xl font-bold mb-6 leading-tight"
          data-testid="text-hero-title"
        >
          {t('hero.title')}
        </h1>
        <p className="text-lg md:text-xl mb-16 text-gray-200 max-w-3xl mx-auto leading-relaxed">
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

      <style>{`
        @keyframes rotate-globe {
          0% {
            transform: scale(1) rotate(0deg);
          }
          50% {
            transform: scale(1.05) rotate(2deg);
          }
          100% {
            transform: scale(1) rotate(0deg);
          }
        }

        .globe-rotate {
          animation: rotate-globe 20s ease-in-out infinite;
        }
      `}</style>

      <button
        onClick={scrollToResearch}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/80 hover:text-white transition-colors animate-bounce z-10"
        data-testid="button-scroll-down"
        aria-label="Scroll down"
      >
        <ChevronDown className="h-8 w-8" />
      </button>

      <button
        onClick={() => setIsEditMode(!isEditMode)}
        className="fixed top-24 right-6 z-50 bg-card/95 backdrop-blur-sm border px-4 py-2 rounded-md hover-elevate active-elevate-2 text-sm font-medium"
        data-testid="button-edit-mode"
      >
        {isEditMode ? '✓ Сохранить' : '⚙️ Редактор флагов'}
      </button>

      {isEditMode && (
        <div className="fixed top-36 right-6 z-50 bg-card/95 backdrop-blur-sm border rounded-lg p-4 max-w-xs">
          <h3 className="font-semibold mb-2 text-sm">Позиции флагов:</h3>
          <pre className="text-xs bg-muted p-2 rounded overflow-auto max-h-48">
            {`const flagPositions = [
  ${flagPositions.map(p => `{ x: ${p.x.toFixed(0)}, y: ${p.y.toFixed(0)} }`).join(',\n  ')}
];`}
          </pre>
          <p className="text-xs text-muted-foreground mt-2">
            Перетащите флаги в любую точку экрана
          </p>
        </div>
      )}
    </section>
  );
}
