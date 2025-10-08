import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';

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

        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-8 bg-card p-8 rounded-lg shadow-xl">
            <div className="md:w-1/3">
              <img
                src="https://store.ridero.ru/images/w350?bucket=yc:store-raw-data.ridero.store&key=ridero/sku/2016-03/56d9304fe13a300600a0f915/rev.2023-08-07T11:31:28.497Z/cover-front.png&format=original"
                alt={t('books.book1.title')}
                className="w-full rounded-lg shadow-lg"
                data-testid="img-book-cover"
              />
            </div>
            
            <div className="md:w-2/3">
              <h3 className="text-3xl font-serif font-bold mb-4" data-testid="text-book-title">
                {t('books.book1.title')}
              </h3>
              <p className="text-lg text-muted-foreground mb-6" data-testid="text-book-desc">
                {t('books.book1.desc')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild data-testid="button-book-electronic">
                  <a href="https://ridero.ru/books/prakticheskaya_iniciologiya/" target="_blank" rel="noopener noreferrer">
                    {t('books.book1.electronic')} - 200₽
                  </a>
                </Button>
                <Button variant="outline" asChild data-testid="button-book-printed">
                  <a href="https://ridero.ru/books/prakticheskaya_iniciologiya/" target="_blank" rel="noopener noreferrer">
                    {t('books.book1.printed')} - 624₽
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
