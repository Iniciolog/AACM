import ResearchSection from '../ResearchSection';
import { LanguageProvider } from '@/contexts/LanguageContext';

export default function ResearchSectionExample() {
  return (
    <LanguageProvider>
      <ResearchSection />
    </LanguageProvider>
  );
}
