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

        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-12">
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
              <h3 className="text-3xl font-serif font-semibold mb-2" data-testid="text-founder-name">
                {t('about.name')}
              </h3>
              <p className="text-xl text-muted-foreground mb-6" data-testid="text-founder-role">
                {t('about.role')}
              </p>
              <p className="text-lg leading-relaxed text-foreground" data-testid="text-founder-bio">
                {t('about.bio')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
