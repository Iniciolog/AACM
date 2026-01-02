import { useLanguage } from '@/contexts/LanguageContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function AwardsPage() {
  const { language } = useLanguage();

  const pageTitle = language === 'ru' ? 'Премия "Инициолог года"' :
                    language === 'de' ? 'Auszeichnung "Initiologe des Jahres"' :
                    'Award "Initiologist of the Year"';

  const pageSubtitle = language === 'ru' ? 'Ежегодная церемония награждения лучших специалистов в области инициологии. Премия вручается с 2013 года.' :
                       language === 'de' ? 'Jährliche Verleihungszeremonie für die besten Spezialisten auf dem Gebiet der Initiologie. Die Auszeichnung wird seit 2013 verliehen.' :
                       'Annual award ceremony for the best specialists in the field of initiology. The award has been given since 2013.';

  const watchOnYoutube = language === 'ru' ? 'Смотреть на YouTube' :
                         language === 'de' ? 'Auf YouTube ansehen' :
                         'Watch on YouTube';

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4" data-testid="text-awards-title">
              {pageTitle}
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-6" data-testid="text-awards-subtitle">
              {pageSubtitle}
            </p>
            <a
              href="https://www.youtube.com/playlist?list=PLe5nsUESsMT7MCmh_1_b0wwlRhoes6vkg"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
              data-testid="link-youtube-playlist"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
              {watchOnYoutube}
            </a>
          </div>

          <div className="aspect-video max-w-5xl mx-auto rounded-xl overflow-hidden shadow-2xl bg-black">
            <iframe
              src="https://www.youtube.com/embed/videoseries?list=PLe5nsUESsMT7MCmh_1_b0wwlRhoes6vkg"
              title="Премия Инициолог года"
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              data-testid="iframe-playlist"
            />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
