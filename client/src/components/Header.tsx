import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import LanguageSwitcher from './LanguageSwitcher';
import ThemeToggle from './ThemeToggle';
import logoImage from '@assets/academy-logo.jpeg';

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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/90 dark:bg-background/95 backdrop-blur-md border-b shadow-sm' : 'bg-white/70 dark:bg-background/70 backdrop-blur-sm shadow-md'
      }`}
      data-testid="header-main"
    >
      <div className="max-w-7xl mx-auto px-6 bg-[#0062f230]">
        <div className="flex items-center justify-between h-20">
          <button
            onClick={() => scrollToSection('hero')}
            className="flex items-center gap-3 hover-elevate rounded-md px-3 py-2"
            data-testid="button-logo"
          >
            <img src={logoImage} alt="Academy Logo" className="h-12 w-12 rounded-md" />
            <div className="hidden md:block">
              <div className="font-serif text-[#0c317d] text-center font-medium mt-[0px] mb-[0px] text-[12px]">
                {t('hero.title')}
              </div>
            </div>
          </button>

          <nav className="hidden lg:flex items-center gap-1">
            <button
              onClick={() => scrollToSection('research')}
              className="inline-flex h-9 items-center justify-center rounded-md px-3 py-2 text-sm font-medium transition-colors hover-elevate active-elevate-2"
              data-testid="nav-research"
            >
              {t('nav.research')}
            </button>
            
            <button
              onClick={() => scrollToSection('education')}
              className="inline-flex h-9 items-center justify-center rounded-md px-3 py-2 text-sm font-medium transition-colors hover-elevate active-elevate-2"
              data-testid="nav-education"
            >
              {t('nav.education')}
            </button>

            <button
              onClick={() => scrollToSection('books')}
              className="inline-flex h-9 items-center justify-center rounded-md px-3 py-2 text-sm font-medium transition-colors hover-elevate active-elevate-2"
              data-testid="nav-books"
            >
              {t('nav.books')}
            </button>

            <button
              onClick={() => scrollToSection('channels')}
              className="inline-flex h-9 items-center justify-center rounded-md px-3 py-2 text-sm font-medium transition-colors hover-elevate active-elevate-2"
              data-testid="nav-channels"
            >
              {t('nav.channels')}
            </button>

            <button
              onClick={() => scrollToSection('services')}
              className="inline-flex h-9 items-center justify-center rounded-md px-3 py-2 text-sm font-medium transition-colors hover-elevate active-elevate-2"
              data-testid="nav-services"
            >
              {t('nav.services')}
            </button>

            <button
              onClick={() => scrollToSection('rmt')}
              className="inline-flex h-9 items-center justify-center rounded-md px-3 py-2 text-sm font-medium transition-colors hover-elevate active-elevate-2"
              data-testid="nav-rmt"
            >
              {t('nav.rmt')}
            </button>

            <button
              onClick={() => scrollToSection('faq')}
              className="inline-flex h-9 items-center justify-center rounded-md px-3 py-2 text-sm font-medium transition-colors hover-elevate active-elevate-2"
              data-testid="nav-faq"
            >
              {t('nav.faq')}
            </button>

            <button
              onClick={() => scrollToSection('contact')}
              className="inline-flex h-9 items-center justify-center rounded-md px-3 py-2 text-sm font-medium transition-colors hover-elevate active-elevate-2"
              data-testid="nav-contact"
            >
              {t('nav.contact')}
            </button>

            <button
              onClick={() => scrollToSection('about')}
              className="inline-flex h-9 items-center justify-center rounded-md px-3 py-2 text-sm font-medium transition-colors hover-elevate active-elevate-2"
              data-testid="nav-about"
            >
              {t('nav.about')}
            </button>
          </nav>

          <div className="flex items-center gap-2">
            <LanguageSwitcher />
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}
