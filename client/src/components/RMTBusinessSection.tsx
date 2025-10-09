import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';

export default function RMTBusinessSection() {
  const { t } = useLanguage();

  const plans = [
    {
      key: 'small',
      features: 6
    },
    {
      key: 'medium',
      features: 6,
      featured: true
    },
    {
      key: 'large',
      features: 6
    }
  ];

  return (
    <section id="rmt" className="py-20 md:py-32 bg-card">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4" data-testid="text-rmt-title">
            {t('rmt.title')}
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
            {t('rmt.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {plans.map((plan) => (
            <Card 
              key={plan.key}
              className={`hover-elevate transition-all duration-300 ${plan.featured ? 'ring-2 ring-primary' : ''}`}
              data-testid={`card-plan-${plan.key}`}
            >
              <CardHeader>
                <CardTitle className="text-2xl font-serif">
                  {t(`rmt.plans.${plan.key}.title`)}
                </CardTitle>
                <CardDescription className="mt-2">
                  {t('rmt.plans.warranty')}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {Array.from({ length: plan.features }, (_, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-sm">
                        {t(`rmt.plans.${plan.key}.feature${i + 1}`)}
                      </span>
                    </li>
                  ))}
                </ul>
                <Button 
                  className="w-full mt-6" 
                  variant={plan.featured ? 'default' : 'outline'}
                  asChild
                  data-testid={`button-consult-${plan.key}`}
                >
                  <a href="https://api.whatsapp.com/send/?phone=19297174941" target="_blank" rel="noopener noreferrer">
                    {t('rmt.plans.cta')}
                  </a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="bg-background p-8 rounded-lg">
          <h3 className="text-2xl font-serif font-bold mb-4" data-testid="text-rmt-nature">
            {t('rmt.nature.title')}
          </h3>
          <p className="text-muted-foreground leading-relaxed">
            {t('rmt.nature.desc')}
          </p>
        </div>
      </div>
    </section>
  );
}
