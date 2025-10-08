import LanguageSwitcher from '../LanguageSwitcher';
import { LanguageProvider } from '@/contexts/LanguageContext';

export default function LanguageSwitcherExample() {
  return (
    <LanguageProvider>
      <div className="p-4 bg-background">
        <LanguageSwitcher />
      </div>
    </LanguageProvider>
  );
}
