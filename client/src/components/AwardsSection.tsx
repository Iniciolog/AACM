import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Trophy, Star, Award as AwardIcon } from 'lucide-react';

export default function AwardsSection() {
  const { language } = useLanguage();

  const content = {
    en: {
      title: 'Awards & Recognition',
      subtitle: 'Celebrating excellence in Initiology practice and research',
      mainAward: {
        title: 'Initiologist of the Year',
        description: 'Annual award recognizing outstanding contributions to the field of Initiology',
        since: 'Since 2013',
        founder: 'Founded by V.P. Lazarenko'
      },
      awards2023: {
        title: '2023 Award Winners',
        subtitle: 'Recognizing exceptional practitioners and researchers',
        winners: [
          {
            category: 'Master of the Year',
            name: 'Outstanding achievement in healing practice',
            icon: Trophy
          },
          {
            category: 'Research Excellence',
            name: 'Breakthrough scientific contribution',
            icon: Star
          },
          {
            category: 'Teaching Excellence',
            name: 'Excellence in education and mentorship',
            icon: AwardIcon
          },
          {
            category: 'Innovation Award',
            name: 'New methods and techniques development',
            icon: Trophy
          },
          {
            category: 'Humanitarian Service',
            name: 'Outstanding charitable healing work',
            icon: Star
          },
          {
            category: 'International Recognition',
            name: 'Global promotion of Initiology',
            icon: AwardIcon
          }
        ]
      },
      stats: {
        title: 'Recognition Milestones',
        items: [
          { number: '11', label: 'Years of Awards' },
          { number: '120+', label: 'Award Recipients' },
          { number: '40+', label: 'Countries Represented' },
          { number: '1000+', label: 'Nominations Received' }
        ]
      }
    },
    de: {
      title: 'Auszeichnungen & Anerkennung',
      subtitle: 'Würdigung von Exzellenz in Initiologie-Praxis und Forschung',
      mainAward: {
        title: 'Initiologie des Jahres',
        description: 'Jährliche Auszeichnung für herausragende Beiträge zum Bereich der Initiologie',
        since: 'Seit 2013',
        founder: 'Gegründet von V.P. Lazarenko'
      },
      awards2023: {
        title: 'Preisträger 2023',
        subtitle: 'Anerkennung außergewöhnlicher Praktiker und Forscher',
        winners: [
          {
            category: 'Meister des Jahres',
            name: 'Herausragende Leistung in der Heilpraxis',
            icon: Trophy
          },
          {
            category: 'Forschungsexzellenz',
            name: 'Bahnbrechender wissenschaftlicher Beitrag',
            icon: Star
          },
          {
            category: 'Lehrexzellenz',
            name: 'Exzellenz in Bildung und Mentoring',
            icon: AwardIcon
          },
          {
            category: 'Innovationspreis',
            name: 'Entwicklung neuer Methoden und Techniken',
            icon: Trophy
          },
          {
            category: 'Humanitärer Dienst',
            name: 'Herausragende karitative Heilarbeit',
            icon: Star
          },
          {
            category: 'Internationale Anerkennung',
            name: 'Globale Förderung der Initiologie',
            icon: AwardIcon
          }
        ]
      },
      stats: {
        title: 'Anerkennungsmeilensteine',
        items: [
          { number: '11', label: 'Jahre Auszeichnungen' },
          { number: '120+', label: 'Preisträger' },
          { number: '40+', label: 'Vertretene Länder' },
          { number: '1000+', label: 'Erhaltene Nominierungen' }
        ]
      }
    },
    ru: {
      title: 'Премии и награды',
      subtitle: 'Отмечая выдающиеся достижения в практике и исследованиях инициологии',
      mainAward: {
        title: 'Инициолог года',
        description: 'Ежегодная премия за выдающийся вклад в область инициологии',
        since: 'С 2013 года',
        founder: 'Основана В.П. Лазаренко'
      },
      awards2023: {
        title: 'Лауреаты премии 2023',
        subtitle: 'Признание выдающихся практиков и исследователей',
        winners: [
          {
            category: 'Мастер года',
            name: 'Выдающиеся достижения в практике целительства',
            icon: Trophy
          },
          {
            category: 'Научное превосходство',
            name: 'Прорывной научный вклад',
            icon: Star
          },
          {
            category: 'Преподавательское мастерство',
            name: 'Выдающиеся успехи в обучении и наставничестве',
            icon: AwardIcon
          },
          {
            category: 'Премия за инновации',
            name: 'Разработка новых методов и техник',
            icon: Trophy
          },
          {
            category: 'Гуманитарная служба',
            name: 'Выдающаяся благотворительная целительская работа',
            icon: Star
          },
          {
            category: 'Международное признание',
            name: 'Глобальное продвижение инициологии',
            icon: AwardIcon
          }
        ]
      },
      stats: {
        title: 'Вехи признания',
        items: [
          { number: '11', label: 'Лет премии' },
          { number: '120+', label: 'Лауреатов' },
          { number: '40+', label: 'Стран представлено' },
          { number: '1000+', label: 'Номинаций получено' }
        ]
      }
    }
  };

  const data = content[language] || content.en;

  return (
    <section id="awards" className="py-20 md:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4" data-testid="text-awards-title">
            {data.title}
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            {data.subtitle}
          </p>
        </div>

        <Card className="mb-12 bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
          <CardHeader className="text-center pb-4">
            <div className="mx-auto w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mb-4">
              <Trophy className="w-8 h-8 text-primary" />
            </div>
            <CardTitle className="text-3xl font-serif" data-testid="text-main-award-title">
              {data.mainAward.title}
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-lg mb-2">{data.mainAward.description}</p>
            <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground mt-4">
              <span>{data.mainAward.since}</span>
              <span>•</span>
              <span>{data.mainAward.founder}</span>
            </div>
          </CardContent>
        </Card>

        <div className="mb-16">
          <h3 className="text-2xl font-bold text-center mb-8" data-testid="text-winners-title">
            {data.awards2023.title}
          </h3>
          <p className="text-center text-muted-foreground mb-8">{data.awards2023.subtitle}</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.awards2023.winners.map((winner, index) => {
              const Icon = winner.icon;
              return (
                <Card key={index} className="hover-elevate transition-all duration-300" data-testid={`card-winner-${index}`}>
                  <CardHeader>
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <CardTitle className="text-lg">{winner.category}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{winner.name}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        <div>
          <h3 className="text-2xl font-bold text-center mb-8" data-testid="text-stats-title">
            {data.stats.title}
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {data.stats.items.map((stat, index) => (
              <Card key={index} className="text-center" data-testid={`card-stat-${index}`}>
                <CardHeader>
                  <div className="text-4xl font-bold text-primary mb-2">{stat.number}</div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
