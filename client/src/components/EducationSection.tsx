import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { GraduationCap, Users, Award } from 'lucide-react';
import educationImg from '@assets/generated_images/Educational_platform_interface_preview_d3d50108.png';

export default function EducationSection() {
  const { t } = useLanguage();

  const features = [
    { icon: GraduationCap, text: t('education.feature1') },
    { icon: Users, text: t('education.feature2') },
    { icon: Award, text: t('education.feature3') },
  ];

  return (
    <section id="education" className="py-20 md:py-32 bg-card">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6" data-testid="text-education-title">
              {t('education.title')}
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              {t('education.subtitle')}
            </p>

            <div className="space-y-4 mb-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 p-4 rounded-md hover-elevate"
                  data-testid={`feature-education-${index}`}
                >
                  <div className="flex-shrink-0">
                    <div className="h-12 w-12 rounded-md bg-primary/10 flex items-center justify-center">
                      <feature.icon className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                  <p className="font-medium">{feature.text}</p>
                </div>
              ))}
            </div>

            <Button size="lg" data-testid="button-education-cta">
              {t('education.cta')}
            </Button>
          </div>

          <div className="relative">
            <div className="relative rounded-lg overflow-hidden shadow-xl">
              <img
                src={educationImg}
                alt="Educational Platform"
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
