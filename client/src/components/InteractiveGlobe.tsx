import { useState, useEffect, useRef } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

interface CountryData {
  name: string;
  flag: string;
  specialists: number;
  students: number;
  position: { x: number; y: number; z: number };
}

export default function InteractiveGlobe() {
  const { language } = useLanguage();
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [hoveredCountry, setHoveredCountry] = useState<CountryData | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const animationRef = useRef<number>();
  const containerRef = useRef<HTMLDivElement>(null);

  const countries: CountryData[] = [
    {
      name: language === 'ru' ? 'Европейский Союз' : language === 'de' ? 'Europäische Union' : 'European Union',
      flag: '🇪🇺',
      specialists: 245,
      students: 1850,
      position: { x: -30, y: 20, z: 50 },
    },
    {
      name: language === 'ru' ? 'СНГ' : language === 'de' ? 'GUS' : 'CIS',
      flag: '🇷🇺',
      specialists: 180,
      students: 1420,
      position: { x: 40, y: 15, z: 45 },
    },
    {
      name: language === 'ru' ? 'Китай' : language === 'de' ? 'China' : 'China',
      flag: '🇨🇳',
      specialists: 320,
      students: 2340,
      position: { x: 60, y: -10, z: 40 },
    },
    {
      name: language === 'ru' ? 'США' : language === 'de' ? 'USA' : 'USA',
      flag: '🇺🇸',
      specialists: 290,
      students: 2150,
      position: { x: -70, y: 0, z: 35 },
    },
  ];

  useEffect(() => {
    if (isHovering) {
      const animate = () => {
        setRotation((prev) => ({
          x: prev.x,
          y: prev.y + 0.3,
        }));
        animationRef.current = requestAnimationFrame(animate);
      };
      animationRef.current = requestAnimationFrame(animate);
    } else {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isHovering]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePos({ x, y });

    if (!isHovering) {
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateY = ((x - centerX) / centerX) * 15;
      const rotateX = ((y - centerY) / centerY) * -15;
      setRotation({ x: rotateX, y: rotateY });
    }
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto">
      <div
        ref={containerRef}
        className="relative h-[500px] perspective-1000"
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => {
          setIsHovering(false);
          setHoveredCountry(null);
        }}
        data-testid="globe-container"
      >
        <div
          className="absolute inset-0 flex items-center justify-center transition-transform duration-300 ease-out"
          style={{
            transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
            transformStyle: 'preserve-3d',
          }}
        >
          <div className="relative">
            <div
              className="w-80 h-80 rounded-full bg-gradient-to-br from-blue-900 via-blue-700 to-blue-500 shadow-2xl"
              style={{
                background: 'radial-gradient(circle at 30% 30%, #1e40af, #1e3a8a, #172554)',
                boxShadow: '0 0 80px rgba(59, 130, 246, 0.5), inset -20px -20px 80px rgba(0, 0, 0, 0.3)',
              }}
            >
              {countries.map((country, index) => (
                <button
                  key={index}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 text-4xl hover:scale-125 transition-transform duration-200 cursor-pointer"
                  style={{
                    left: `${50 + country.position.x}%`,
                    top: `${50 + country.position.y}%`,
                    transform: `translate(-50%, -50%) translateZ(${country.position.z}px)`,
                    filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))',
                  }}
                  onMouseEnter={() => setHoveredCountry(country)}
                  onMouseLeave={() => setHoveredCountry(null)}
                  data-testid={`flag-marker-${index}`}
                >
                  {country.flag}
                </button>
              ))}
            </div>

            <div className="absolute -inset-4">
              <div
                className="w-full h-full rounded-full border-2 border-blue-400/30"
                style={{
                  transform: 'translateZ(20px)',
                }}
              />
            </div>
          </div>
        </div>

        {hoveredCountry && (
          <div
            className="fixed z-50 bg-card border shadow-lg rounded-lg p-4 pointer-events-none transition-opacity duration-200"
            style={{
              left: mousePos.x + 20,
              top: mousePos.y + 20,
            }}
            data-testid="country-tooltip"
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">{hoveredCountry.flag}</span>
              <h3 className="font-serif font-semibold">{hoveredCountry.name}</h3>
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

      <style>{`
        .perspective-1000 {
          perspective: 1000px;
        }
      `}</style>
    </div>
  );
}
