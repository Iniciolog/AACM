import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent } from '@/components/ui/card';

export default function AwardsSection() {
  const { language } = useLanguage();

  const content = {
    en: {
      title: 'LAUREATES OF THE "INITIOLOGIST OF THE YEAR" AWARD',
      laureates: [
        {
          name: 'ANGELINA SHARAPOVA',
          nomination: 'Laureate of the Award in the category: "Initiologist of the Year-2023".',
          achievement: 'Restored 100% vision to her son with a diagnosed congenital defect, using RMT technologies of Initiology.',
          photo: 'https://static.tildacdn.com/tild3864-3436-4736-b731-356565393139/R2A6053-2_problemboc.jpg'
        },
        {
          name: 'Natalia Streltsova',
          nomination: 'Laureate of the Award in the category: "For High Achievements in Initiology".',
          achievement: 'Restored lost functions and achieved cancellation of thyroid removal surgery, using master technologies of Initiology.',
          photo: ''
        },
        {
          name: 'ANDREY SOMOV',
          nomination: 'Laureate of the Award in the category: "For Best Result in Social Initiology".',
          achievement: 'Creation and phenomenal organic growth of a company from zero to 170,000,000 rubles in 6 months, using RMT technologies of Initiology.',
          photo: ''
        }
      ]
    },
    de: {
      title: 'PREISTRÄGER DES "INITIOLOGIE DES JAHRES"-PREISES',
      laureates: [
        {
          name: 'ANGELINA SHARAPOVA',
          nomination: 'Preisträgerin in der Kategorie: "Initiologie des Jahres-2023".',
          achievement: 'Stellte 100% Sehkraft ihres Sohnes bei diagnostiziertem angeborenem Defekt wieder her, unter Verwendung von RMT-Technologien der Initiologie.',
          photo: 'https://static.tildacdn.com/tild3864-3436-4736-b731-356565393139/R2A6053-2_problemboc.jpg'
        },
        {
          name: 'Natalia Streltsova',
          nomination: 'Preisträgerin in der Kategorie: "Für hohe Leistungen in der Initiologie".',
          achievement: 'Stellte verlorene Funktionen wieder her und erreichte die Absage einer Schilddrüsenentfernungsoperation, unter Verwendung von Meistertechnologien der Initiologie.',
          photo: ''
        },
        {
          name: 'ANDREY SOMOV',
          nomination: 'Preisträger in der Kategorie: "Für das beste Ergebnis in der sozialen Initiologie".',
          achievement: 'Gründung und phänomenales organisches Wachstum eines Unternehmens von null auf 170.000.000 Rubel in 6 Monaten, unter Verwendung von RMT-Technologien der Initiologie.',
          photo: ''
        }
      ]
    },
    ru: {
      title: 'ЛАУРЕАТЫ ПРЕМИИ "ИНИЦИОЛОГ ГОДА"',
      laureates: [
        {
          name: 'АНГЕЛИНА ШАРАПОВА',
          nomination: 'Лауреат Премии в номинации: "Инициолог года-2023".',
          achievement: 'восстановила 100% зрение сыну, при диагностированном врожденном пороке, с использованием РМТ технологий Инициологии.',
          photo: 'https://static.tildacdn.com/tild3864-3436-4736-b731-356565393139/R2A6053-2_problemboc.jpg'
        },
        {
          name: 'Наталья Стрельцова',
          nomination: 'Лауреат Премии в номинации: "За высокие достижения в Инициологии".',
          achievement: 'Восстановила утраченные функции и добилась отмены операции по удалению щитовидной железы, с использованием мастерских технологий Инициологии.',
          photo: ''
        },
        {
          name: 'АНДРЕЙ СОМОВ',
          nomination: 'Лауреат Премии в номинации: "За лучший результат в социальной Инициологии".',
          achievement: 'Создание и феноменальный органический рост компании с нуля до 170000000 рублей, за 6 месяцев, с использованием РМТ технологий Инициологии.',
          photo: ''
        }
      ]
    }
  };

  const data = content[language] || content.en;

  return (
    <section id="awards" className="py-20 md:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4 text-primary" data-testid="text-awards-title">
            {data.title}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {data.laureates.map((laureate, index) => (
            <Card key={index} className="hover-elevate transition-all duration-300 text-center" data-testid={`card-laureate-${index}`}>
              <CardContent className="p-6">
                <div className="mb-6 flex justify-center">
                  {laureate.photo ? (
                    <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-primary/20">
                      <img 
                        src={laureate.photo} 
                        alt={laureate.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-48 h-48 rounded-full bg-muted flex items-center justify-center text-muted-foreground border-4 border-primary/20">
                      Фото
                    </div>
                  )}
                </div>
                <h3 className="font-bold text-xl mb-3 text-primary" data-testid={`text-laureate-name-${index}`}>
                  {laureate.name}
                </h3>
                <p className="text-sm font-medium mb-3 text-foreground/90" data-testid={`text-laureate-nomination-${index}`}>
                  {laureate.nomination}
                </p>
                <p className="text-sm text-muted-foreground" data-testid={`text-laureate-achievement-${index}`}>
                  {laureate.achievement}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
