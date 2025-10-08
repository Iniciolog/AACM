import EducationSection from '../EducationSection';
import { LanguageProvider } from '@/contexts/LanguageContext';

export default function EducationSectionExample() {
  return (
    <LanguageProvider>
      <EducationSection />
    </LanguageProvider>
  );
}
