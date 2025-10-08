import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import researchImg from '@assets/generated_images/Scientific_research_background_imagery_ead371c5.png';
import conferenceImg from '@assets/generated_images/International_academic_conference_scene_55be42fe.png';
import labImg from '@assets/generated_images/Modern_research_laboratory_setting_a6304ace.png';

export default function ResearchSection() {
  const { t } = useLanguage();

  const articles = [
    {
      id: 1,
      image: researchImg,
      title: t('research.article1.title'),
      description: t('research.article1.desc'),
    },
    {
      id: 2,
      image: conferenceImg,
      title: t('research.article2.title'),
      description: t('research.article2.desc'),
    },
    {
      id: 3,
      image: labImg,
      title: t('research.article3.title'),
      description: t('research.article3.desc'),
    },
  ];

  return (
    <section id="research" className="py-20 md:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4" data-testid="text-research-title">
            {t('research.title')}
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            {t('research.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article) => (
            <Card
              key={article.id}
              className="hover-elevate transition-all duration-300 overflow-hidden"
              data-testid={`card-article-${article.id}`}
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
              <CardHeader>
                <CardTitle className="font-serif text-xl">{article.title}</CardTitle>
                <CardDescription className="text-sm">{article.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button
                  variant="ghost"
                  className="group"
                  data-testid={`button-read-more-${article.id}`}
                >
                  {t('research.readmore')}
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
