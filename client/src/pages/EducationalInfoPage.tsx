import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Building2, Users, GraduationCap, BookOpen, Briefcase, Wallet, DoorOpen, Award, ExternalLink } from 'lucide-react';

export default function EducationalInfoPage() {
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState('common');

  const tabs = [
    { id: 'common', label: 'Основные сведения', icon: Building2 },
    { id: 'struct', label: 'Структура и органы управления', icon: Users },
    { id: 'document', label: 'Документы', icon: FileText },
    { id: 'education', label: 'Образование', icon: GraduationCap },
    { id: 'employees', label: 'Руководство. Педагогический состав', icon: Briefcase },
    { id: 'objects', label: 'Материально-техническое обеспечение', icon: BookOpen },
    { id: 'paid_edu', label: 'Платные образовательные услуги', icon: Wallet },
    { id: 'budget', label: 'Финансово-хозяйственная деятельность', icon: Wallet },
    { id: 'vacant', label: 'Вакантные места', icon: DoorOpen },
    { id: 'grants', label: 'Стипендии и меры поддержки', icon: Award },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-8">
          Сведения об образовательной организации
        </h1>
        
        <div className="mb-6 p-4 bg-muted/50 rounded-lg">
          <p className="text-sm text-muted-foreground">
            <strong>ООО "НИЦ Инициологии и Трансперсональной Психологии"</strong><br />
            ИНН: 9701242212 | ОГРН: 1237700167660<br />
            Лицензия: Л035-01298-77/01122408 от 10 апреля 2024 г.
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="flex flex-wrap h-auto gap-1 mb-6 bg-transparent justify-start">
            {tabs.map((tab) => (
              <TabsTrigger
                key={tab.id}
                value={tab.id}
                className="text-xs sm:text-sm px-2 sm:px-3 py-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                data-testid={`tab-${tab.id}`}
              >
                <tab.icon className="w-4 h-4 mr-1 hidden sm:inline" />
                <span className="hidden md:inline">{tab.label}</span>
                <span className="md:hidden">{tab.label.split(' ')[0]}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="common">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="w-5 h-5" />
                  Основные сведения
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <InfoItem label="Полное наименование" value='ОБЩЕСТВО С ОГРАНИЧЕННОЙ ОТВЕТСТВЕННОСТЬЮ "НАУЧНО-ИССЛЕДОВАТЕЛЬСКИЙ ЦЕНТР ИНИЦИОЛОГИИ И ТРАНСПЕРСОНАЛЬНОЙ ПСИХОЛОГИИ"' />
                  <InfoItem label="Сокращенное наименование" value='ООО "НИЦ Инициологии и Трансперсональной Психологии"' />
                  <InfoItem label="Дата регистрации" value="01.03.2023" />
                  <InfoItem label="Учредитель" value="Лазаренко Вячеслав Павлович" />
                  <InfoItem label="Место нахождения" value="105005, город Москва, Бауманская ул, д. 33/2 стр. 1, помещ. 3/2" />
                  <InfoItem label="Филиалы" value="Отсутствуют" />
                  <InfoItem label="Режим работы" value="понедельник - пятница с 08:00 — 17:00, суббота, воскресенье - выходные" />
                  <InfoItem label="Контактный телефон" value="+7 (925) 829-82-23" />
                  <InfoItem label="Email" value="vplazarenko@gmail.com" />
                </div>
                <div className="pt-4 border-t">
                  <DocumentLink 
                    title="Лицензия на осуществление образовательной деятельности" 
                    subtitle="Л035-01298-77/01122408 от 10 апреля 2024 г."
                    url="https://disk.yandex.ru/i/ERhlDyjuA1SVMQ" 
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="struct">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Структура и органы управления образовательной организацией
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  ООО "НИЦ Инициологии и Трансперсональной Психологии" осуществляет свою деятельность на основе единоначалия, без выделения отдельных структурных подразделений. Управление образовательной организацией осуществляется в соответствии с Федеральным законом от 29 декабря 2012 г. № 273-ФЗ "Об образовании в Российской Федерации", Уставом организации и локальными нормативными актами.
                </p>
                
                <div className="p-4 bg-muted/50 rounded-lg">
                  <h4 className="font-semibold mb-2">Руководство образовательной организацией</h4>
                  <p>Общее руководство осуществляет <strong>Лазаренко Вячеслав Павлович</strong>, занимающий должность генерального директора.</p>
                  <p className="text-sm text-muted-foreground mt-2">Место нахождения: 105005, город Москва, Бауманская ул, д. 33/2 стр. 1, помещ. 3/2</p>
                </div>

                <h4 className="font-semibold mt-6">Документы, регламентирующие управление образовательной организацией</h4>
                <div className="grid gap-2">
                  <DocumentLink title="Положение о порядке организации деятельности Общего собрания работников" url="https://disk.yandex.ru/i/26jDPOLZ0rLdFA" />
                  <DocumentLink title="Положение о педагогическом совете" url="https://disk.yandex.ru/i/rOmGusgdfyBjVQ" />
                  <DocumentLink title="Положение о профессиональной этике педагогических работников (Кодекс профессиональной этики)" url="https://disk.yandex.ru/i/uKEJa9zWS71AuA" />
                  <DocumentLink title="Положение о порядке доступа педагогических работников к информационно-телекоммуникационным сетям и базам данных" url="https://disk.yandex.ru/i/BtFueRaNDqvpxg" />
                  <DocumentLink title="Положение о порядке бесплатного пользования образовательными, методическими и научными услугами" url="https://disk.yandex.ru/i/3m4L_M11naM3xw" />
                  <DocumentLink title="Положение о режиме рабочего времени педагогических работников" url="https://disk.yandex.ru/i/zprbHXOhHIwQlQ" />
                  <DocumentLink title="Положение о соотношении учебной и другой педагогической работы" url="https://disk.yandex.ru/i/zRnX0bZrXFFCXw" />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="document">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Документы
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <h4 className="font-semibold">Локальные нормативные акты образовательной организации</h4>
                <div className="grid gap-2">
                  <DocumentLink title="Правила внутреннего распорядка обучающихся" url="https://disk.yandex.ru/i/qTHHty3DZNmzLg" />
                  <DocumentLink title="Правила внутреннего трудового распорядка" url="https://disk.yandex.ru/i/mkjB6EBZdbu6_A" />
                  <DocumentLink title="Правила приема обучающихся" url="https://disk.yandex.ru/i/aOPHYrdKO2tatw" />
                  <DocumentLink title="Положение о режиме занятий обучающихся и формах обучения" url="https://disk.yandex.ru/i/aOPHYrdKO2tatw" />
                  <DocumentLink title="Положение об индивидуальном учебном плане, в том числе ускоренном обучении" url="https://disk.yandex.ru/i/bcWRN6TX4sTgXw" />
                  <DocumentLink title="Формы, периодичность и порядок текущего контроля успеваемости, промежуточной и итоговой аттестации" url="https://disk.yandex.ru/i/XzSDIEXVXRI8Rg" />
                  <DocumentLink title="Положение о порядке и основаниях перевода, отчисления и восстановления обучающихся" url="https://disk.yandex.ru/i/HEHUtiBk8IqrgA" />
                  <DocumentLink title="Порядок оформления возникновения, приостановления и прекращения отношений между образовательной организацией и обучающимися" url="https://disk.yandex.ru/i/BCcZ41TTKGoV_w" />
                  <DocumentLink title="Порядок организации и проведения самообследования" url="https://disk.yandex.ru/i/gC6ts06zU8MfsQ" />
                  <DocumentLink title="Положение о внутренней системе оценки качества образования" url="https://disk.yandex.ru/i/_dnZgQkt4npc9Q" />
                  <DocumentLink title="Положение о совете обучающихся" url="https://disk.yandex.ru/i/Cq4478tIgDxJ3g" />
                  <DocumentLink title="Положение о рабочей группе по противодействию и предотвращению коррупции" url="https://disk.yandex.ru/i/J1sLBD2lh9RDxw" />
                  <DocumentLink title="Порядок хранения в архивах на бумажных и/или электронных носителях результатов освоения обучающимися образовательных программ" url="https://disk.yandex.ru/i/--n4Ikh_AnjzJQ" />
                  <DocumentLink title="Порядок пользования и выбора учебников и учебных пособий обучающимися" url="https://disk.yandex.ru/i/kNemgrs1RFunMA" />
                  <DocumentLink title="Положение об информационной открытости и официальном сайте" url="https://disk.yandex.ru/i/apRUsvTB_eHMYg" />
                  <DocumentLink title="Положение о комиссии по регулированию споров между участниками образовательных отношений" url="https://disk.yandex.ru/i/zT0oxQ1jxP08Cg" />
                  <DocumentLink title="Положение о конфликте интересов" url="https://disk.yandex.ru/i/-GdVnVdoaHfhJQ" />
                  <DocumentLink title="Положение об обработке персональных данных" url="https://disk.yandex.ru/i/uW38n192oiAPvg" />
                  <DocumentLink title="Положение о порядке рассмотрения обращений граждан" url="https://disk.yandex.ru/i/kr7XmUMcy8-1aA" />
                  <DocumentLink title="Положение об электронном обучении и использовании дистанционных образовательных технологий" url="https://disk.yandex.ru/i/eghW9smgDm33nQ" />
                  <DocumentLink title="Выписка из реестра лицензий" url="https://disk.yandex.ru/i/ERhlDyjuA1SVMQ" />
                </div>
                
                <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                  <p className="text-sm text-muted-foreground">
                    <strong>Отчет о результатах самообследования</strong> — в разработке<br />
                    <strong>Предписания органов государственного контроля</strong> — не имеются<br />
                    <strong>Отчеты об исполнении предписаний</strong> — не имеются
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="education">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <GraduationCap className="w-5 h-5" />
                  Образование
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold text-lg mb-3">Реализуемые образовательные программы</h4>
                  <div className="space-y-2">
                    <p className="font-medium">ДОПОЛНИТЕЛЬНАЯ ПРОФЕССИОНАЛЬНАЯ ПРОГРАММА – ПРОГРАММА ПОВЫШЕНИЯ КВАЛИФИКАЦИИ «Практическая психология»</p>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li><strong>Уровень образования:</strong> дополнительное профессиональное образование</li>
                      <li><strong>Форма обучения:</strong> с применением исключительно электронного обучения, дистанционных образовательных технологий</li>
                      <li><strong>Нормативный срок обучения:</strong> 1 неделя</li>
                    </ul>
                  </div>
                  <DocumentLink title="Программа курса" url="https://disk.360.yandex.ru/i/Vj-YLSwFNWFbNQ" className="mt-3" />
                </div>

                <div className="p-4 bg-muted/50 rounded-lg">
                  <h4 className="font-semibold mb-3">Численность обучающихся</h4>
                  <ul className="text-sm space-y-1">
                    <li>Численность обучающихся по образовательным программам: <strong>0 человек</strong></li>
                    <li>За счет бюджетных ассигнований федерального бюджета: <strong>0</strong></li>
                    <li>За счет бюджетов субъектов РФ: <strong>0</strong></li>
                    <li>За счет местных бюджетов: <strong>0</strong></li>
                    <li>По договорам за счет средств физических/юридических лиц: <strong>0</strong></li>
                    <li>Обучающиеся - иностранные граждане: <strong>отсутствуют</strong></li>
                  </ul>
                </div>

                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">Язык образования</h4>
                  <p className="text-muted-foreground">Образовательная деятельность ведется на русском языке.</p>
                  <DocumentLink title="Положение об языке обучения" url="https://disk.yandex.ru/i/4WAPcwR-GoZmUg" className="mt-2" />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="employees">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Briefcase className="w-5 h-5" />
                  Руководство. Педагогический состав
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-3">Руководитель образовательной организации</h4>
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center">
                      <Users className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="font-medium text-lg">Лазаренко Вячеслав Павлович</p>
                      <p className="text-muted-foreground">Генеральный директор</p>
                    </div>
                  </div>
                </div>

                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-3">Педагогический состав</h4>
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center">
                      <GraduationCap className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="font-medium text-lg">Лазаренко Вячеслав Павлович</p>
                      <p className="text-muted-foreground">Преподаватель</p>
                    </div>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground">
                  На данный момент филиалов образовательной организации нет. Информация обновляется в случае изменений в составе руководства.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="objects">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5" />
                  Материально-техническое обеспечение и оснащенность образовательного процесса
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <Section title="1. Материально-техническое оснащение">
                  <p className="text-muted-foreground mb-4">
                    Наша образовательная организация предоставляет все необходимые ресурсы для качественного обучения, включая доступ к образовательным материалам, специализированным программным продуктам и электронным ресурсам.
                  </p>
                  
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="p-3 bg-muted/50 rounded-lg">
                      <h5 className="font-medium mb-2">Учебные кабинеты</h5>
                      <ul className="text-sm text-muted-foreground list-disc list-inside">
                        <li>Персональные компьютеры</li>
                        <li>Мультимедийное оборудование</li>
                        <li>Наглядные материалы</li>
                      </ul>
                    </div>
                    <div className="p-3 bg-muted/50 rounded-lg">
                      <h5 className="font-medium mb-2">Программное обеспечение</h5>
                      <ul className="text-sm text-muted-foreground list-disc list-inside">
                        <li>Windows</li>
                        <li>MS Office</li>
                        <li>Консультант Плюс</li>
                      </ul>
                    </div>
                    <div className="p-3 bg-muted/50 rounded-lg">
                      <h5 className="font-medium mb-2">Электронные ресурсы</h5>
                      <ul className="text-sm text-muted-foreground list-disc list-inside">
                        <li>Электронные библиотеки</li>
                        <li>Образовательные порталы</li>
                        <li>Видеоматериалы</li>
                      </ul>
                    </div>
                    <div className="p-3 bg-muted/50 rounded-lg">
                      <h5 className="font-medium mb-2">Система обучения</h5>
                      <p className="text-sm text-muted-foreground">Материалы доступны через систему «Бизон 365»</p>
                    </div>
                  </div>
                </Section>

                <Section title="2. Доступная среда">
                  <p className="text-muted-foreground">
                    Обучение проводится в дистанционном формате, специальные условия для посещения зданий не требуются. На данный момент специализированное оборудование для инвалидов и лиц с ОВЗ не предусмотрено.
                  </p>
                </Section>

                <Section title="3. Охрана здоровья обучающихся">
                  <p className="text-muted-foreground">
                    Образовательная организация обеспечивает выполнение требований Федерального закона № 273-ФЗ. Обучение ведется в соответствии с утвержденным учебным планом в удобном для слушателей формате.
                  </p>
                </Section>

                <div className="text-sm text-muted-foreground space-y-1">
                  <p>Физическая библиотека — отсутствует</p>
                  <p>Спортивные объекты — не предусмотрены</p>
                  <p>Общежитие и интернат — не предусмотрены</p>
                  <p>Организация питания — не предусмотрена</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="paid_edu">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Wallet className="w-5 h-5" />
                  Платные образовательные услуги
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  Образовательная организация предоставляет платные образовательные услуги в строгом соответствии с действующим законодательством Российской Федерации.
                </p>

                <Section title="Порядок предоставления платных образовательных услуг">
                  <p className="text-muted-foreground">
                    Обучение осуществляется на основании договора между образовательной организацией и обучающимся (или его законным представителем). Все условия оказания услуг регулируются внутренними нормативными актами.
                  </p>
                </Section>

                <div className="grid gap-2">
                  <DocumentLink title="Положение о порядке оказания платных образовательных услуг, вместе с образцом договора" url="https://disk.yandex.ru/i/kwKWPVlHPZFGjw" />
                  <DocumentLink title="Положение об основаниях и порядке снижения стоимости платных образовательных услуг" url="https://disk.yandex.ru/i/XVPNZQx56qmoEA" />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="budget">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Wallet className="w-5 h-5" />
                  Финансово-хозяйственная деятельность
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  Финансово-хозяйственная деятельность образовательной организации осуществляется в соответствии с законодательством Российской Федерации, обеспечивая прозрачность и эффективность использования финансовых ресурсов.
                </p>

                <Section title="Источники финансирования образовательной деятельности">
                  <ul className="text-muted-foreground list-disc list-inside space-y-1">
                    <li>Доходы от оказания платных образовательных услуг (в соответствии с заключенными договорами)</li>
                    <li>Собственные средства организации</li>
                    <li>Иные поступления, не запрещенные законодательством РФ</li>
                  </ul>
                </Section>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="vacant">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DoorOpen className="w-5 h-5" />
                  Вакантные места для приема (перевода) обучающихся
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-muted/50 rounded-lg text-center">
                  <p className="font-medium">В настоящее время вакантные места для приема (перевода) обучающихся <strong>отсутствуют</strong>.</p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-2">Бюджетные места</h4>
                    <p className="text-muted-foreground">На данный момент бюджетные места не предусмотрены.</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-2">Места по договорам</h4>
                    <p className="text-muted-foreground">На текущий момент свободных мест по договорам нет.</p>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground">
                  Актуальная информация о наличии вакантных мест будет обновляться по мере изменений в образовательных программах и набора обучающихся.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="grants">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="w-5 h-5" />
                  Стипендии и меры поддержки обучающихся
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-muted/50 rounded-lg text-center">
                  <p className="font-medium">В образовательной организации <strong>не предусмотрены</strong> стипендии и меры социальной поддержки обучающихся.</p>
                </div>

                <div className="grid gap-4 sm:grid-cols-3">
                  <div className="p-4 border rounded-lg text-center">
                    <Award className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                    <h4 className="font-semibold">Стипендии</h4>
                    <p className="text-sm text-muted-foreground">Не предусмотрены</p>
                  </div>
                  <div className="p-4 border rounded-lg text-center">
                    <Users className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                    <h4 className="font-semibold">Социальная поддержка</h4>
                    <p className="text-sm text-muted-foreground">Отсутствует</p>
                  </div>
                  <div className="p-4 border rounded-lg text-center">
                    <Building2 className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                    <h4 className="font-semibold">Общежитие</h4>
                    <p className="text-sm text-muted-foreground">Не предоставляется</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
      
      <Footer />
    </div>
  );
}

function InfoItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="p-3 bg-muted/30 rounded-lg">
      <p className="text-xs text-muted-foreground mb-1">{label}</p>
      <p className="text-sm font-medium">{value}</p>
    </div>
  );
}

function DocumentLink({ title, subtitle, url, className }: { title: string; subtitle?: string; url: string; className?: string }) {
  return (
    <a 
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`flex items-center gap-2 p-2 rounded-lg hover:bg-muted/50 transition-colors group ${className || ''}`}
      data-testid={`link-document-${title.substring(0, 20)}`}
    >
      <FileText className="w-4 h-4 text-primary flex-shrink-0" />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium group-hover:text-primary transition-colors truncate">{title}</p>
        {subtitle && <p className="text-xs text-muted-foreground">{subtitle}</p>}
      </div>
      <ExternalLink className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
    </a>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <h4 className="font-semibold">{title}</h4>
      {children}
    </div>
  );
}
