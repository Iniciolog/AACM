import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Shield, Sparkles, Target, Wine, CigaretteOff, Apple } from 'lucide-react';

export default function ServicesSection() {
  const { t } = useLanguage();

  const services = [
    { 
      icon: Sparkles, 
      key: 'cleaning',
      color: 'text-blue-500'
    },
    { 
      icon: Shield, 
      key: 'protection',
      color: 'text-purple-500'
    },
    { 
      icon: Target, 
      key: 'targeted',
      color: 'text-green-500'
    }
  ];

  const habits = [
    {
      Icon: Wine,
      key: 'alcohol',
      color: 'text-red-500'
    },
    {
      Icon: CigaretteOff,
      key: 'smoking',
      color: 'text-orange-500'
    },
    {
      Icon: Apple,
      key: 'eating',
      color: 'text-green-500'
    }
  ];

  return (
    <section id="services" className="py-20 md:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4" data-testid="text-services-title">
            {t('services.title')}
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            {t('services.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {services.map((service) => (
            <Card 
              key={service.key}
              className="hover-elevate transition-all duration-300"
              data-testid={`card-service-${service.key}`}
            >
              <CardHeader>
                <div className={`h-12 w-12 rounded-md bg-primary/10 flex items-center justify-center mb-4 ${service.color}`}>
                  <service.icon className="h-6 w-6" />
                </div>
                <CardTitle className="text-xl">
                  {t(`services.${service.key}.title`)}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm">
                  {t(`services.${service.key}.desc`)}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="bg-card p-8 rounded-lg">
          <h3 className="text-2xl font-serif font-bold mb-8 text-center" data-testid="text-habits-title">
            {t('services.habits.title')}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {habits.map((habit) => (
              <div 
                key={habit.key}
                className="flex flex-col items-center text-center p-6 rounded-lg bg-background"
                data-testid={`card-habit-${habit.key}`}
              >
                <div className={`h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 ${habit.color}`}>
                  <habit.Icon className="h-8 w-8" />
                </div>
                <h4 className="text-lg font-semibold mb-2">
                  {t(`services.habits.${habit.key}.title`)}
                </h4>
                <p className="text-sm text-muted-foreground mb-4">
                  {t(`services.habits.${habit.key}.desc`)}
                </p>
                <p className="text-xs text-muted-foreground">
                  {t('services.habits.from1session')}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-12">
          <div className="max-w-3xl mx-auto mb-8 p-6 bg-card rounded-lg">
            <h3 className="text-xl font-semibold mb-4">{t('services.booking.title')}</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p className="font-medium text-foreground">{t('services.booking.pricing')}</p>
              <p>{t('services.booking.standard')}</p>
              <p>{t('services.booking.targeted')}</p>
              <p>{t('services.booking.consultation')}</p>
            </div>
          </div>
          <Button size="lg" asChild data-testid="button-book-session">
            <a href="https://api.whatsapp.com/send/?phone=79258298223" target="_blank" rel="noopener noreferrer">
              {t('services.cta')}
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
