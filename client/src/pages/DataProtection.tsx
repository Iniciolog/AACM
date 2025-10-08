import { useLanguage } from '@/contexts/LanguageContext';
import { Link } from 'wouter';
import { ArrowLeft } from 'lucide-react';

export default function DataProtection() {
  const { language } = useLanguage();

  const content = {
    en: {
      title: 'Data Protection',
      lastUpdated: 'Last Updated: January 2025',
      sections: [
        {
          heading: '1. Data Processing',
          text: 'We process your personal data in accordance with applicable data protection laws, including GDPR. All data processing is based on legal grounds such as consent, contract performance, or legitimate interests.'
        },
        {
          heading: '2. Data Storage',
          text: 'Your data is stored securely using industry-standard encryption and security measures. We retain your data only for as long as necessary to fulfill the purposes for which it was collected.'
        },
        {
          heading: '3. Data Transfer',
          text: 'If we transfer your data internationally, we ensure appropriate safeguards are in place to protect your information in accordance with data protection regulations.'
        },
        {
          heading: '4. Your Rights Under GDPR',
          text: 'You have the right to access your data, rectify inaccurate data, erase your data, restrict processing, data portability, and object to processing. You also have the right to withdraw consent and lodge a complaint with a supervisory authority.'
        },
        {
          heading: '5. Data Protection Officer',
          text: 'For any data protection inquiries or to exercise your rights, please contact us at initiology@gmail.com'
        }
      ]
    },
    de: {
      title: 'Datenschutz',
      lastUpdated: 'Zuletzt aktualisiert: Januar 2025',
      sections: [
        {
          heading: '1. Datenverarbeitung',
          text: 'Wir verarbeiten Ihre personenbezogenen Daten in Übereinstimmung mit den geltenden Datenschutzgesetzen, einschließlich der DSGVO. Alle Datenverarbeitungen basieren auf Rechtsgrundlagen wie Einwilligung, Vertragserfüllung oder berechtigten Interessen.'
        },
        {
          heading: '2. Datenspeicherung',
          text: 'Ihre Daten werden sicher mit branchenüblichen Verschlüsselungs- und Sicherheitsmaßnahmen gespeichert. Wir bewahren Ihre Daten nur so lange auf, wie es zur Erfüllung der Zwecke erforderlich ist, für die sie erhoben wurden.'
        },
        {
          heading: '3. Datenübertragung',
          text: 'Wenn wir Ihre Daten international übertragen, stellen wir sicher, dass angemessene Schutzmaßnahmen vorhanden sind, um Ihre Informationen in Übereinstimmung mit den Datenschutzbestimmungen zu schützen.'
        },
        {
          heading: '4. Ihre Rechte gemäß DSGVO',
          text: 'Sie haben das Recht auf Zugang zu Ihren Daten, Berichtigung unrichtiger Daten, Löschung Ihrer Daten, Einschränkung der Verarbeitung, Datenübertragbarkeit und Widerspruch gegen die Verarbeitung. Sie haben auch das Recht, die Einwilligung zu widerrufen und Beschwerde bei einer Aufsichtsbehörde einzulegen.'
        },
        {
          heading: '5. Datenschutzbeauftragter',
          text: 'Für Datenschutzanfragen oder zur Ausübung Ihrer Rechte kontaktieren Sie uns bitte unter initiology@gmail.com'
        }
      ]
    },
    ru: {
      title: 'Защита данных',
      lastUpdated: 'Последнее обновление: январь 2025',
      sections: [
        {
          heading: '1. Обработка данных',
          text: 'Мы обрабатываем ваши персональные данные в соответствии с применимым законодательством о защите данных, включая GDPR. Вся обработка данных основана на правовых основаниях, таких как согласие, исполнение договора или законные интересы.'
        },
        {
          heading: '2. Хранение данных',
          text: 'Ваши данные хранятся в безопасности с использованием отраслевых стандартов шифрования и мер безопасности. Мы храним ваши данные только столько, сколько необходимо для целей, для которых они были собраны.'
        },
        {
          heading: '3. Передача данных',
          text: 'Если мы передаем ваши данные на международном уровне, мы обеспечиваем наличие соответствующих мер защиты для защиты вашей информации в соответствии с правилами защиты данных.'
        },
        {
          heading: '4. Ваши права в соответствии с GDPR',
          text: 'Вы имеете право на доступ к своим данным, исправление неточных данных, удаление ваших данных, ограничение обработки, переносимость данных и возражение против обработки. Вы также имеете право отозвать согласие и подать жалобу в надзорный орган.'
        },
        {
          heading: '5. Сотрудник по защите данных',
          text: 'По любым вопросам защиты данных или для реализации ваших прав, пожалуйста, свяжитесь с нами по адресу initiology@gmail.com'
        }
      ]
    }
  };

  const data = content[language] || content.en;

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8">
          <ArrowLeft className="h-4 w-4" />
          Back to Home
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
