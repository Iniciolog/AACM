import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar, Users, Shield, Heart, Sparkles } from 'lucide-react';

export default function OpenSessionsSection() {
  const { t } = useLanguage();

  const benefits = [
    {
      icon: Sparkles,
      titleKey: 'sessions.benefit1.title',
      descKey: 'sessions.benefit1.desc',
    },
    {
      icon: Shield,
      titleKey: 'sessions.benefit2.title',
      descKey: 'sessions.benefit2.desc',
    },
    {
      icon: Heart,
      titleKey: 'sessions.benefit3.title',
      descKey: 'sessions.benefit3.desc',
    },
  ];

  return (
    <section id="sessions" className="py-24 bg-muted/30" data-testid="section-sessions">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-serif text-fluid-xl mb-4 text-foreground" data-testid="text-sessions-title">
            {t('sessions.title')}
          </h2>
          <p className="text-base sm:text-xl text-muted-foreground max-w-3xl mx-auto" data-testid="text-sessions-subtitle">
            {t('sessions.subtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
            <CardContent className="p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-primary/20 rounded-full">
                  <Calendar className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <h3 className="text-2xl font-serif font-semibold text-foreground" data-testid="text-sessions-schedule-title">
                    {t('sessions.schedule.title')}
                  </h3>
                  <p className="text-muted-foreground" data-testid="text-sessions-schedule-time">
                    {t('sessions.schedule.time')}
                  </p>
                </div>
              </div>
              <p className="text-foreground/80 mb-6" data-testid="text-sessions-schedule-desc">
                {t('sessions.schedule.desc')}
              </p>
              <Button size="lg" className="w-full" asChild data-testid="button-sessions-join">
                <a href="https://iniciolog.com/sessions" target="_blank" rel="noopener noreferrer">
                  <Users className="w-5 h-5 mr-2" />
                  {t('sessions.cta')}
                </a>
              </Button>
            </CardContent>
          </Card>

          <div className="space-y-4">
            {benefits.map((benefit, index) => (
              <Card key={index} className="hover-elevate">
                <CardContent className="p-6 flex items-start gap-4">
                  <div className="p-2 bg-primary/10 rounded-lg shrink-0">
                    <benefit.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1" data-testid={`text-sessions-benefit-${index}-title`}>
                      {t(benefit.titleKey)}
                    </h4>
                    <p className="text-sm text-muted-foreground" data-testid={`text-sessions-benefit-${index}-desc`}>
                      {t(benefit.descKey)}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <Card className="bg-card border">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-serif font-semibold mb-4 text-foreground" data-testid="text-sessions-leader-title">
              {t('sessions.leader.title')}
            </h3>
            <p className="text-foreground/80 max-w-2xl mx-auto" data-testid="text-sessions-leader-desc">
              {t('sessions.leader.desc')}
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
