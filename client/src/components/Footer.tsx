import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  const { t } = useLanguage();

  const quickLinks = [
    { label: t('footer.research'), href: '#research' },
    { label: t('footer.education'), href: '#education' },
    { label: t('footer.publications'), href: '#books' },
  ];

  const resources = [
    { label: t('footer.books'), href: '#books' },
    { label: t('footer.articles'), href: '#research' },
    { label: t('footer.platform'), href: '#education' },
  ];

  const legal = [
    { label: t('footer.privacy'), href: '/privacy-policy' },
    { label: t('footer.cookies'), href: '/cookie-policy' },
    { label: t('footer.data'), href: '/data-protection' },
    { label: t('footer.terms'), href: '/terms-of-service' },
  ];

  return (
    <footer className="bg-card border-t">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="mb-12">
          <h3 className="font-serif text-xl font-semibold mb-4">{t('footer.newsletter')}</h3>
          <div className="flex gap-2 max-w-md">
            <Input
              type="email"
              placeholder="Email"
              data-testid="input-newsletter-email"
            />
            <Button data-testid="button-newsletter-subscribe">
              {t('footer.newsletter').split(' ')[0]}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          <div className="lg:col-span-1">
            <h3 className="font-serif text-lg font-semibold mb-4">{t('footer.about')}</h3>
            <p className="text-sm text-muted-foreground">{t('footer.about.desc')}</p>
          </div>

          <div>
            <h3 className="font-serif text-lg font-semibold mb-4">{t('footer.quicklinks')}</h3>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    data-testid={`link-footer-quick-${index}`}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-serif text-lg font-semibold mb-4">{t('footer.resources')}</h3>
            <ul className="space-y-2">
              {resources.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    data-testid={`link-footer-resource-${index}`}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-serif text-lg font-semibold mb-4">{t('footer.legal')}</h3>
            <ul className="space-y-2">
              {legal.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    data-testid={`link-footer-legal-${index}`}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-serif text-lg font-semibold mb-4">{t('footer.contact')}</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>{t('footer.address')}</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4 flex-shrink-0" />
                <a href={`mailto:${t('footer.email')}`} className="hover:text-foreground transition-colors">
                  {t('footer.email')}
                </a>
              </li>
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="h-4 w-4 flex-shrink-0" />
                <a href={`tel:${t('footer.phone')}`} className="hover:text-foreground transition-colors">
                  {t('footer.phone')}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t text-center">
          <p className="text-sm text-muted-foreground">© 1999 - 2025 International Academy of Initiology. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
