import FAQSection from '../FAQSection';
import { LanguageProvider } from '@/contexts/LanguageContext';

export default function FAQSectionExample() {
  return (
    <LanguageProvider>
      <FAQSection />
    </LanguageProvider>
  );
}
