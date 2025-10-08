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
          title: 'Level 1: Basics',
          duration: '3 months',
          description: 'Introduction to Initiology, basic channels, energy diagnostics, healing fundamentals',
          topics: ['Energy system basics', 'Restorative channels', 'Self-healing techniques', 'Ethics and safety']
        },
        {
          title: 'Level 2: Professional',
          duration: '6 months',
          description: 'Advanced channels, cleansing techniques, working with clients, business foundations',
          topics: ['Cleansing channels', 'Client diagnostics', 'Professional practice', 'Business development']
        },
        {
          title: 'Level 3: Master',
          duration: '9 months',
          description: 'Impact channels, social channels, complex cases, teaching methodology',
          topics: ['Impact channels', 'Social channels', 'Complex diagnostics', 'Teaching skills']
        },
        {
          title: 'Level 4: Higher Initiology',
          duration: '12 months',
          description: 'Higher channels, cosmic consciousness, supernatural abilities, mastery',
          topics: ['Higher channels', 'Cosmic travel', 'Advanced protection', 'Master certification']
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
          title: 'Stufe 1: Grundlagen',
          duration: '3 Monate',
          description: 'Einführung in Initiologie, Basiskanäle, Energiediagnostik, Heilungsgrundlagen',
          topics: ['Grundlagen des Energiesystems', 'Wiederherstellende Kanäle', 'Selbstheilungstechniken', 'Ethik und Sicherheit']
        },
        {
          title: 'Stufe 2: Professionell',
          duration: '6 Monate',
          description: 'Fortgeschrittene Kanäle, Reinigungstechniken, Arbeit mit Klienten, Geschäftsgrundlagen',
          topics: ['Reinigende Kanäle', 'Klientendiagnostik', 'Professionelle Praxis', 'Geschäftsentwicklung']
        },
        {
          title: 'Stufe 3: Meister',
          duration: '9 Monate',
          description: 'Impact-Kanäle, soziale Kanäle, komplexe Fälle, Lehrmethodik',
          topics: ['Impact-Kanäle', 'Soziale Kanäle', 'Komplexe Diagnostik', 'Lehrfähigkeiten']
        },
        {
          title: 'Stufe 4: Höhere Initiologie',
          duration: '12 Monate',
          description: 'Höhere Kanäle, kosmisches Bewusstsein, übernatürliche Fähigkeiten, Meisterschaft',
          topics: ['Höhere Kanäle', 'Kosmische Reisen', 'Fortgeschrittener Schutz', 'Meisterzertifizierung']
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
          title: 'Уровень 1: Основы',
          duration: '3 месяца',
          description: 'Введение в инициологию, базовые каналы, энергодиагностика, основы целительства',
          topics: ['Основы энергосистемы', 'Восстановительные каналы', 'Техники самоисцеления', 'Этика и безопасность']
        },
        {
          title: 'Уровень 2: Профессионал',
          duration: '6 месяцев',
          description: 'Продвинутые каналы, техники очищения, работа с клиентами, основы бизнеса',
          topics: ['Очистительные каналы', 'Диагностика клиентов', 'Профессиональная практика', 'Развитие бизнеса']
        },
        {
          title: 'Уровень 3: Мастер',
          duration: '9 месяцев',
          description: 'Ударные каналы, социальные каналы, сложные случаи, методика преподавания',
          topics: ['Ударные каналы', 'Социальные каналы', 'Сложная диагностика', 'Навыки преподавания']
        },
        {
          title: 'Уровень 4: Высшая инициология',
          duration: '12 месяцев',
          description: 'Высшие каналы, космическое сознание, сверхспособности, мастерство',
          topics: ['Высшие каналы', 'Космические путешествия', 'Продвинутая защита', 'Сертификация мастера']
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
