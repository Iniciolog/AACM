import { useLanguage } from '@/contexts/LanguageContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const awardVideos = [
  {
    id: 'yALi_Z90U1g',
    title: 'Премия "Инициолог года" 2024',
  },
  {
    id: 'gIzUmHsOuVg',
    title: 'Премия "Инициолог года" 2023',
  },
  {
    id: 'e5hqRhHftJ8',
    title: 'Премия "Инициолог года" 2022',
  },
  {
    id: '5u1Z6YpBhVk',
    title: 'Премия "Инициолог года" 2021',
  },
];

export default function AwardsPage() {
  const { language } = useLanguage();

  const pageTitle = language === 'ru' ? 'Премия "Инициолог года"' :
                    language === 'de' ? 'Auszeichnung "Initiologe des Jahres"' :
                    'Award "Initiologist of the Year"';

  const pageSubtitle = language === 'ru' ? 'Ежегодная церемония награждения лучших специалистов в области инициологии. Премия вручается с 2013 года.' :
                       language === 'de' ? 'Jährliche Verleihungszeremonie für die besten Spezialisten auf dem Gebiet der Initiologie. Die Auszeichnung wird seit 2013 verliehen.' :
                       'Annual award ceremony for the best specialists in the field of initiology. The award has been given since 2013.';

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
            </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {awardVideos.map((video, index) => (
              <a
                key={video.id}
                href={`https://www.youtube.com/watch?v=${video.id}&list=PLe5nsUESsMT7MCmh_1_b0wwlRhoes6vkg`}
                target="_blank"
                rel="noopener noreferrer"
                className="group block bg-card rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                data-testid={`link-video-${index}`}
              >
                <div className="relative aspect-video bg-muted">
                  <img
                    src={`https://img.youtube.com/vi/${video.id}/hqdefault.jpg`}
                    alt={video.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center">
                      <svg className="w-8 h-8 text-white ml-1" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-medium text-foreground group-hover:text-primary transition-colors line-clamp-2">
                    {video.title}
                  </h3>
                </div>
              </a>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
