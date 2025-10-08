import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import LanguageSwitcher from './LanguageSwitcher';
import ThemeToggle from './ThemeToggle';
import { Button } from '@/components/ui/button';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
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
        isScrolled ? 'bg-background/95 backdrop-blur-md border-b shadow-sm' : 'bg-background/80 backdrop-blur-sm shadow-md'
      }`}
      data-testid="header-main"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          <button
            onClick={() => scrollToSection('hero')}
            className="flex items-center gap-3 hover-elevate rounded-md px-3 py-2"
            data-testid="button-logo"
          >
            <img src={logoImage} alt="Academy Logo" className="h-12 w-12 rounded-md" />
            <div className="hidden md:block">
              <div className="font-serif text-lg font-semibold leading-tight">
                {t('hero.title').split(' ').slice(0, 2).join(' ')}
              </div>
              <div className="font-serif text-sm text-muted-foreground">
                {t('hero.title').split(' ').slice(2).join(' ')}
              </div>
            </div>
          </button>

          <nav className="hidden lg:flex items-center gap-1">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger data-testid="nav-research">
                    {t('nav.research')}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-64 gap-1 p-2">
                      <li>
                        <NavigationMenuLink asChild>
                          <button
                            onClick={() => scrollToSection('research')}
                            className="block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover-elevate w-full text-left"
                            data-testid="nav-articles"
                          >
                            <div className="text-sm font-medium">{t('nav.articles')}</div>
                            <p className="text-xs text-muted-foreground mt-1">
                              Latest research articles
                            </p>
                          </button>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <button
                            onClick={() => scrollToSection('research')}
                            className="block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover-elevate w-full text-left"
                            data-testid="nav-studies"
                          >
                            <div className="text-sm font-medium">{t('nav.studies')}</div>
                            <p className="text-xs text-muted-foreground mt-1">
                              Scientific studies
                            </p>
                          </button>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <button
                            onClick={() => scrollToSection('research')}
                            className="block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover-elevate w-full text-left"
                            data-testid="nav-conclusions"
                          >
                            <div className="text-sm font-medium">{t('nav.conclusions')}</div>
                            <p className="text-xs text-muted-foreground mt-1">
                              Research conclusions
                            </p>
                          </button>
                        </NavigationMenuLink>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <button
                    onClick={() => scrollToSection('education')}
                    className="inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover-elevate active-elevate-2"
                    data-testid="nav-education"
                  >
                    {t('nav.education')}
                  </button>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <button
                    onClick={() => scrollToSection('books')}
                    className="inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover-elevate active-elevate-2"
                    data-testid="nav-books"
                  >
                    {t('nav.books')}
                  </button>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <button
                    onClick={() => scrollToSection('faq')}
                    className="inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover-elevate active-elevate-2"
                    data-testid="nav-faq"
                  >
                    {t('nav.faq')}
                  </button>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
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
