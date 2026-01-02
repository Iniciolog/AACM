import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { GraduationCap, Users, Award, BookOpen } from 'lucide-react';

export default function EducationProgramSection() {
  const { language } = useLanguage();

  const content = {
    en: {
      title: 'Education Program',
      subtitle: 'Professional training in Initiology and energy healing',
      levels: [
        {
          title: 'Levels 1-2 (Basic)',
          duration: '',
          price: '$300',
          description: 'Level 1: Theoretical foundation, sensorics, information reading, biolocation, social energetics, auxiliary methods',
          topics: [
            'Structure of human energy system (chakras, meridians, subtle bodies)',
            'Sensorics: activation of hand energy channels, sensing bioenergy, managing energy flows',
            'Information reading: biofield examination, phantom diagnostics, forecasting, situation viewing, intuition development',
            'Biolocation: working with frames, determining biofield and energy center states, "question-answer", search',
            'Social energetics: destiny management methods',
            'Auxiliary methods: energy center cleansing, protection restoration, biofield expansion',
            'Initiations into universal channels: Bonpo-Buddha (healing), Prajna (chakra), protective channel'
          ]
        },
        {
          title: 'Level 3 (Professional)',
          duration: '',
          price: '$2,500',
          description: '40 targeted multifunctional channels',
          topics: [
            'Restorative channels',
            'Cleansing channels',
            'Informational channels',
            'Social channels',
            'Impact channels'
          ]
        },
        {
          title: 'Level 4 (Master)',
          duration: '',
          price: '$2,500',
          description: 'Master level of Initiology',
          topics: [
            'Master initiation',
            'Work with cosmic Hierarchies',
            'Ability to initiate others'
          ]
        }
      ],
      features: [
        { icon: GraduationCap, title: 'Certification', text: 'International certificate upon completion' },
        { icon: Users, title: 'Mentorship', text: 'Personal guidance from experienced masters' },
        { icon: Award, title: 'Practice', text: 'Real client work under supervision' },
        { icon: BookOpen, title: 'Materials', text: 'Comprehensive study materials and resources' }
      ]
    },
    de: {
      title: 'Ausbildungsprogramm',
      subtitle: 'Professionelle Ausbildung in Initiologie und Energieheilung',
      levels: [
        {
          title: 'Stufen 1-2 (Grundstufe)',
          duration: '',
          price: '$300',
          description: 'Stufe 1: Theoretische Grundlagen, Sensorik, Informationsablesung, Biolokation, soziale Energetik, Hilfsmethoden',
          topics: [
            'Struktur des menschlichen Energiesystems (Chakren, Meridiane, subtile Körper)',
            'Sensorik: Aktivierung der Hand-Energiekanäle, Bioenergie-Wahrnehmung, Energiefluss-Steuerung',
            'Informationsablesung: Biofeld-Untersuchung, Phantom-Diagnostik, Prognose, Situations-Betrachtung, Intuitionsentwicklung',
            'Biolokation: Arbeit mit Rahmen, Bestimmung von Biofeld- und Energiezentren-Zuständen, "Frage-Antwort", Suche',
            'Soziale Energetik: Methoden der Schicksalslenkung',
            'Hilfsmethoden: Energiezentren-Reinigung, Schutz-Wiederherstellung, Biofeld-Erweiterung',
            'Einweihungen in universelle Kanäle: Bonpo-Buddha (heilend), Prajna (Chakra), Schutzkanal'
          ]
        },
        {
          title: 'Stufe 3 (Professionell)',
          duration: '',
          price: '$2.500',
          description: '40 gezielte multifunktionale Kanäle',
          topics: [
            'Wiederherstellende Kanäle',
            'Reinigende Kanäle',
            'Informationskanäle',
            'Soziale Kanäle',
            'Aufprall-Kanäle'
          ]
        },
        {
          title: 'Stufe 4 (Meister)',
          duration: '',
          price: '$2.500',
          description: 'Meisterstufe der Initiologie',
          topics: [
            'Meister-Einweihung',
            'Arbeit mit kosmischen Hierarchien',
            'Fähigkeit, andere einzuweihen'
          ]
        }
      ],
      features: [
        { icon: GraduationCap, title: 'Zertifizierung', text: 'Internationales Zertifikat nach Abschluss' },
        { icon: Users, title: 'Mentoring', text: 'Persönliche Betreuung durch erfahrene Meister' },
        { icon: Award, title: 'Praxis', text: 'Echte Klientenarbeit unter Aufsicht' },
        { icon: BookOpen, title: 'Materialien', text: 'Umfassende Studienmaterialien und Ressourcen' }
      ]
    },
    ru: {
      title: 'Программа обучения',
      subtitle: 'Профессиональное обучение инициологии и энергетическому целительству',
      levels: [
        {
          title: '1-2 ступени (Базовый уровень)',
          duration: '',
          price: '$300',
          description: '1 ступень: Теоретическая база, сенсорика, считывание информации, биолокация, социальная энергетика, вспомогательные методы',
          topics: [
            'Строение энергетической системы человека (чакры, меридианы, тонкие тела)',
            'Сенсорика: активация энергетических каналов рук, ощущение биоэнергии, управление энергетическими потоками',
            'Считывание информации: осмотр биополя, диагностика по фантому, прогнозирование, просмотр ситуаций, развитие интуиции',
            'Биолокация: работа с рамками, определение состояния биополя и энергоцентров, "вопрос-ответ", поиск',
            'Социальная энергетика: методы управления судьбой',
            'Вспомогательные методы: очищение энергоцентров, восстановление защиты, увеличение биополя',
            'Инициации в универсальные каналы: Бонпо-Будда (оздоровительный), Пражна (чакровый), защитный канал'
          ]
        },
        {
          title: '3 ступень (Профессиональный)',
          duration: '',
          price: '$2 500',
          description: '40 целевых многофункциональных каналов',
          topics: [
            'Восстановительные каналы',
            'Очистительные каналы',
            'Информационные каналы',
            'Социальные каналы',
            'Ударные каналы'
          ]
        },
        {
          title: '4 ступень (Мастер)',
          duration: '',
          price: '$2 500',
          description: 'Мастерский уровень Инициологии',
          topics: [
            'Мастерская инициация',
            'Работа с космическими Иерархиями',
            'Возможность инициировать других'
          ]
        }
      ],
      features: [
        { icon: GraduationCap, title: 'Сертификация', text: 'Международный сертификат по окончании' },
        { icon: Users, title: 'Наставничество', text: 'Личное руководство опытных мастеров' },
        { icon: Award, title: 'Практика', text: 'Реальная работа с клиентами под наблюдением' },
        { icon: BookOpen, title: 'Материалы', text: 'Полные учебные материалы и ресурсы' }
      ]
    }
  };

  const data = content[language] || content.en;

  return (
    <section id="education-program" className="py-20 md:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-serif text-fluid-xl font-bold mb-4" data-testid="text-program-title">
            {data.title}
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-12">
            {data.subtitle}
          </p>
          
          <div className="flex justify-center mb-12">
            <div 
              className="w-80 h-80 rounded-full overflow-hidden border-4 border-primary/20 shadow-xl"
              data-testid="img-students"
            >
              <img 
                src="https://static.tildacdn.com/tild6164-6339-4762-b930-363935356538/333.jpeg"
                alt="Academy Students"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {data.levels.map((level, index) => (
            <Card key={index} className="hover-elevate transition-all duration-300" data-testid={`card-level-${index}`}>
              <CardHeader>
                <div className="flex items-start justify-between mb-2">
                  <CardTitle className="text-2xl">{level.title}</CardTitle>
                  {level.price && (
                    <span className="text-xl font-semibold text-primary" data-testid={`price-level-${index}`}>
                      {level.price}
                    </span>
                  )}
                </div>
                <p className="text-muted-foreground">{level.description}</p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {level.topics.map((topic, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                      {topic}
                    </li>
                  ))}
                </ul>
                {index === 0 && (
                  <Button 
                    className="w-full mt-6" 
                    asChild
                    data-testid="button-pay-level-1-2"
                  >
                    <a href="https://payform.ru/ji9s78x/" target="_blank" rel="noopener noreferrer">
                      {language === 'ru' ? 'Оплатить' : language === 'de' ? 'Bezahlen' : 'Pay'}
                    </a>
                  </Button>
                )}
                {index === 1 && (
                  <Button 
                    className="w-full mt-6" 
                    asChild
                    data-testid="button-pay-level-3"
                  >
                    <a href="https://payform.ru/m89s7q6/" target="_blank" rel="noopener noreferrer">
                      {language === 'ru' ? 'Оплатить' : language === 'de' ? 'Bezahlen' : 'Pay'}
                    </a>
                  </Button>
                )}
                {index === 2 && (
                  <Button 
                    className="w-full mt-6" 
                    asChild
                    data-testid="button-pay-level-4"
                  >
                    <a href="https://payform.ru/479s7vu/" target="_blank" rel="noopener noreferrer">
                      {language === 'ru' ? 'Оплатить' : language === 'de' ? 'Bezahlen' : 'Pay'}
                    </a>
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {data.features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} className="text-center" data-testid={`card-feature-${index}`}>
                <CardHeader>
                  <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{feature.text}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
