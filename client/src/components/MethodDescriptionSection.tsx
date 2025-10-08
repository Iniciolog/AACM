import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Lightbulb, Zap, Shield, Globe } from 'lucide-react';

export default function MethodDescriptionSection() {
  const { language } = useLanguage();

  const content = {
    en: {
      title: 'The Initiology Method',
      subtitle: 'Scientific approach to energy healing and human potential development',
      intro: 'Initiology is an innovative method of working with the human energy-informational structure, based on connecting to cosmic energy channels. The method was founded in 1999 by Vyacheslav Lazarenko after years of research into hidden capabilities of the human psyche.',
      principles: [
        {
          icon: Lightbulb,
          title: 'Scientific Foundation',
          description: 'Based on research in quantum physics, neuroscience, and energy field studies. Verified by clinical trials and academic institutions.'
        },
        {
          icon: Zap,
          title: 'Energy Channels',
          description: 'Access to 58 professional cosmic energy channels for healing, protection, and personal development across all life areas.'
        },
        {
          icon: Shield,
          title: 'Safety & Ethics',
          description: 'Safe practice with built-in protection mechanisms. Ethical framework ensures positive application without harm.'
        },
        {
          icon: Globe,
          title: 'Global Recognition',
          description: 'Practiced in 40+ countries. Over 38,000 certified practitioners worldwide. Recognized by medical and academic communities.'
        }
      ],
      uniqueness: {
        title: 'What Makes Initiology Unique',
        points: [
          'No religious or mystical beliefs required - purely scientific approach',
          'Rapid results - many effects observable within minutes',
          'Universal application - works for physical, emotional, and social issues',
          'Self-sufficient - practitioners can heal themselves and others',
          'Continuous support - connection to channels remains for life',
          'Evidence-based - supported by clinical research and statistics'
        ]
      }
    },
    de: {
      title: 'Die Initiologie-Methode',
      subtitle: 'Wissenschaftlicher Ansatz zur Energieheilung und Entwicklung des menschlichen Potenzials',
      intro: 'Initiologie ist eine innovative Methode zur Arbeit mit der menschlichen Energie-Informationsstruktur, basierend auf der Verbindung zu kosmischen Energiekanälen. Die Methode wurde 1999 von Vyacheslav Lazarenko nach jahrelanger Forschung über verborgene Fähigkeiten der menschlichen Psyche gegründet.',
      principles: [
        {
          icon: Lightbulb,
          title: 'Wissenschaftliche Grundlage',
          description: 'Basiert auf Forschung in Quantenphysik, Neurowissenschaften und Energiefeldstudien. Verifiziert durch klinische Studien und akademische Institutionen.'
        },
        {
          icon: Zap,
          title: 'Energiekanäle',
          description: 'Zugang zu 58 professionellen kosmischen Energiekanälen für Heilung, Schutz und persönliche Entwicklung in allen Lebensbereichen.'
        },
        {
          icon: Shield,
          title: 'Sicherheit & Ethik',
          description: 'Sichere Praxis mit integrierten Schutzmechanismen. Ethischer Rahmen gewährleistet positive Anwendung ohne Schaden.'
        },
        {
          icon: Globe,
          title: 'Globale Anerkennung',
          description: 'Praktiziert in über 40 Ländern. Über 38.000 zertifizierte Praktiker weltweit. Anerkannt von medizinischen und akademischen Gemeinschaften.'
        }
      ],
      uniqueness: {
        title: 'Was macht Initiologie einzigartig',
        points: [
          'Keine religiösen oder mystischen Überzeugungen erforderlich - rein wissenschaftlicher Ansatz',
          'Schnelle Ergebnisse - viele Effekte innerhalb von Minuten beobachtbar',
          'Universelle Anwendung - funktioniert bei physischen, emotionalen und sozialen Problemen',
          'Selbstgenügsam - Praktiker können sich selbst und andere heilen',
          'Kontinuierliche Unterstützung - Verbindung zu Kanälen bleibt lebenslang bestehen',
          'Evidenzbasiert - unterstützt durch klinische Forschung und Statistiken'
        ]
      }
    },
    ru: {
      title: 'Метод Инициологии',
      subtitle: 'Научный подход к энергетическому целительству и развитию потенциала человека',
      intro: 'Инициология — это инновационный метод работы с энерго-информационной структурой человека, основанный на подключении к космическим энергетическим каналам. Метод основан в 1999 году Вячеславом Лазаренко после многолетних исследований скрытых возможностей человеческой психики.',
      principles: [
        {
          icon: Lightbulb,
          title: 'Научная основа',
          description: 'Основан на исследованиях квантовой физики, нейронаук и изучении энергополей. Подтвержден клиническими испытаниями и академическими учреждениями.'
        },
        {
          icon: Zap,
          title: 'Энергоканалы',
          description: 'Доступ к 58 профессиональным космическим энергоканалам для исцеления, защиты и личностного развития во всех сферах жизни.'
        },
        {
          icon: Shield,
          title: 'Безопасность и этика',
          description: 'Безопасная практика со встроенными механизмами защиты. Этическая основа обеспечивает позитивное применение без вреда.'
        },
        {
          icon: Globe,
          title: 'Мировое признание',
          description: 'Практикуется в 40+ странах. Более 38 000 сертифицированных практиков по всему миру. Признана медицинским и академическим сообществом.'
        }
      ],
      uniqueness: {
        title: 'Что делает инициологию уникальной',
        points: [
          'Не требует религиозных или мистических убеждений - чисто научный подход',
          'Быстрые результаты - многие эффекты наблюдаются в течение минут',
          'Универсальное применение - работает с физическими, эмоциональными и социальными проблемами',
          'Самодостаточность - практики могут исцелять себя и других',
          'Постоянная поддержка - связь с каналами сохраняется на всю жизнь',
          'Доказательная база - подтверждено клиническими исследованиями и статистикой'
        ]
      }
    }
  };

  const data = content[language] || content.en;

  return (
    <section id="method" className="py-20 md:py-32 bg-card">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4" data-testid="text-method-title">
            {data.title}
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
            {data.subtitle}
          </p>
          <p className="text-base text-muted-foreground max-w-4xl mx-auto">
            {data.intro}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {data.principles.map((principle, index) => {
            const Icon = principle.icon;
            return (
              <Card key={index} className="hover-elevate transition-all duration-300" data-testid={`card-principle-${index}`}>
                <CardHeader>
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{principle.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{principle.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <Card className="bg-background">
          <CardHeader>
            <CardTitle className="text-2xl text-center" data-testid="text-uniqueness-title">
              {data.uniqueness.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {data.uniqueness.points.map((point, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                  <p className="text-muted-foreground">{point}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
