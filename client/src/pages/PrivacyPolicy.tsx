import { useLanguage } from '@/contexts/LanguageContext';
import { Link } from 'wouter';
import { ArrowLeft } from 'lucide-react';

export default function PrivacyPolicy() {
  const { language } = useLanguage();

  const content = {
    en: {
      title: 'Privacy Policy',
      lastUpdated: 'Last Updated: January 2025',
      sections: [
        {
          heading: '1. Information We Collect',
          text: 'We collect information that you provide directly to us, including name, email address, and any other information you choose to provide when using our services or contacting us.'
        },
        {
          heading: '2. How We Use Your Information',
          text: 'We use the information we collect to provide, maintain, and improve our services, to communicate with you, and to comply with legal obligations.'
        },
        {
          heading: '3. Information Sharing',
          text: 'We do not sell or rent your personal information to third parties. We may share your information only with your consent or as required by law.'
        },
        {
          heading: '4. Data Security',
          text: 'We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.'
        },
        {
          heading: '5. Your Rights',
          text: 'You have the right to access, correct, or delete your personal information. You may also object to or restrict certain processing of your data.'
        },
        {
          heading: '6. Contact Us',
          text: 'If you have any questions about this Privacy Policy, please contact us at initiology@gmail.com'
        }
      ]
    },
    de: {
      title: 'Datenschutzerklärung',
      lastUpdated: 'Zuletzt aktualisiert: Januar 2025',
      sections: [
        {
          heading: '1. Von uns erfasste Informationen',
          text: 'Wir erfassen Informationen, die Sie uns direkt zur Verfügung stellen, einschließlich Name, E-Mail-Adresse und alle anderen Informationen, die Sie bei der Nutzung unserer Dienste oder bei der Kontaktaufnahme mit uns angeben.'
        },
        {
          heading: '2. Wie wir Ihre Informationen verwenden',
          text: 'Wir verwenden die von uns erfassten Informationen, um unsere Dienste bereitzustellen, zu pflegen und zu verbessern, um mit Ihnen zu kommunizieren und um rechtliche Verpflichtungen zu erfüllen.'
        },
        {
          heading: '3. Weitergabe von Informationen',
          text: 'Wir verkaufen oder vermieten Ihre persönlichen Daten nicht an Dritte. Wir geben Ihre Informationen nur mit Ihrer Zustimmung oder wie gesetzlich vorgeschrieben weiter.'
        },
        {
          heading: '4. Datensicherheit',
          text: 'Wir implementieren angemessene technische und organisatorische Maßnahmen zum Schutz Ihrer persönlichen Daten vor unbefugtem Zugriff, Änderung, Offenlegung oder Zerstörung.'
        },
        {
          heading: '5. Ihre Rechte',
          text: 'Sie haben das Recht, auf Ihre persönlichen Daten zuzugreifen, sie zu korrigieren oder zu löschen. Sie können auch gegen bestimmte Verarbeitungen Ihrer Daten Einspruch erheben oder diese einschränken.'
        },
        {
          heading: '6. Kontakt',
          text: 'Wenn Sie Fragen zu dieser Datenschutzerklärung haben, kontaktieren Sie uns bitte unter initiology@gmail.com'
        }
      ]
    },
    ru: {
      title: 'Политика конфиденциальности',
      lastUpdated: 'Последнее обновление: январь 2025',
      sections: [
        {
          heading: '1. Информация, которую мы собираем',
          text: 'Мы собираем информацию, которую вы предоставляете нам напрямую, включая имя, адрес электронной почты и любую другую информацию, которую вы решите предоставить при использовании наших услуг или связи с нами.'
        },
        {
          heading: '2. Как мы используем вашу информацию',
          text: 'Мы используем собранную информацию для предоставления, поддержки и улучшения наших услуг, для связи с вами и для выполнения юридических обязательств.'
        },
        {
          heading: '3. Обмен информацией',
          text: 'Мы не продаем и не сдаем в аренду вашу персональную информацию третьим лицам. Мы можем делиться вашей информацией только с вашего согласия или по требованию закона.'
        },
        {
          heading: '4. Безопасность данных',
          text: 'Мы применяем соответствующие технические и организационные меры для защиты вашей персональной информации от несанкционированного доступа, изменения, раскрытия или уничтожения.'
        },
        {
          heading: '5. Ваши права',
          text: 'Вы имеете право на доступ, исправление или удаление вашей персональной информации. Вы также можете возражать против определенной обработки ваших данных или ограничивать её.'
        },
        {
          heading: '6. Свяжитесь с нами',
          text: 'Если у вас есть вопросы по этой Политике конфиденциальности, свяжитесь с нами по адресу initiology@gmail.com'
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
