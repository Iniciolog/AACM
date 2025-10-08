import { useLanguage } from '@/contexts/LanguageContext';
import booksImg from '@assets/generated_images/Academic_books_library_collection_63be86e4.png';

export default function BooksSection() {
  const { t } = useLanguage();

  return (
    <section id="books" className="py-20 md:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4" data-testid="text-books-title">
            {t('books.title')}
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            {t('books.subtitle')}
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div className="rounded-lg overflow-hidden shadow-2xl">
            <img
              src={booksImg}
              alt="Academic Publications"
              className="w-full h-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
