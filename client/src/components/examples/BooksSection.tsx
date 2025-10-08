import BooksSection from '../BooksSection';
import { LanguageProvider } from '@/contexts/LanguageContext';

export default function BooksSectionExample() {
  return (
    <LanguageProvider>
      <BooksSection />
    </LanguageProvider>
  );
}
