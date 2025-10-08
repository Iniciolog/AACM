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
    
    // FAQ
    'faq.title': 'Frequently Asked Questions',
    'faq.q1': 'What is the International Academy of Initiology?',
    'faq.a1': 'We are a leading research institution dedicated to advancing the science of initiology through rigorous research, education, and international collaboration.',
    'faq.q2': 'How can I access your educational resources?',
    'faq.a2': 'Our educational platform offers courses and materials for researchers and practitioners. Contact us for enrollment information.',
    'faq.q3': 'Where is the Academy located?',
    'faq.a3': 'We maintain research facilities and partnerships across the EU, CIS, China, and USA.',
    
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
    
    // FAQ
    'faq.title': 'Häufig gestellte Fragen',
    'faq.q1': 'Was ist die Internationale Akademie für Initiologie?',
    'faq.a1': 'Wir sind eine führende Forschungseinrichtung, die sich der Förderung der Initiologie-Wissenschaft durch rigorose Forschung, Bildung und internationale Zusammenarbeit widmet.',
    'faq.q2': 'Wie kann ich auf Ihre Bildungsressourcen zugreifen?',
    'faq.a2': 'Unsere Bildungsplattform bietet Kurse und Materialien für Forscher und Praktiker. Kontaktieren Sie uns für Informationen zur Einschreibung.',
    'faq.q3': 'Wo befindet sich die Akademie?',
    'faq.a3': 'Wir unterhalten Forschungseinrichtungen und Partnerschaften in der EU, der GUS, China und den USA.',
    
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
    'hero.subtitle': 'Продвижение знаний через передовые исследования и глобальное сотрудничество',
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
    
    // FAQ
    'faq.title': 'Часто задаваемые вопросы',
    'faq.q1': 'Что такое Международная Академия Инициологии?',
    'faq.a1': 'Мы ведущий научно-исследовательский институт, посвящённый развитию науки инициологии через строгие исследования, образование и международное сотрудничество.',
    'faq.q2': 'Как получить доступ к вашим образовательным ресурсам?',
    'faq.a2': 'Наша образовательная платформа предлагает курсы и материалы для исследователей и практиков. Свяжитесь с нами для получения информации о регистрации.',
    'faq.q3': 'Где находится Академия?',
    'faq.a3': 'У нас есть исследовательские центры и партнёрства в ЕС, СНГ, Китае и США.',
    
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
