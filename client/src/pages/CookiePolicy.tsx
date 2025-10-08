import { useLanguage } from '@/contexts/LanguageContext';
import { Link } from 'wouter';
import { ArrowLeft } from 'lucide-react';

export default function CookiePolicy() {
  const { language } = useLanguage();

  const content = {
    en: {
      title: 'Cookie Policy',
      lastUpdated: 'Last Updated: January 2025',
      sections: [
        {
          heading: '1. What Are Cookies',
          text: 'Cookies are small text files that are placed on your device when you visit our website. They help us provide you with a better experience by remembering your preferences and understanding how you use our site.'
        },
        {
          heading: '2. Types of Cookies We Use',
          text: 'We use essential cookies necessary for the website to function, analytics cookies to understand how visitors interact with our website, and preference cookies to remember your settings and choices.'
        },
        {
          heading: '3. How We Use Cookies',
          text: 'Cookies help us improve your browsing experience, analyze site traffic, personalize content, and remember your language and theme preferences.'
        },
        {
          heading: '4. Managing Cookies',
          text: 'You can control and manage cookies through your browser settings. Please note that disabling cookies may affect the functionality of our website.'
        },
        {
          heading: '5. Third-Party Cookies',
          text: 'We may use third-party services that also set cookies on our website. These services help us analyze website usage and improve our services.'
        }
      ]
    },
    de: {
      title: 'Cookie-Richtlinie',
      lastUpdated: 'Zuletzt aktualisiert: Januar 2025',
      sections: [
        {
          heading: '1. Was sind Cookies',
          text: 'Cookies sind kleine Textdateien, die auf Ihrem Gerät abgelegt werden, wenn Sie unsere Website besuchen. Sie helfen uns, Ihnen eine bessere Erfahrung zu bieten, indem sie Ihre Einstellungen speichern und verstehen, wie Sie unsere Website nutzen.'
        },
        {
          heading: '2. Arten von Cookies, die wir verwenden',
          text: 'Wir verwenden essentielle Cookies, die für die Funktion der Website erforderlich sind, Analyse-Cookies, um zu verstehen, wie Besucher mit unserer Website interagieren, und Präferenz-Cookies, um Ihre Einstellungen und Auswahl zu speichern.'
        },
        {
          heading: '3. Wie wir Cookies verwenden',
          text: 'Cookies helfen uns, Ihr Browsing-Erlebnis zu verbessern, den Website-Traffic zu analysieren, Inhalte zu personalisieren und Ihre Sprach- und Themenpräferenzen zu speichern.'
        },
        {
          heading: '4. Cookies verwalten',
          text: 'Sie können Cookies über Ihre Browsereinstellungen steuern und verwalten. Bitte beachten Sie, dass das Deaktivieren von Cookies die Funktionalität unserer Website beeinträchtigen kann.'
        },
        {
          heading: '5. Cookies von Drittanbietern',
          text: 'Wir können Dienste von Drittanbietern nutzen, die ebenfalls Cookies auf unserer Website setzen. Diese Dienste helfen uns, die Website-Nutzung zu analysieren und unsere Dienste zu verbessern.'
        }
      ]
    },
    ru: {
      title: 'Политика использования файлов cookie',
      lastUpdated: 'Последнее обновление: январь 2025',
      sections: [
        {
          heading: '1. Что такое файлы cookie',
          text: 'Файлы cookie - это небольшие текстовые файлы, которые размещаются на вашем устройстве при посещении нашего веб-сайта. Они помогают нам обеспечить вам лучший опыт, запоминая ваши предпочтения и понимая, как вы используете наш сайт.'
        },
        {
          heading: '2. Типы используемых файлов cookie',
          text: 'Мы используем необходимые файлы cookie для функционирования веб-сайта, аналитические файлы cookie для понимания взаимодействия посетителей с нашим сайтом и файлы cookie предпочтений для запоминания ваших настроек и выбора.'
        },
        {
          heading: '3. Как мы используем файлы cookie',
          text: 'Файлы cookie помогают нам улучшать ваш опыт просмотра, анализировать трафик сайта, персонализировать контент и запоминать ваши языковые настройки и настройки темы.'
        },
        {
          heading: '4. Управление файлами cookie',
          text: 'Вы можете контролировать и управлять файлами cookie через настройки вашего браузера. Обратите внимание, что отключение файлов cookie может повлиять на функциональность нашего сайта.'
        },
        {
          heading: '5. Сторонние файлы cookie',
          text: 'Мы можем использовать сторонние сервисы, которые также устанавливают файлы cookie на нашем сайте. Эти сервисы помогают нам анализировать использование сайта и улучшать наши услуги.'
        }
      ]
    }
  };

  const data = content[language] || content.en;

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <Link href="/">
          <a className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </a>
        </Link>

        <h1 className="font-serif text-4xl font-bold mb-4">{data.title}</h1>
        <p className="text-sm text-muted-foreground mb-8">{data.lastUpdated}</p>

        <div className="space-y-6">
          {data.sections.map((section, index) => (
            <div key={index}>
              <h2 className="text-xl font-semibold mb-3">{section.heading}</h2>
              <p className="text-muted-foreground leading-relaxed">{section.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
