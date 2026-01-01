import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Shield, Zap, Target, Infinity, Users, Heart } from 'lucide-react';

export default function AboutSystemSection() {
  const { t } = useLanguage();

  const advantages = [
    {
      icon: Shield,
      titleKey: 'system.advantage1.title',
      descKey: 'system.advantage1.desc',
    },
    {
      icon: Zap,
      titleKey: 'system.advantage2.title',
      descKey: 'system.advantage2.desc',
    },
    {
      icon: Target,
      titleKey: 'system.advantage3.title',
      descKey: 'system.advantage3.desc',
    },
    {
      icon: Infinity,
      titleKey: 'system.advantage4.title',
      descKey: 'system.advantage4.desc',
    },
    {
      icon: Users,
      titleKey: 'system.advantage5.title',
      descKey: 'system.advantage5.desc',
    },
    {
      icon: Heart,
      titleKey: 'system.advantage6.title',
      descKey: 'system.advantage6.desc',
    },
  ];

  return (
    <section id="about-system" className="py-24 bg-background" data-testid="section-about-system">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl mb-4 text-foreground" data-testid="text-system-title">
            {t('system.title')}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-6" data-testid="text-system-subtitle">
            {t('system.subtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="space-y-6">
            <p className="text-lg text-foreground/80 leading-relaxed" data-testid="text-system-desc1">
              {t('system.desc1')}
            </p>
            <p className="text-lg text-foreground/80 leading-relaxed" data-testid="text-system-desc2">
              {t('system.desc2')}
            </p>
            <p className="text-lg text-foreground/80 leading-relaxed" data-testid="text-system-desc3">
              {t('system.desc3')}
            </p>
          </div>
          <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl p-8 flex items-center justify-center">
            <div className="text-center">
              <div className="w-32 h-32 mx-auto mb-6 bg-primary/20 rounded-full flex items-center justify-center">
                <Zap className="w-16 h-16 text-primary" />
              </div>
              <h3 className="text-2xl font-serif font-semibold text-foreground mb-2" data-testid="text-system-energy-title">
                {t('system.energy.title')}
              </h3>
              <p className="text-muted-foreground" data-testid="text-system-energy-desc">
                {t('system.energy.desc')}
              </p>
            </div>
          </div>
        </div>

        <h3 className="text-3xl font-serif font-semibold text-center mb-12 text-foreground" data-testid="text-system-advantages-title">
          {t('system.advantages.title')}
        </h3>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {advantages.map((advantage, index) => (
            <Card key={index} className="hover-elevate">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/10 rounded-lg shrink-0">
                    <advantage.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2" data-testid={`text-system-advantage-${index}-title`}>
                      {t(advantage.titleKey)}
                    </h4>
                    <p className="text-sm text-muted-foreground" data-testid={`text-system-advantage-${index}-desc`}>
                      {t(advantage.descKey)}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button size="lg" onClick={() => document.getElementById('education-program')?.scrollIntoView({ behavior: 'smooth' })} data-testid="button-system-learn">
            {t('system.cta')}
          </Button>
        </div>
      </div>
    </section>
  );
}
