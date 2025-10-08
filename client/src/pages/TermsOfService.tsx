import { useLanguage } from '@/contexts/LanguageContext';
import { Link } from 'wouter';
import { ArrowLeft } from 'lucide-react';

export default function TermsOfService() {
  const { language } = useLanguage();

  const content = {
    en: {
      title: 'Terms of Service',
      lastUpdated: 'Last Updated: January 2025',
      sections: [
        {
          heading: '1. Acceptance of Terms',
          text: 'By accessing and using our services, you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.'
        },
        {
          heading: '2. Use of Services',
          text: 'You agree to use our services only for lawful purposes and in accordance with these terms. You are responsible for maintaining the confidentiality of your account information.'
        },
        {
          heading: '3. Intellectual Property',
          text: 'All content, trademarks, and intellectual property on our website are owned by or licensed to us. You may not use, reproduce, or distribute any content without our prior written permission.'
        },
        {
          heading: '4. Limitation of Liability',
          text: 'We provide our services "as is" without warranties of any kind. We shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of our services.'
        },
        {
          heading: '5. Modifications to Terms',
          text: 'We reserve the right to modify these terms at any time. Continued use of our services after changes constitutes acceptance of the modified terms.'
        },
        {
          heading: '6. Governing Law',
          text: 'These terms shall be governed by and construed in accordance with applicable laws, without regard to conflict of law provisions.'
        },
        {
          heading: '7. Contact Information',
          text: 'If you have any questions about these Terms of Service, please contact us at initiology@gmail.com'
        }
      ]
    },
    de: {
      title: 'Nutzungsbedingungen',
      lastUpdated: 'Zuletzt aktualisiert: Januar 2025',
      sections: [
        {
          heading: '1. Annahme der Bedingungen',
          text: 'Durch den Zugriff auf und die Nutzung unserer Dienste akzeptieren Sie diese Nutzungsbedingungen und erklären sich damit einverstanden, an sie gebunden zu sein. Wenn Sie diesen Bedingungen nicht zustimmen, verwenden Sie bitte unsere Dienste nicht.'
        },
        {
          heading: '2. Nutzung der Dienste',
          text: 'Sie verpflichten sich, unsere Dienste nur für rechtmäßige Zwecke und in Übereinstimmung mit diesen Bedingungen zu nutzen. Sie sind für die Vertraulichkeit Ihrer Kontoinformationen verantwortlich.'
        },
        {
          heading: '3. Geistiges Eigentum',
          text: 'Alle Inhalte, Marken und geistiges Eigentum auf unserer Website gehören uns oder sind an uns lizenziert. Sie dürfen keine Inhalte ohne unsere vorherige schriftliche Genehmigung verwenden, reproduzieren oder verbreiten.'
        },
        {
          heading: '4. Haftungsbeschränkung',
          text: 'Wir stellen unsere Dienste "wie besehen" ohne jegliche Garantien bereit. Wir haften nicht für indirekte, zufällige, besondere oder Folgeschäden, die sich aus Ihrer Nutzung unserer Dienste ergeben.'
        },
        {
          heading: '5. Änderungen der Bedingungen',
          text: 'Wir behalten uns das Recht vor, diese Bedingungen jederzeit zu ändern. Die fortgesetzte Nutzung unserer Dienste nach Änderungen stellt die Annahme der geänderten Bedingungen dar.'
        },
        {
          heading: '6. Anwendbares Recht',
          text: 'Diese Bedingungen unterliegen den anwendbaren Gesetzen und werden in Übereinstimmung mit diesen ausgelegt, ohne Berücksichtigung von Kollisionsnormen.'
        },
        {
          heading: '7. Kontaktinformationen',
          text: 'Wenn Sie Fragen zu diesen Nutzungsbedingungen haben, kontaktieren Sie uns bitte unter initiology@gmail.com'
        }
      ]
    },
    ru: {
      title: 'Условия использования',
      lastUpdated: 'Последнее обновление: январь 2025',
      sections: [
        {
          heading: '1. Принятие условий',
          text: 'Получая доступ и используя наши услуги, вы принимаете и соглашаетесь соблюдать эти Условия использования. Если вы не согласны с этими условиями, пожалуйста, не используйте наши услуги.'
        },
        {
          heading: '2. Использование услуг',
          text: 'Вы соглашаетесь использовать наши услуги только в законных целях и в соответствии с этими условиями. Вы несете ответственность за сохранение конфиденциальности информации вашей учетной записи.'
        },
        {
          heading: '3. Интеллектуальная собственность',
          text: 'Весь контент, товарные знаки и интеллектуальная собственность на нашем веб-сайте принадлежат нам или лицензированы нам. Вы не можете использовать, воспроизводить или распространять любой контент без нашего предварительного письменного разрешения.'
        },
        {
          heading: '4. Ограничение ответственности',
          text: 'Мы предоставляем наши услуги "как есть" без каких-либо гарантий. Мы не несем ответственности за любые косвенные, случайные, специальные или косвенные убытки, возникающие в результате использования вами наших услуг.'
        },
        {
          heading: '5. Изменения условий',
          text: 'Мы оставляем за собой право изменять эти условия в любое время. Продолжение использования наших услуг после изменений означает принятие измененных условий.'
        },
        {
          heading: '6. Применимое право',
          text: 'Эти условия регулируются и толкуются в соответствии с применимым законодательством, без учета коллизионных норм.'
        },
        {
          heading: '7. Контактная информация',
          text: 'Если у вас есть вопросы об этих Условиях использования, свяжитесь с нами по адресу initiology@gmail.com'
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
