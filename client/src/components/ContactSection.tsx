import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Mail, Phone, MapPin, Globe, Send } from 'lucide-react';

export default function ContactSection() {
  const { language } = useLanguage();

  const content = {
    en: {
      title: 'Contact Us',
      subtitle: 'Get in touch with the International Academy of Initiology',
      methods: [
        {
          icon: Mail,
          title: 'Email',
          value: 'info@iniciolog.ru',
          link: 'mailto:info@iniciolog.ru'
        },
        {
          icon: Phone,
          title: 'Phone',
          value: '+7 (XXX) XXX-XX-XX',
          link: 'tel:+7XXXXXXXXXX'
        },
        {
          icon: Globe,
          title: 'Website',
          value: 'iniciolog.ru',
          link: 'https://iniciolog.ru'
        },
        {
          icon: MapPin,
          title: 'Location',
          value: 'Research Center for Initiology',
          link: null
        }
      ],
      form: {
        title: 'Send us a message',
        namePlaceholder: 'Your name',
        emailPlaceholder: 'Your email',
        messagePlaceholder: 'Your message',
        submit: 'Send Message'
      },
      social: {
        title: 'Follow Us',
        telegram: 'Telegram',
        youtube: 'YouTube',
        vk: 'VKontakte'
      }
    },
    de: {
      title: 'Kontakt',
      subtitle: 'Nehmen Sie Kontakt mit der Internationalen Akademie für Initiologie auf',
      methods: [
        {
          icon: Mail,
          title: 'E-Mail',
          value: 'info@iniciolog.ru',
          link: 'mailto:info@iniciolog.ru'
        },
        {
          icon: Phone,
          title: 'Telefon',
          value: '+7 (XXX) XXX-XX-XX',
          link: 'tel:+7XXXXXXXXXX'
        },
        {
          icon: Globe,
          title: 'Website',
          value: 'iniciolog.ru',
          link: 'https://iniciolog.ru'
        },
        {
          icon: MapPin,
          title: 'Standort',
          value: 'Forschungszentrum für Initiologie',
          link: null
        }
      ],
      form: {
        title: 'Senden Sie uns eine Nachricht',
        namePlaceholder: 'Ihr Name',
        emailPlaceholder: 'Ihre E-Mail',
        messagePlaceholder: 'Ihre Nachricht',
        submit: 'Nachricht senden'
      },
      social: {
        title: 'Folgen Sie uns',
        telegram: 'Telegram',
        youtube: 'YouTube',
        vk: 'VKontakte'
      }
    },
    ru: {
      title: 'Контакты',
      subtitle: 'Свяжитесь с Международной академией инициологии',
      methods: [
        {
          icon: Mail,
          title: 'Email',
          value: 'info@iniciolog.ru',
          link: 'mailto:info@iniciolog.ru'
        },
        {
          icon: Phone,
          title: 'Телефон',
          value: '+7 (XXX) XXX-XX-XX',
          link: 'tel:+7XXXXXXXXXX'
        },
        {
          icon: Globe,
          title: 'Сайт',
          value: 'iniciolog.ru',
          link: 'https://iniciolog.ru'
        },
        {
          icon: MapPin,
          title: 'Адрес',
          value: 'Научно-исследовательский центр инициологии',
          link: null
        }
      ],
      form: {
        title: 'Отправьте нам сообщение',
        namePlaceholder: 'Ваше имя',
        emailPlaceholder: 'Ваш email',
        messagePlaceholder: 'Ваше сообщение',
        submit: 'Отправить сообщение'
      },
      social: {
        title: 'Следите за нами',
        telegram: 'Telegram',
        youtube: 'YouTube',
        vk: 'ВКонтакте'
      }
    }
  };

  const data = content[language] || content.en;

  return (
    <section id="contact" className="py-20 md:py-32 bg-card">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4" data-testid="text-contact-title">
            {data.title}
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            {data.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h3 className="text-2xl font-bold mb-6" data-testid="text-contact-methods">
              {data.methods[0].title.includes('Email') ? 'Contact Information' : 'Kontaktinformation'}
            </h3>
            <div className="space-y-4 mb-8">
              {data.methods.map((method, index) => {
                const Icon = method.icon;
                return (
                  <Card key={index} data-testid={`card-contact-${index}`}>
                    <CardContent className="flex items-center gap-4 p-4">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-muted-foreground">{method.title}</p>
                        {method.link ? (
                          <a 
                            href={method.link} 
                            className="font-medium hover:text-primary transition-colors"
                            data-testid={`link-contact-${index}`}
                          >
                            {method.value}
                          </a>
                        ) : (
                          <p className="font-medium">{method.value}</p>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            <Card>
              <CardHeader>
                <CardTitle>{data.social.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-3">
                  <Button variant="outline" size="sm" data-testid="button-telegram">
                    {data.social.telegram}
                  </Button>
                  <Button variant="outline" size="sm" data-testid="button-youtube">
                    {data.social.youtube}
                  </Button>
                  <Button variant="outline" size="sm" data-testid="button-vk">
                    {data.social.vk}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl" data-testid="text-form-title">
                {data.form.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div>
                  <input
                    type="text"
                    placeholder={data.form.namePlaceholder}
                    className="w-full px-4 py-2 rounded-md border bg-background"
                    data-testid="input-name"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    placeholder={data.form.emailPlaceholder}
                    className="w-full px-4 py-2 rounded-md border bg-background"
                    data-testid="input-email"
                  />
                </div>
                <div>
                  <textarea
                    placeholder={data.form.messagePlaceholder}
                    rows={5}
                    className="w-full px-4 py-2 rounded-md border bg-background resize-none"
                    data-testid="input-message"
                  />
                </div>
                <Button className="w-full" data-testid="button-submit">
                  <Send className="w-4 h-4 mr-2" />
                  {data.form.submit}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
