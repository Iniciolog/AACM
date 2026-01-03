import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import LanguageSwitcher from './LanguageSwitcher';
import ThemeToggle from './ThemeToggle';
import logoImage from '@assets/academy-logo.jpeg';
import { Menu } from 'lucide-react';

export default function Header() {
  const { t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      data-testid="header-main"
    >
      <div className={`max-w-7xl mx-auto px-6 transition-all duration-300 ${
        isScrolled ? 'bg-[#0c317d]/90 backdrop-blur-md shadow-md' : 'bg-[#0062f230]'
      }`}>
        <div className="flex items-center justify-between h-20">
          <a
            href="/"
            className="flex items-center gap-3 hover-elevate rounded-md px-3 py-2"
            data-testid="link-logo"
          >
            <img src={logoImage} alt="Academy Logo" className="h-12 w-12 rounded-md" />
            <div className="hidden md:block">
              <div className="font-serif text-violet-100 text-left font-medium text-[14px] leading-tight max-w-[280px]">
                {t('hero.title')}
              </div>
            </div>
          </a>

          <nav className="hidden lg:flex items-center" style={{ gap: '4px' }}>
            <button
              onClick={() => scrollToSection('about-system')}
              className="inline-flex h-9 items-center justify-center rounded-md px-3 py-2 text-sm font-medium text-white transition-colors hover-elevate active-elevate-2 whitespace-nowrap"
              style={{ marginRight: '4px' }}
              data-testid="nav-about-system"
            >
              {t('nav.aboutSystem')}
            </button>

            <button
              onClick={() => scrollToSection('education-program')}
              className="inline-flex h-9 items-center justify-center rounded-md px-3 py-2 text-sm font-medium text-white transition-colors hover-elevate active-elevate-2 whitespace-nowrap"
              style={{ marginRight: '4px' }}
              data-testid="nav-program"
            >
              {t('nav.program')}
            </button>

            <button
              onClick={() => scrollToSection('channels')}
              className="inline-flex h-9 items-center justify-center rounded-md px-3 py-2 text-sm font-medium text-white transition-colors hover-elevate active-elevate-2 whitespace-nowrap"
              style={{ marginRight: '4px' }}
              data-testid="nav-channels"
            >
              {t('nav.channels')}
            </button>

            <button
              onClick={() => scrollToSection('services')}
              className="inline-flex h-9 items-center justify-center rounded-md px-3 py-2 text-sm font-medium text-white transition-colors hover-elevate active-elevate-2 whitespace-nowrap"
              style={{ marginRight: '4px' }}
              data-testid="nav-services"
            >
              {t('nav.services')}
            </button>

            <a
              href="/awards"
              className="inline-flex h-9 items-center justify-center rounded-md px-3 py-2 text-sm font-medium text-white transition-colors hover-elevate active-elevate-2 whitespace-nowrap"
              style={{ marginRight: '4px' }}
              data-testid="nav-awards"
            >
              {t('nav.awards')}
            </a>

            <button
              onClick={() => scrollToSection('about')}
              className="inline-flex h-9 items-center justify-center rounded-md px-3 py-2 text-sm font-medium text-white transition-colors hover-elevate active-elevate-2 whitespace-nowrap"
              style={{ marginRight: '4px' }}
              data-testid="nav-founder"
            >
              {t('nav.founder')}
            </button>

            <button
              onClick={() => scrollToSection('faq')}
              className="inline-flex h-9 items-center justify-center rounded-md px-3 py-2 text-sm font-medium text-white transition-colors hover-elevate active-elevate-2 whitespace-nowrap"
              data-testid="nav-faq"
            >
              {t('nav.faq')}
            </button>
          </nav>

          <div className="flex items-center gap-2">
            <div className="lg:hidden relative group">
              <button
                className="inline-flex h-9 w-9 items-center justify-center rounded-md text-white hover-elevate active-elevate-2"
                data-testid="button-mobile-menu"
              >
                <Menu className="h-5 w-5" />
              </button>
              
              <div className="absolute right-0 top-full mt-2 w-48 bg-card border rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="py-2">
                  <button
                    onClick={() => scrollToSection('about-system')}
                    className="w-full text-left px-4 py-2 text-sm hover-elevate"
                    data-testid="mobile-nav-about-system"
                  >
                    {t('nav.aboutSystem')}
                  </button>
                  <button
                    onClick={() => scrollToSection('education-program')}
                    className="w-full text-left px-4 py-2 text-sm hover-elevate"
                    data-testid="mobile-nav-program"
                  >
                    {t('nav.program')}
                  </button>
                  <button
                    onClick={() => scrollToSection('channels')}
                    className="w-full text-left px-4 py-2 text-sm hover-elevate"
                    data-testid="mobile-nav-channels"
                  >
                    {t('nav.channels')}
                  </button>
                  <button
                    onClick={() => scrollToSection('services')}
                    className="w-full text-left px-4 py-2 text-sm hover-elevate"
                    data-testid="mobile-nav-services"
                  >
                    {t('nav.services')}
                  </button>
                  <a
                    href="/awards"
                    className="block px-4 py-2 text-sm hover-elevate"
                    data-testid="mobile-nav-awards"
                  >
                    {t('nav.awards')}
                  </a>
                  <button
                    onClick={() => scrollToSection('about')}
                    className="w-full text-left px-4 py-2 text-sm hover-elevate"
                    data-testid="mobile-nav-founder"
                  >
                    {t('nav.founder')}
                  </button>
                  <button
                    onClick={() => scrollToSection('faq')}
                    className="w-full text-left px-4 py-2 text-sm hover-elevate"
                    data-testid="mobile-nav-faq"
                  >
                    {t('nav.faq')}
                  </button>
                </div>
              </div>
            </div>
            
            <LanguageSwitcher />
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}
