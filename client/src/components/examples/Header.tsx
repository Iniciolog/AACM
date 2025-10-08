import Header from '../Header';
import { LanguageProvider } from '@/contexts/LanguageContext';

export default function HeaderExample() {
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-32 px-6">
          <p className="text-muted-foreground">Scroll to see header background change</p>
        </div>
      </div>
    </LanguageProvider>
  );
}
