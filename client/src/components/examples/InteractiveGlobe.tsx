import InteractiveGlobe from '../InteractiveGlobe';
import { LanguageProvider } from '@/contexts/LanguageContext';

export default function InteractiveGlobeExample() {
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-background flex items-center justify-center p-8">
        <InteractiveGlobe />
      </div>
    </LanguageProvider>
  );
}
