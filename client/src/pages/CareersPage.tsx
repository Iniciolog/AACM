import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, Briefcase, Users } from 'lucide-react';
import { Link } from 'wouter';

export default function CareersPage() {
  const { t } = useLanguage();

  const positions = [
    {
      id: 'position1',
      benefits: [
        t('careers.position1.benefit1'),
        t('careers.position1.benefit2'),
        t('careers.position1.benefit3'),
        t('careers.position1.benefit4'),
        t('careers.position1.benefit5'),
        t('careers.position1.benefit6'),
      ]
    },
    {
      id: 'position2',
      benefits: [
        t('careers.position2.benefit1'),
        t('careers.position2.benefit2'),
        t('careers.position2.benefit3'),
        t('careers.position2.benefit4'),
        t('careers.position2.benefit5'),
      ]
    },
    {
      id: 'position3',
      benefits: [
        t('careers.position3.benefit1'),
        t('careers.position3.benefit2'),
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-6 py-20">
        <Link href="/">
          <Button variant="ghost" className="mb-8" data-testid="button-back-home">
            ← {t('nav.home')}
          </Button>
        </Link>

        <div className="text-center mb-12">
          <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4" data-testid="text-careers-title">
            {t('careers.title')}
          </h1>
          <p className="text-lg text-muted-foreground">
            {t('careers.subtitle')}
          </p>
        </div>

        <div className="space-y-8">
          {positions.map((position, posIndex) => (
            <Card key={position.id} data-testid={`card-job-${position.id}`}>
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Briefcase className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-2xl" data-testid={`title-${position.id}`}>
                    {t(`careers.${position.id}.title`)}
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <h3 className="font-semibold text-lg mb-4">
                  {t(`careers.${position.id}.benefits.title`)}
                </h3>
                <ul className="space-y-3">
                  {position.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start gap-3" data-testid={`benefit-${position.id}-${index}`}>
                      <div className="mt-0.5">
                        <Check className="w-5 h-5 text-primary flex-shrink-0" />
                      </div>
                      <span className="text-muted-foreground">{benefit}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-8 flex gap-4">
                  <a href={`https://wa.me/19297174941`} target="_blank" rel="noopener noreferrer" className="flex-1">
                    <Button className="w-full" data-testid={`button-apply-whatsapp-${position.id}`}>
                      {t('careers.apply')}
                    </Button>
                  </a>
                  <a href={`mailto:${t('footer.email')}`} className="flex-1">
                    <Button variant="outline" className="w-full" data-testid={`button-apply-email-${position.id}`}>
                      {t('footer.email')}
                    </Button>
                  </a>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="mt-8" data-testid="card-cooperation">
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <CardTitle className="text-2xl" data-testid="title-cooperation">
                {t('careers.cooperation.title')}
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground leading-relaxed" data-testid="text-cooperation">
              {t('careers.cooperation.text')}
            </p>
            <div className="mt-8 flex gap-4">
              <a href={`https://wa.me/19297174941`} target="_blank" rel="noopener noreferrer" className="flex-1">
                <Button className="w-full" data-testid="button-apply-whatsapp-cooperation">
                  {t('careers.apply')}
                </Button>
              </a>
              <a href={`mailto:${t('footer.email')}`} className="flex-1">
                <Button variant="outline" className="w-full" data-testid="button-apply-email-cooperation">
                  {t('footer.email')}
                </Button>
              </a>
            </div>
          </CardContent>
        </Card>

        <div className="text-center text-sm text-muted-foreground mt-8">
          <p>{t('footer.contact')}: {t('footer.phone')}</p>
        </div>
      </div>
    </div>
  );
}
