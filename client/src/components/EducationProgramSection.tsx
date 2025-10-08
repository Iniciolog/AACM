import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { GraduationCap, Users, Award, BookOpen } from 'lucide-react';

export default function EducationProgramSection() {
  const { language } = useLanguage();

  const content = {
    en: {
      title: 'Education Program',
      subtitle: 'Professional training in Initiology and energy healing',
      levels: [
        {
          title: 'Level 1',
          duration: '',
          description: '',
          topics: [
            'Access to educational materials and video lessons of the 1st level',
            'Access to Initiologists chat and online student support',
            'Basic energy exercises: diagnostics, reading, cleansing and activation of energy centers',
            'Initiation into the universal restorative channel Bonpo-Buddha: restores and increases the biofield, saturates with pure cosmic energy, replenishes resources',
            'Learning the session scheme for yourself and others',
            'Working with the Prajna channel (chakra channel)'
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
          title: 'Stufe 1',
          duration: '',
          description: '',
          topics: [
            'Zugang zu Lehrmaterialien und Videokursen der 1. Stufe',
            'Zugang zum Initiolog-Chat und Online-Support für Studenten',
            'Grundlegende Energieübungen: Diagnostik, Ablesen, Reinigung und Aktivierung der Energiezentren',
            'Einweihung in den universellen Wiederherstellungskanal Bonpo-Buddha: stellt das Biofeld wieder her und vergrößert es, sättigt mit reiner kosmischer Energie, ergänzt Ressourcen',
            'Erlernen des Sitzungsschemas für sich selbst und andere',
            'Arbeit mit dem Prajna-Kanal (Chakra-Kanal)'
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
          title: '1 ступень',
          duration: '',
          description: '',
          topics: [
            'Доступ к учебным материалам и видеоурокам 1-ой ступени',
            'Доступ к чату Инициологов и онлайн-поддержке учеников',
            'Базовые энергетические упражнения: диагностика, считывание, очищение и активация энергоцентров',
            'Инициация в универсальный восстановительный канал Бонпо-Будда: восстанавливает и увеличивает биополе, насыщает чистой энергией космоса, восполняет ресурсы',
            'Изучение схемы проведения сеанса для себя и для других',
            'Работа с каналом Пражна (чакровый канал)'
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
          <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4" data-testid="text-program-title">
            {data.title}
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            {data.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {data.levels.map((level, index) => (
            <Card key={index} className="hover-elevate transition-all duration-300" data-testid={`card-level-${index}`}>
              <CardHeader>
                <div className="flex items-start justify-between mb-2">
                  <CardTitle className="text-2xl">{level.title}</CardTitle>
                  <span className="text-sm text-muted-foreground bg-muted px-3 py-1 rounded-full">
                    {level.duration}
                  </span>
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
