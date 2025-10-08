import { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'de' | 'ru';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    // Header
    'nav.home': 'Home',
    'nav.research': 'Research',
    'nav.articles': 'Articles',
    'nav.studies': 'Studies',
    'nav.conclusions': 'Scientific Conclusions',
    'nav.education': 'Platform',
    'nav.books': 'Books',
    'nav.awards': 'Awards',
    'nav.services': 'Services',
    'nav.faq': 'FAQ',
    'nav.contact': 'Contact',
    'nav.about': 'About',
    
    // Hero
    'hero.title': 'International Academy of Initiology',
    'hero.subtitle': 'Advancing scientific knowledge through groundbreaking research and global collaboration',
    'hero.cta': 'Explore Our Research',
    
    // Research
    'research.title': 'Our Research',
    'research.subtitle': 'Groundbreaking studies advancing the frontiers of initiology',
    'research.article1.title': 'Quantum Initiology Principles',
    'research.article1.desc': 'Exploring the fundamental quantum mechanisms underlying initiology processes',
    'research.article2.title': 'Global Initiology Patterns',
    'research.article2.desc': 'Comprehensive analysis of initiology phenomena across international populations',
    'research.article3.title': 'Neurological Foundations',
    'research.article3.desc': 'Understanding the neurological basis of initiology responses',
    'research.readmore': 'Read More',
    
    // Education
    'education.title': 'Educational Platform',
    'education.subtitle': 'World-class learning resources for scholars and practitioners',
    'education.feature1': 'Comprehensive Courses',
    'education.feature2': 'Expert Instructors',
    'education.feature3': 'International Certification',
    'education.cta': 'Access Platform',
    
    // Books
    'books.title': 'Publications & Books',
    'books.subtitle': 'Authoritative texts shaping the field of initiology',
    
    // About
    'about.title': 'Founder',
    'about.name': 'Vyacheslav Lazarenko',
    'about.role': 'Founder & Master Teacher',
    'about.bio': 'Vyacheslav Lazarenko is the founder and developer of the Initiology energy practice system. With over 25,000 students across CIS countries and a global presence spanning the EU, China, and USA, his work has transformed the lives of thousands. The methodology is based on working with cosmic energy channels, enabling physical healing, energy structure cleansing, and holistic life improvement. His research and teaching have established Initiology as a recognized energy practice worldwide.',
    
    // FAQ
    'faq.title': 'Frequently Asked Questions',
    'faq.q1': 'What is Initiology in simple terms?',
    'faq.a1': 'Initiology is an energy practice aimed at healing and improving quality of life. The method is based on interaction with energy channels through which cosmic energy flows. These flows positively affect all areas of human life. Through working with channels, physical healing, cleansing of subtle energy structures, and qualitative improvement of all life areas occur.',
    'faq.q2': 'Will I be able to learn the Initiology method?',
    'faq.a2': 'Anyone who wishes can learn to work with channels and master the Initiology method. No special abilities or talents are required. Access to energy channels is transferred from master-teacher to student through initiation (attunement, connection), after which the student can immediately begin working with channels and receiving corresponding results. Channels are transferred once and access to them is retained for life.',
    'faq.q3': 'How does Initiology differ from other energy practices?',
    'faq.a3': 'An initiologist does not expend their own energy working with problems or illnesses. All work is done by channels through which cosmic energy flows. The channel resource is limitless. Channels provide energy protection from the transfer of pathogenic information and negative programs from the patient to the initiologist during sessions. Initiology has an arsenal of targeted channels, purposefully working with specific diseases and types of problems.',
    
    // Footer
    'footer.about': 'About Academy',
    'footer.about.desc': 'The International Academy of Initiology is a premier research institution advancing scientific knowledge globally.',
    'footer.quicklinks': 'Quick Links',
    'footer.research': 'Research',
    'footer.education': 'Education',
    'footer.publications': 'Publications',
    'footer.resources': 'Resources',
    'footer.books': 'Books',
    'footer.articles': 'Articles',
    'footer.platform': 'Platform Access',
    'footer.legal': 'Legal',
    'footer.privacy': 'Privacy Policy',
    'footer.cookies': 'Cookie Policy',
    'footer.data': 'Data Protection',
    'footer.terms': 'Terms of Service',
    'footer.contact': 'Contact',
    'footer.address': '123 Science Avenue, Research District',
    'footer.email': 'info@initiology-academy.org',
    'footer.phone': '+1 (555) 123-4567',
    'footer.newsletter': 'Subscribe to Newsletter',
    'footer.copyright': '© 2024 International Academy of Initiology. All rights reserved.',
  },
  de: {
    // Header
    'nav.home': 'Startseite',
    'nav.research': 'Forschung',
    'nav.articles': 'Artikel',
    'nav.studies': 'Studien',
    'nav.conclusions': 'Wissenschaftliche Schlussfolgerungen',
    'nav.education': 'Platform',
    'nav.books': 'Bücher',
    'nav.awards': 'Auszeichnungen',
    'nav.services': 'Dienstleistungen',
    'nav.faq': 'FAQ',
    'nav.contact': 'Kontakt',
    'nav.about': 'Über uns',
    
    // Hero
    'hero.title': 'Internationale Akademie für Initiologie',
    'hero.subtitle': 'Förderung wissenschaftlicher Erkenntnisse durch bahnbrechende Forschung und globale Zusammenarbeit',
    'hero.cta': 'Unsere Forschung entdecken',
    
    // Research
    'research.title': 'Unsere Forschung',
    'research.subtitle': 'Bahnbrechende Studien zur Erweiterung der Grenzen der Initiologie',
    'research.article1.title': 'Quanten-Initiologie-Prinzipien',
    'research.article1.desc': 'Erforschung der grundlegenden Quantenmechanismen der Initiologie-Prozesse',
    'research.article2.title': 'Globale Initiologie-Muster',
    'research.article2.desc': 'Umfassende Analyse der Initiologie-Phänomene in internationalen Populationen',
    'research.article3.title': 'Neurologische Grundlagen',
    'research.article3.desc': 'Verständnis der neurologischen Basis von Initiologie-Reaktionen',
    'research.readmore': 'Mehr lesen',
    
    // Education
    'education.title': 'Bildungsplattform',
    'education.subtitle': 'Weltklasse-Lernressourcen für Wissenschaftler und Praktiker',
    'education.feature1': 'Umfassende Kurse',
    'education.feature2': 'Expertenlehrer',
    'education.feature3': 'Internationale Zertifizierung',
    'education.cta': 'Plattform betreten',
    
    // Books
    'books.title': 'Publikationen & Bücher',
    'books.subtitle': 'Maßgebliche Texte, die das Feld der Initiologie prägen',
    
    // About
    'about.title': 'Gründer',
    'about.name': 'Vjatscheslaw Lasarenko',
    'about.role': 'Gründer & Meisterlehrer',
    'about.bio': 'Vjatscheslaw Lasarenko ist der Gründer und Entwickler des Initiologie-Energiepraxis-Systems. Mit über 25.000 Schülern in den GUS-Ländern und weltweiter Präsenz in der EU, China und den USA hat seine Arbeit das Leben von Tausenden verändert. Die Methodik basiert auf der Arbeit mit kosmischen Energiekanälen und ermöglicht körperliche Heilung, Reinigung der Energiestrukturen und ganzheitliche Lebensverbesserung. Seine Forschung und Lehre haben die Initiologie als weltweit anerkannte Energiepraxis etabliert.',
    
    // FAQ
    'faq.title': 'Häufig gestellte Fragen',
    'faq.q1': 'Was ist Initiologie in einfachen Worten?',
    'faq.a1': 'Initiologie ist eine Energiepraxis, die auf Heilung und Verbesserung der Lebensqualität abzielt. Die Methode basiert auf der Interaktion mit Energiekanälen, durch die kosmische Energie fließt. Diese Ströme wirken sich positiv auf alle Lebensbereiche aus. Durch die Arbeit mit Kanälen kommt es zur körperlichen Heilung, Reinigung subtiler Energiestrukturen und qualitativer Verbesserung aller Lebensbereiche.',
    'faq.q2': 'Kann ich die Initiologie-Methode erlernen?',
    'faq.a2': 'Jeder, der möchte, kann lernen, mit Kanälen zu arbeiten und die Initiologie-Methode zu beherrschen. Es sind keine besonderen Fähigkeiten oder Talente erforderlich. Der Zugang zu Energiekanälen wird vom Meister-Lehrer durch Initiation (Einstimmung, Verbindung) an den Schüler übertragen, wonach der Schüler sofort mit der Arbeit mit Kanälen beginnen und entsprechende Ergebnisse erzielen kann. Kanäle werden einmal übertragen und der Zugang zu ihnen bleibt lebenslang erhalten.',
    'faq.q3': 'Wie unterscheidet sich Initiologie von anderen Energiepraktiken?',
    'faq.a3': 'Ein Initiologe verbraucht keine eigene Energie bei der Arbeit mit Problemen oder Krankheiten. Alle Arbeit wird von Kanälen geleistet, durch die kosmische Energie fließt. Die Kanalressource ist grenzenlos. Kanäle bieten energetischen Schutz vor der Übertragung krankhafter Informationen und negativer Programme vom Patienten auf den Initiologen während der Sitzungen. Initiologie verfügt über ein Arsenal gezielter Kanäle, die gezielt mit bestimmten Krankheiten und Problemtypen arbeiten.',
    
    // Footer
    'footer.about': 'Über die Akademie',
    'footer.about.desc': 'Die Internationale Akademie für Initiologie ist eine führende Forschungseinrichtung zur globalen Förderung wissenschaftlicher Erkenntnisse.',
    'footer.quicklinks': 'Schnelllinks',
    'footer.research': 'Forschung',
    'footer.education': 'Bildung',
    'footer.publications': 'Publikationen',
    'footer.resources': 'Ressourcen',
    'footer.books': 'Bücher',
    'footer.articles': 'Artikel',
    'footer.platform': 'Plattformzugang',
    'footer.legal': 'Rechtliches',
    'footer.privacy': 'Datenschutz',
    'footer.cookies': 'Cookie-Richtlinie',
    'footer.data': 'Datenschutz',
    'footer.terms': 'Nutzungsbedingungen',
    'footer.contact': 'Kontakt',
    'footer.address': 'Wissenschaftsallee 123, Forschungsviertel',
    'footer.email': 'info@initiology-academy.org',
    'footer.phone': '+49 (555) 123-4567',
    'footer.newsletter': 'Newsletter abonnieren',
    'footer.copyright': '© 2024 Internationale Akademie für Initiologie. Alle Rechte vorbehalten.',
  },
  ru: {
    // Header
    'nav.home': 'Главная',
    'nav.research': 'Исследования',
    'nav.articles': 'Статьи',
    'nav.studies': 'Научные работы',
    'nav.conclusions': 'Научные заключения',
    'nav.education': 'Платформа',
    'nav.books': 'Книги',
    'nav.awards': 'Награды',
    'nav.services': 'Услуги',
    'nav.faq': 'Вопросы и ответы',
    'nav.contact': 'Контакты',
    'nav.about': 'О нас',
    
    // Hero
    'hero.title': 'Международная Академия Инициологии',
    'hero.subtitle': 'Продвижение знаний о раскрытии природных способностей человека, через передовые исследования и глобальное сотрудничество',
    'hero.cta': 'Изучить исследования',
    
    // Research
    'research.title': 'Наши исследования',
    'research.subtitle': 'Передовые исследования, расширяющие границы инициологии',
    'research.article1.title': 'Квантовые принципы инициологии',
    'research.article1.desc': 'Изучение фундаментальных квантовых механизмов, лежащих в основе процессов инициологии',
    'research.article2.title': 'Глобальные паттерны инициологии',
    'research.article2.desc': 'Всесторонний анализ феноменов инициологии в международных популяциях',
    'research.article3.title': 'Неврологические основы',
    'research.article3.desc': 'Понимание неврологической основы реакций инициологии',
    'research.readmore': 'Читать далее',
    
    // Education
    'education.title': 'Образовательная платформа',
    'education.subtitle': 'Мировые образовательные ресурсы для учёных и практиков',
    'education.feature1': 'Комплексные курсы',
    'education.feature2': 'Экспертные преподаватели',
    'education.feature3': 'Международная сертификация',
    'education.cta': 'Перейти на платформу',
    
    // Books
    'books.title': 'Публикации и книги',
    'books.subtitle': 'Авторитетные труды, формирующие область инициологии',
    
    // About
    'about.title': 'Основатель',
    'about.name': 'Вячеслав Лазаренко',
    'about.role': 'Основатель и Мастер-Преподаватель',
    'about.bio': 'Вячеслав Лазаренко — основатель и разработчик системы энергетической практики Инициология. С более чем 25 000 учениками в странах СНГ и глобальным присутствием в ЕС, Китае и США, его работа преобразила жизни тысяч людей. Методология основана на работе с каналами космической энергии, обеспечивая физическое оздоровление, очищение энергетических структур и целостное улучшение жизни. Его исследования и преподавание утвердили Инициологию как признанную энергетическую практику во всем мире.',
    
    // FAQ
    'faq.title': 'Часто задаваемые вопросы',
    'faq.q1': 'Что такое инициология простыми словами?',
    'faq.a1': 'Инициология — это энергетическая практика, направленная на оздоровление и улучшение качества жизни. Метод основан на взаимодействии с энергетическими каналами, по которым идет поток космической энергии. Данные потоки благоприятно влияют на все сферы жизни человека. Через работу с каналами происходит физическое оздоровление, очищение тонких энергетических структур и качественное улучшение всех сфер жизни.',
    'faq.q2': 'Смогу ли я обучиться методу инициологии?',
    'faq.a2': 'Научиться работать с каналами и освоить метод инициологии может любой желающий. Для этого не требуется каких-то особых способностей или талантов. Доступ к энергетическим каналам передается от мастера-преподавателя ученику посредством инициации (настройки, подключения), после чего ученик сразу может приступать к работе с каналами и получать соответствующие результаты. Каналы передаются один раз, и доступ к ним сохраняется на всю жизнь.',
    'faq.q3': 'Чем инициология отличается от других энергетических практик?',
    'faq.a3': 'Инициолог не расходует собственную энергию, работая с проблемами или болезнями. Вся работа ведётся каналами, по которым идёт поток космической энергии. Ресурс канала безграничный. Каналы обеспечивают энергозащиту от переноса болезнетворной информации и негативных программ с пациента на инициолога во время сеансов. Инициология имеет арсенал узконаправленных каналов, целенаправленно работающих с конкретными заболеваниями и видами проблем.',
    
    // Footer
    'footer.about': 'Об Академии',
    'footer.about.desc': 'Международная Академия Инициологии - ведущий исследовательский институт, продвигающий научные знания по всему миру.',
    'footer.quicklinks': 'Быстрые ссылки',
    'footer.research': 'Исследования',
    'footer.education': 'Образование',
    'footer.publications': 'Публикации',
    'footer.resources': 'Ресурсы',
    'footer.books': 'Книги',
    'footer.articles': 'Статьи',
    'footer.platform': 'Доступ к платформе',
    'footer.legal': 'Правовая информация',
    'footer.privacy': 'Политика конфиденциальности',
    'footer.cookies': 'Политика cookie',
    'footer.data': 'Защита данных',
    'footer.terms': 'Условия использования',
    'footer.contact': 'Контакты',
    'footer.address': 'пр. Науки 123, Исследовательский район',
    'footer.email': 'info@initiology-academy.org',
    'footer.phone': '+7 (555) 123-4567',
    'footer.newsletter': 'Подписаться на рассылку',
    'footer.copyright': '© 2024 Международная Академия Инициологии. Все права защищены.',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('language') as Language;
    return saved || 'en';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['en']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
}
