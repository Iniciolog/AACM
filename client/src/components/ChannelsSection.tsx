import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const channelsData = {
  en: {
    restorative: [
      { name: 'Sey-Lin', desc: 'Urogenital system, kidney stones, fibroids, cysts, infertility, STIs' },
      { name: 'Farist', desc: 'Cardiovascular system, blood pressure, pre/post-infarction conditions' },
      { name: 'Sey-Him', desc: 'Gastrointestinal tract' },
      { name: 'San-Lem', desc: 'Nervous, lymphatic, endocrine, immune systems' },
      { name: 'Fibios', desc: 'Viruses, infections' },
      { name: 'Shalim-San', desc: 'Blood composition, vessels, capillaries, veins, arteries' },
      { name: 'Arum-Bed', desc: 'Spine and musculoskeletal system' },
      { name: 'Darun-Ao-Lin', desc: 'Metabolism, regeneration, rejuvenation, weight normalization' },
      { name: 'Sarat-Bey', desc: 'Brain, brain vessels, stroke conditions, mental disorders' },
      { name: 'Daolin', desc: 'Vision, hearing' },
      { name: 'Sharot', desc: 'Malignant neoplasms' },
      { name: 'Farim-San', desc: 'Hormonal balance, immunity, blood pressure' },
      { name: 'Aridum', desc: 'Diabetes' },
      { name: 'Shao-Nen', desc: 'Works on animals, birds, plants' },
      { name: 'Dario-San', desc: 'Respiratory system' },
      { name: 'Sur', desc: 'Skin, allergies' },
      { name: 'Sirius-D', desc: 'DNA, genetics' },
      { name: 'Farot', desc: 'Mammary glands, breast shape, mastopathy, cellulite' },
      { name: 'Ma-Shi-Tsa', desc: 'Impact restorative channel' },
      { name: 'Ga-Bu-La', desc: 'Gallstones, kidney stones, liver cleansing' },
      { name: 'Orion-D', desc: 'Wrinkles, scars, wounds, hair loss' },
      { name: 'Muktab', desc: 'Rejuvenation' },
      { name: 'Vedium', desc: 'HIV infection elimination and AIDS healing' },
    ],
    cleansing: [
      { name: 'Aum-Ra-Ke', desc: 'Removes witchcraft, curses, love magic, energy vampire connections' },
      { name: 'Sutram', desc: 'Removes ancestral karma, past life karma, personal karma' },
      { name: 'Farum', desc: 'Breaks necrotic connections with deceased, removes ancestral curse' },
      { name: 'Arus', desc: 'Protection against any energy negativity, creates protective shell' },
    ],
    social: [
      { name: 'Tantra-Nen', desc: 'Tunes to frequency of luck, removes from failure streak' },
      { name: 'Tetragrammaton', desc: 'Fulfills wishes, promotes goal achievement, materializes ideas' },
      { name: 'Karist', desc: 'Deflects enemies and ill-wishers, prevents dangerous plans' },
      { name: 'St. Michael', desc: 'Luck in love and personal life, favorable family atmosphere' },
      { name: 'Arbatel', desc: 'Tunes to material well-being frequency, attracts money' },
      { name: 'Dar', desc: 'Fiery willpower energy, power over events and people, success' },
      { name: 'Zolt', desc: 'Creates field of success and wealth, inspires respect and trust' },
    ],
    informational: [
      { name: 'Viartan', desc: 'Opens access to universal information field' },
      { name: 'Buddha-Universum', desc: 'Opens access to universal field, astral travels' },
    ],
    impact: [
      { name: 'Cirion', desc: 'Fire element, 50 frequencies. Neoplasms, viruses, infections, blood' },
      { name: 'Christos', desc: '50 frequencies. Eliminates energy blocks, cleanses destiny matrix' },
      { name: 'Solomon', desc: '120 frequencies. Luck, prosperity, wealth, personal magnetism' },
      { name: 'Ratron', desc: '100 frequencies. Cleanses from negativity, spine, weight normalization' },
      { name: 'Pleiades Block', desc: 'DNA activation, chakra development, beam therapy, rejuvenation' },
      { name: 'Kryon Block', desc: 'Energy cosmetology, magnetic service, magnetism increase' },
    ],
  },
  de: {
    restorative: [
      { name: 'Sey-Lin', desc: 'Urogenitalsystem, Nierensteine, Myome, Zysten, Unfruchtbarkeit, STIs' },
      { name: 'Farist', desc: 'Herz-Kreislauf-System, Blutdruck, Vor-/Nach-Infarkt-Zustände' },
      { name: 'Sey-Him', desc: 'Magen-Darm-Trakt' },
      { name: 'San-Lem', desc: 'Nerven-, Lymph-, endokrine, Immunsysteme' },
      { name: 'Fibios', desc: 'Viren, Infektionen' },
      { name: 'Shalim-San', desc: 'Blutzusammensetzung, Gefäße, Kapillaren, Venen, Arterien' },
      { name: 'Arum-Bed', desc: 'Wirbelsäule und Bewegungsapparat' },
      { name: 'Darun-Ao-Lin', desc: 'Stoffwechsel, Regeneration, Verjüngung, Gewichtsnormalisierung' },
      { name: 'Sarat-Bey', desc: 'Gehirn, Gehirngefäße, Schlaganfallzustände, psychische Störungen' },
      { name: 'Daolin', desc: 'Sehen, Hören' },
      { name: 'Sharot', desc: 'Bösartige Neubildungen' },
      { name: 'Farim-San', desc: 'Hormonelles Gleichgewicht, Immunität, Blutdruck' },
      { name: 'Aridum', desc: 'Diabetes' },
      { name: 'Shao-Nen', desc: 'Funktioniert bei Tieren, Vögeln, Pflanzen' },
      { name: 'Dario-San', desc: 'Atemwege' },
      { name: 'Sur', desc: 'Haut, Allergien' },
      { name: 'Sirius-D', desc: 'DNA, Genetik' },
      { name: 'Farot', desc: 'Brustdrüsen, Brustform, Mastopathie, Cellulite' },
      { name: 'Ma-Shi-Tsa', desc: 'Impact-Wiederherstellungskanal' },
      { name: 'Ga-Bu-La', desc: 'Gallensteine, Nierensteine, Leberreinigung' },
      { name: 'Orion-D', desc: 'Falten, Narben, Wunden, Haarausfall' },
      { name: 'Muktab', desc: 'Verjüngung' },
      { name: 'Vedium', desc: 'HIV-Infektion-Beseitigung und AIDS-Heilung' },
    ],
    cleansing: [
      { name: 'Aum-Ra-Ke', desc: 'Entfernt Hexerei, Flüche, Liebesmagie, Energievampir-Verbindungen' },
      { name: 'Sutram', desc: 'Entfernt Ahnenkarma, Karma vergangener Leben, persönliches Karma' },
      { name: 'Farum', desc: 'Bricht nekrotische Verbindungen zu Verstorbenen, entfernt Ahnenfluch' },
      { name: 'Arus', desc: 'Schutz gegen jegliche Energienegativität, schafft Schutzschale' },
    ],
    social: [
      { name: 'Tantra-Nen', desc: 'Stimmt auf Glücksfrequenz ein, beseitigt Pechsträhne' },
      { name: 'Tetragrammaton', desc: 'Erfüllt Wünsche, fördert Zielerreichung, materialisiert Ideen' },
      { name: 'Karist', desc: 'Lenkt Feinde und Übeltäter ab, verhindert gefährliche Pläne' },
      { name: 'St. Michael', desc: 'Glück in Liebe und persönlichem Leben, günstige Familienatmosphäre' },
      { name: 'Arbatel', desc: 'Stimmt auf materielle Wohlstandsfrequenz ein, zieht Geld an' },
      { name: 'Dar', desc: 'Feurige Willenskraftenergie, Macht über Ereignisse und Menschen, Erfolg' },
      { name: 'Zolt', desc: 'Schafft Feld von Erfolg und Wohlstand, inspiriert Respekt und Vertrauen' },
    ],
    informational: [
      { name: 'Viartan', desc: 'Öffnet Zugang zum universellen Informationsfeld' },
      { name: 'Buddha-Universum', desc: 'Öffnet Zugang zum universellen Feld, Astralreisen' },
    ],
    impact: [
      { name: 'Cirion', desc: 'Feuerelement, 50 Frequenzen. Neubildungen, Viren, Infektionen, Blut' },
      { name: 'Christos', desc: '50 Frequenzen. Beseitigt Energieblockaden, reinigt Schicksalsmatrix' },
      { name: 'Solomon', desc: '120 Frequenzen. Glück, Wohlstand, Reichtum, persönlicher Magnetismus' },
      { name: 'Ratron', desc: '100 Frequenzen. Reinigt von Negativität, Wirbelsäule, Gewichtsnormalisierung' },
      { name: 'Pleiades Block', desc: 'DNA-Aktivierung, Chakra-Entwicklung, Strahltherapie, Verjüngung' },
      { name: 'Kryon Block', desc: 'Energie-Kosmetologie, magnetischer Service, Magnetismus-Erhöhung' },
    ],
  },
  ru: {
    restorative: [
      { name: 'Сэй-Лин', desc: 'Мочеполовая система, камни в почках, миомы, кисты, бесплодие, ИППП' },
      { name: 'Фарист', desc: 'Сердечно-сосудистая система, давление, пред/постинфарктные состояния' },
      { name: 'Сей-Хим', desc: 'Желудочно-кишечный тракт' },
      { name: 'Сан-Лем', desc: 'Нервная, лимфатическая, эндокринная, иммунная системы' },
      { name: 'Фибиос', desc: 'Вирусы, инфекции' },
      { name: 'Шалим-Сан', desc: 'Кровь, состав, сосуды, капилляры, вены, артерии' },
      { name: 'Арум-Бэд', desc: 'Позвоночник и опорно-двигательный аппарат' },
      { name: 'Дарун-Ао-Лин', desc: 'Обмен веществ, регенерация, омоложение, нормализация веса' },
      { name: 'Сарат-Бэй', desc: 'Мозг, сосуды мозга, инсультные состояния, психические расстройства' },
      { name: 'Даолин', desc: 'Зрение, слух' },
      { name: 'Шарот', desc: 'Злокачественные новообразования' },
      { name: 'Фарим-Сан', desc: 'Гормональный фон, иммунитет, артериальное давление' },
      { name: 'Аридум', desc: 'Сахарный диабет' },
      { name: 'Шао-Нен', desc: 'Работает на животных, птиц, растения' },
      { name: 'Дарио-Сан', desc: 'Дыхательная система' },
      { name: 'Сур', desc: 'Кожа, аллергии' },
      { name: 'Сириус-Д', desc: 'ДНК, генетика' },
      { name: 'Фарот', desc: 'Молочные железы, форма груди, мастопатия, целлюлит' },
      { name: 'Ма-Ши-Ца', desc: 'Ударный восстановительный канал' },
      { name: 'Га-Бу-Ла', desc: 'Камни в желчном пузыре, почках, чистка печени' },
      { name: 'Орион-Д', desc: 'Морщины, шрамы, рубцы, раны, облысение' },
      { name: 'Муктаб', desc: 'Омоложение' },
      { name: 'Ведиум', desc: 'Уничтожение ВИЧ инфекции и исцеление СПИДа' },
    ],
    cleansing: [
      { name: 'Аум-Ра-Ке', desc: 'Снимает колдовство, проклятия, любовную магию, подключки энерговампиров' },
      { name: 'Сутрам', desc: 'Снимает карму рода, прошлых воплощений, личную карму' },
      { name: 'Фарум', desc: 'Разрывает некротические связи с умершими, снимает родовое проклятье' },
      { name: 'Арус', desc: 'Защита от любого энергетического негатива, создает защитную оболочку' },
    ],
    social: [
      { name: 'Тантра-Нэн', desc: 'Настраивает на частоту удачи, выводит из полосы неудач' },
      { name: 'Тетраграмматон', desc: 'Исполняет желания, способствует достижению целей, материализует идеи' },
      { name: 'Карист', desc: 'Отводит врагов и недоброжелателей, препятствует опасным планам' },
      { name: 'Св. Михаила', desc: 'Удача в любви и личной жизни, благоприятная атмосфера в семье' },
      { name: 'Арбатель', desc: 'Настраивает на частоту материального благополучия, притягивает деньги' },
      { name: 'Дар', desc: 'Огненная волевая энергия, власть над событиями и людьми, успех' },
      { name: 'Золт', desc: 'Создает поле успеха и богатства, внушает уважение и доверие' },
    ],
    informational: [
      { name: 'Виартан', desc: 'Открывает доступ ко всеобщему информационному полю' },
      { name: 'Будда-Универсум', desc: 'Открывает доступ к вселенскому полю, астральные путешествия' },
    ],
    impact: [
      { name: 'Цирион', desc: 'Стихия огня, 50 частот. Новообразования, вирусы, инфекции, кровь' },
      { name: 'Христос', desc: '50 частот. Устраняет энергоблоки, очищает матрицу судьбы' },
      { name: 'Соломон', desc: '120 частот. Удача, благополучие, богатство, личный магнетизм' },
      { name: 'Ратрон', desc: '100 частот. Очищает от негатива, позвоночник, нормализация веса' },
      { name: 'Блок Плеяды', desc: 'Активация ДНК, развитие чакр, лучевая терапия, омоложение' },
      { name: 'Блок Крайон', desc: 'Энергокосметология, магнетическая служба, увеличение магнетизма' },
    ],
  },
};

export default function ChannelsSection() {
  const { t, language } = useLanguage();
  const channels = channelsData[language] || channelsData.en;

  const categories = [
    { id: 'restorative', key: 'restorative' },
    { id: 'cleansing', key: 'cleansing' },
    { id: 'social', key: 'social' },
    { id: 'informational', key: 'informational' },
    { id: 'impact', key: 'impact' },
  ];

  return (
    <section id="channels" className="py-20 md:py-32 bg-card">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4" data-testid="text-channels-title">
            {t('channels.title')}
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            {t('channels.subtitle')}
          </p>
        </div>

        <Tabs defaultValue="restorative" className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 mb-8" data-testid="tabs-channels">
            {categories.map((category) => (
              <TabsTrigger 
                key={category.id} 
                value={category.id}
                data-testid={`tab-${category.id}`}
              >
                {language === 'ru' ? 
                  category.id === 'restorative' ? 'Восстановительные' :
                  category.id === 'cleansing' ? 'Очистительные' :
                  category.id === 'social' ? 'Социальные' :
                  category.id === 'informational' ? 'Информационные' :
                  'Ударные'
                : language === 'de' ?
                  category.id === 'restorative' ? 'Wiederherstellend' :
                  category.id === 'cleansing' ? 'Reinigend' :
                  category.id === 'social' ? 'Sozial' :
                  category.id === 'informational' ? 'Informativ' :
                  'Impact'
                :
                  category.id === 'restorative' ? 'Restorative' :
                  category.id === 'cleansing' ? 'Cleansing' :
                  category.id === 'social' ? 'Social' :
                  category.id === 'informational' ? 'Informational' :
                  'Impact'
                }
              </TabsTrigger>
            ))}
          </TabsList>

          {categories.map((category) => (
            <TabsContent key={category.id} value={category.id}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {(channels[category.key as keyof typeof channels] as Array<{name: string, desc: string}>).map((channel, index) => (
                  <Card 
                    key={index} 
                    className="hover-elevate transition-all duration-300"
                    data-testid={`card-channel-${category.id}-${index}`}
                  >
                    <CardHeader>
                      <CardTitle className="text-lg">
                        {channel.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-sm">
                        {channel.desc}
                      </CardDescription>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
}
