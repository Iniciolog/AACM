import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent } from '@/components/ui/card';

export default function CelebritiesSection() {
  const { language } = useLanguage();

  const content = {
    en: {
      title: 'Notable Practitioners',
      subtitle: 'Initiology is practiced by renowned professionals and public figures worldwide',
      description: 'Many prominent doctors, scientists, artists, and public figures have embraced Initiology as a complementary healing method, recognizing its effectiveness and scientific foundation.'
    },
    de: {
      title: 'Bemerkenswerte Praktiker',
      subtitle: 'Initiologie wird von renommierten Fachleuten und Persönlichkeiten weltweit praktiziert',
      description: 'Viele prominente Ärzte, Wissenschaftler, Künstler und Persönlichkeiten haben Initiologie als komplementäre Heilmethode angenommen und erkennen ihre Wirksamkeit und wissenschaftliche Grundlage an.'
    },
    ru: {
      title: 'Известные практики',
      subtitle: 'Инициологией занимаются известные специалисты и общественные деятели по всему миру',
      description: 'Многие видные врачи, ученые, артисты и общественные деятели приняли инициологию как дополнительный метод исцеления, признавая её эффективность и научную основу.'
    }
  };

  const data = content[language] || content.en;

  return (
    <section id="celebrities" className="py-20 md:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-serif text-fluid-xl font-bold mb-4" data-testid="text-celebrities-title">
            {data.title}
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
            {data.subtitle}
          </p>
        </div>

        <Card className="max-w-4xl mx-auto">
          <CardContent className="p-8">
            <p className="text-center text-lg text-muted-foreground leading-relaxed">
              {data.description}
            </p>
            <div className="mt-8 text-center">
              <p className="text-sm text-muted-foreground italic">
                {language === 'en' && 'Testimonials and endorsements available upon request'}
                {language === 'de' && 'Referenzen und Empfehlungen auf Anfrage erhältlich'}
                {language === 'ru' && 'Отзывы и рекомендации доступны по запросу'}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
