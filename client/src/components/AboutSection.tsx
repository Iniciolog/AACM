import { useLanguage } from '@/contexts/LanguageContext';

export default function AboutSection() {
  const { t } = useLanguage();

  return (
    <section id="about" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4" data-testid="text-about-title">
            {t('about.title')}
          </h2>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row gap-12 mb-12">
            <div className="md:w-1/3">
              <div className="relative">
                <img 
                  src="https://static.tildacdn.com/tild3662-6238-4132-b034-633134363066/222.png" 
                  alt={t('about.name')}
                  className="rounded-lg shadow-xl w-full"
                  data-testid="img-founder"
                />
              </div>
            </div>
            
            <div className="md:w-2/3">
              <h3 className="text-3xl font-serif font-bold mb-2" data-testid="text-founder-name">
                {t('about.fullname')}
              </h3>
              <p className="text-xl text-muted-foreground mb-6" data-testid="text-founder-role">
                {t('about.role')}
              </p>
              <p className="text-lg leading-relaxed text-foreground mb-4" data-testid="text-founder-bio1">
                {t('about.bio1')}
              </p>
              <p className="text-lg leading-relaxed text-foreground" data-testid="text-founder-bio2">
                {t('about.bio2')}
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h4 className="text-xl font-bold mb-4" data-testid="text-scientific-title">{t('about.scientific')}</h4>
              <ul className="space-y-3 text-muted-foreground">
                <li data-testid="text-scientific-1">{t('about.scientific1')}</li>
                <li data-testid="text-scientific-2">{t('about.scientific2')}</li>
                <li data-testid="text-scientific-3">{t('about.scientific3')}</li>
              </ul>
            </div>

            <div>
              <h4 className="text-xl font-bold mb-4" data-testid="text-public-title">{t('about.public')}</h4>
              <ul className="space-y-3 text-muted-foreground">
                <li data-testid="text-public-1">{t('about.public1')}</li>
                <li data-testid="text-public-2">{t('about.public2')}</li>
                <li data-testid="text-public-3">{t('about.public3')}</li>
                <li data-testid="text-public-4">{t('about.public4')}</li>
              </ul>
            </div>

            <div>
              <h4 className="text-xl font-bold mb-4" data-testid="text-professional-title">{t('about.professional')}</h4>
              <ul className="space-y-3 text-muted-foreground">
                <li data-testid="text-professional-1">{t('about.professional1')}</li>
                <li data-testid="text-professional-2">{t('about.professional2')}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
