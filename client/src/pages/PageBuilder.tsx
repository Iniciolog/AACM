import { useState, useEffect } from 'react';
import { useLocation, useRoute } from 'wouter';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useLanguage } from '@/contexts/LanguageContext';
import { useEditMode } from '@/contexts/EditModeContext';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, Save, Trash2, FileText, Image, ArrowLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { apiRequest, queryClient } from '@/lib/queryClient';

interface PageBlock {
  id: string;
  type: 'text' | 'image' | 'heading';
  content: string;
}

const cyrillicToLatin: Record<string, string> = {
  'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd', 'е': 'e', 'ё': 'yo', 'ж': 'zh',
  'з': 'z', 'и': 'i', 'й': 'y', 'к': 'k', 'л': 'l', 'м': 'm', 'н': 'n', 'о': 'o',
  'п': 'p', 'р': 'r', 'с': 's', 'т': 't', 'у': 'u', 'ф': 'f', 'х': 'kh', 'ц': 'ts',
  'ч': 'ch', 'ш': 'sh', 'щ': 'shch', 'ъ': '', 'ы': 'y', 'ь': '', 'э': 'e', 'ю': 'yu', 'я': 'ya',
};

function transliterateToSlug(text: string): string {
  const lower = text.toLowerCase();
  let result = '';
  for (const char of lower) {
    if (cyrillicToLatin[char] !== undefined) {
      result += cyrillicToLatin[char];
    } else if (/[a-z0-9]/.test(char)) {
      result += char;
    } else if (/[\s\-_]/.test(char)) {
      result += '-';
    }
  }
  result = result.replace(/-+/g, '-').replace(/^-|-$/g, '');
  return result || `page-${Date.now()}`;
}

interface Page {
  id: string;
  slug: string;
  title: string;
  language: string;
  content: string;
  includeHeader: string;
  includeHero: string;
  createdAt: string;
  updatedAt: string;
}

export default function PageBuilder() {
  const [, params] = useRoute('/page/:slug');
  const [, navigate] = useLocation();
  const { language } = useLanguage();
  const { isEditMode } = useEditMode();
  const { toast } = useToast();
  const slug = params?.slug;

  const [blocks, setBlocks] = useState<PageBlock[]>([]);
  const [includeHeader, setIncludeHeader] = useState(true);
  const [includeHero, setIncludeHero] = useState(true);
  const [pageTitle, setPageTitle] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const { data: page, isLoading } = useQuery<Page>({
    queryKey: ['/api/pages', slug],
    enabled: !!slug && slug !== 'new',
  });

  useEffect(() => {
    if (page) {
      setPageTitle(page.title);
      setIncludeHeader(page.includeHeader === 'true');
      setIncludeHero(page.includeHero === 'true');
      try {
        setBlocks(JSON.parse(page.content));
      } catch {
        setBlocks([]);
      }
    }
  }, [page]);

  const saveMutation = useMutation({
    mutationFn: async () => {
      const data = {
        slug: slug === 'new' ? transliterateToSlug(pageTitle) : slug,
        title: pageTitle,
        language,
        content: JSON.stringify(blocks),
        includeHeader: includeHeader ? 'true' : 'false',
        includeHero: includeHero ? 'true' : 'false',
      };

      if (slug === 'new') {
        return apiRequest('POST', '/api/pages', data);
      } else {
        return apiRequest('PUT', `/api/pages/${slug}`, data);
      }
    },
    onSuccess: async () => {
      toast({ title: 'Сохранено', description: 'Страница успешно сохранена' });
      queryClient.invalidateQueries({ queryKey: ['/api/pages'] });
      if (slug === 'new') {
        const newSlug = transliterateToSlug(pageTitle);
        navigate(`/page/${newSlug}`);
      }
    },
    onError: () => {
      toast({ title: 'Ошибка', description: 'Не удалось сохранить страницу', variant: 'destructive' });
    },
  });

  const addBlock = (type: PageBlock['type']) => {
    const newBlock: PageBlock = {
      id: Date.now().toString(),
      type,
      content: type === 'heading' ? 'Новый заголовок' : type === 'text' ? 'Новый текстовый блок' : '',
    };
    setBlocks([...blocks, newBlock]);
  };

  const updateBlock = (id: string, content: string) => {
    setBlocks(blocks.map(b => b.id === id ? { ...b, content } : b));
  };

  const deleteBlock = (id: string) => {
    setBlocks(blocks.filter(b => b.id !== id));
  };

  const handleSave = () => {
    if (!pageTitle) {
      toast({ title: 'Ошибка', description: 'Введите название страницы', variant: 'destructive' });
      return;
    }
    saveMutation.mutate();
  };

  if (isLoading && slug !== 'new') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {includeHeader && <Header />}
      {includeHero && <HeroSection />}

      <div className="max-w-4xl mx-auto px-6 py-12">
        {isEditMode && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Настройки страницы</span>
                <Button onClick={() => navigate('/')} variant="outline" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  На главную
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Название страницы</Label>
                <Input
                  value={pageTitle}
                  onChange={(e) => setPageTitle(e.target.value)}
                  placeholder="Название страницы"
                  data-testid="input-page-title"
                />
              </div>

              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <Switch
                    checked={includeHeader}
                    onCheckedChange={setIncludeHeader}
                    data-testid="switch-include-header"
                  />
                  <Label>Показывать меню</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Switch
                    checked={includeHero}
                    onCheckedChange={setIncludeHero}
                    data-testid="switch-include-hero"
                  />
                  <Label>Показывать обложку</Label>
                </div>
              </div>

              <div className="flex gap-2 pt-4 border-t">
                <Button onClick={() => addBlock('heading')} variant="outline" size="sm" data-testid="button-add-heading">
                  <FileText className="w-4 h-4 mr-2" />
                  + Заголовок
                </Button>
                <Button onClick={() => addBlock('text')} variant="outline" size="sm" data-testid="button-add-text">
                  <FileText className="w-4 h-4 mr-2" />
                  + Текст
                </Button>
                <Button onClick={() => addBlock('image')} variant="outline" size="sm" data-testid="button-add-image">
                  <Image className="w-4 h-4 mr-2" />
                  + Изображение
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="space-y-6">
          {blocks.map((block) => (
            <Card key={block.id} className="relative group">
              <CardContent className="p-6">
                {isEditMode && (
                  <Button
                    variant="destructive"
                    size="icon"
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => deleteBlock(block.id)}
                    data-testid={`button-delete-block-${block.id}`}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                )}

                {block.type === 'heading' && (
                  isEditMode ? (
                    <Input
                      value={block.content}
                      onChange={(e) => updateBlock(block.id, e.target.value)}
                      className="text-2xl font-serif font-bold"
                      data-testid={`input-heading-${block.id}`}
                    />
                  ) : (
                    <h2 className="text-2xl font-serif font-bold">{block.content}</h2>
                  )
                )}

                {block.type === 'text' && (
                  isEditMode ? (
                    <Textarea
                      value={block.content}
                      onChange={(e) => updateBlock(block.id, e.target.value)}
                      className="min-h-[100px]"
                      data-testid={`input-text-${block.id}`}
                    />
                  ) : (
                    <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">{block.content}</p>
                  )
                )}

                {block.type === 'image' && (
                  isEditMode ? (
                    <div className="space-y-2">
                      <Input
                        value={block.content}
                        onChange={(e) => updateBlock(block.id, e.target.value)}
                        placeholder="URL изображения"
                        data-testid={`input-image-url-${block.id}`}
                      />
                      {block.content && (
                        <img src={block.content} alt="Preview" className="max-w-full h-auto rounded-lg" />
                      )}
                    </div>
                  ) : (
                    block.content && <img src={block.content} alt="" className="max-w-full h-auto rounded-lg" />
                  )
                )}
              </CardContent>
            </Card>
          ))}

          {blocks.length === 0 && !isEditMode && (
            <div className="text-center py-12 text-muted-foreground">
              Эта страница пуста
            </div>
          )}
        </div>

        {isEditMode && (
          <div className="fixed bottom-6 right-6 z-50">
            <Button
              onClick={handleSave}
              disabled={saveMutation.isPending}
              size="lg"
              data-testid="button-save-page"
            >
              <Save className="w-5 h-5 mr-2" />
              {saveMutation.isPending ? 'Сохранение...' : 'Сохранить страницу'}
            </Button>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
