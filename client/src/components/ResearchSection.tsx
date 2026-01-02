import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function ResearchSection() {
  const { t } = useLanguage();

  return (
    <section id="research" className="py-20 md:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-serif text-fluid-xl font-bold mb-4" data-testid="text-research-title">
            {t('research.title')}
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            {t('research.subtitle')}
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="overflow-hidden" data-testid="card-research-study">
            <div className="relative h-64 md:h-80 overflow-hidden">
              <img
                src="https://static.tildacdn.com/tild6132-3436-4166-b739-353336393030/research.jpeg"
                alt={t('research.study1.title')}
                className="w-full h-full object-cover"
                data-testid="img-research"
              />
            </div>
            <CardHeader>
              <CardTitle className="font-serif text-2xl md:text-3xl" data-testid="text-research-study-title">
                {t('research.study1.title')}
              </CardTitle>
              <CardDescription className="text-base mt-4" data-testid="text-research-study-desc">
                {t('research.study1.desc')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-lg font-semibold text-foreground" data-testid="text-research-study-result">
                {t('research.study1.result')}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
