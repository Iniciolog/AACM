import { useState, useEffect, useRef, useCallback } from 'react';
import { X, Type, Image, Link2, Trash2, Save, Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useEditMode } from '@/contexts/EditModeContext';
import { useToast } from '@/hooks/use-toast';

interface EditableElement {
  element: HTMLElement;
  type: 'text' | 'image' | 'button' | 'link';
  originalContent: string;
  originalStyles: CSSStyleDeclaration;
}

export function VisualEditor() {
  const { isEditMode } = useEditMode();
  const { toast } = useToast();
  const [selectedElement, setSelectedElement] = useState<EditableElement | null>(null);
  const [editPanel, setEditPanel] = useState<{ x: number; y: number } | null>(null);
  const [textContent, setTextContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [linkUrl, setLinkUrl] = useState('');
  const [fontSize, setFontSize] = useState('');
  const [fontColor, setFontColor] = useState('');
  const highlightRef = useRef<HTMLDivElement | null>(null);

  const getElementType = (el: HTMLElement): 'text' | 'image' | 'button' | 'link' => {
    if (el.tagName === 'IMG') return 'image';
    if (el.tagName === 'A') return 'link';
    if (el.tagName === 'BUTTON' || el.closest('button')) return 'button';
    return 'text';
  };

  const handleElementClick = useCallback((e: MouseEvent) => {
    if (!isEditMode) return;
    
    const target = e.target as HTMLElement;
    
    if (target.closest('[data-editor-panel]') || target.closest('[data-admin-panel]')) {
      return;
    }

    e.preventDefault();
    e.stopPropagation();

    const editableElement: EditableElement = {
      element: target,
      type: getElementType(target),
      originalContent: target.tagName === 'IMG' ? (target as HTMLImageElement).src : target.textContent || '',
      originalStyles: window.getComputedStyle(target),
    };

    setSelectedElement(editableElement);
    
    if (editableElement.type === 'text' || editableElement.type === 'button') {
      setTextContent(target.textContent || '');
    }
    if (editableElement.type === 'image') {
      setImageUrl((target as HTMLImageElement).src);
    }
    if (editableElement.type === 'link') {
      setLinkUrl((target as HTMLAnchorElement).href);
      setTextContent(target.textContent || '');
    }

    const computedStyle = window.getComputedStyle(target);
    setFontSize(computedStyle.fontSize);
    setFontColor(computedStyle.color);

    const rect = target.getBoundingClientRect();
    setEditPanel({
      x: Math.min(rect.right + 10, window.innerWidth - 350),
      y: Math.max(rect.top, 10),
    });

    target.style.outline = '2px solid hsl(220, 90%, 56%)';
    target.style.outlineOffset = '2px';
  }, [isEditMode]);

  const handleMouseOver = useCallback((e: MouseEvent) => {
    if (!isEditMode) return;
    
    const target = e.target as HTMLElement;
    
    if (target.closest('[data-editor-panel]') || target.closest('[data-admin-panel]')) {
      return;
    }

    if (selectedElement?.element !== target) {
      target.style.outline = '1px dashed hsl(220, 70%, 50%)';
      target.style.cursor = 'pointer';
    }
  }, [isEditMode, selectedElement]);

  const handleMouseOut = useCallback((e: MouseEvent) => {
    if (!isEditMode) return;
    
    const target = e.target as HTMLElement;
    
    if (selectedElement?.element !== target) {
      target.style.outline = '';
      target.style.cursor = '';
    }
  }, [isEditMode, selectedElement]);

  useEffect(() => {
    if (isEditMode) {
      document.addEventListener('click', handleElementClick, true);
      document.addEventListener('mouseover', handleMouseOver);
      document.addEventListener('mouseout', handleMouseOut);
    }

    return () => {
      document.removeEventListener('click', handleElementClick, true);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
    };
  }, [isEditMode, handleElementClick, handleMouseOver, handleMouseOut]);

  const closePanel = () => {
    if (selectedElement) {
      selectedElement.element.style.outline = '';
      selectedElement.element.style.outlineOffset = '';
    }
    setSelectedElement(null);
    setEditPanel(null);
  };

  const applyTextChange = () => {
    if (selectedElement && (selectedElement.type === 'text' || selectedElement.type === 'button' || selectedElement.type === 'link')) {
      selectedElement.element.textContent = textContent;
      toast({ title: 'Изменения применены', description: 'Текст обновлен' });
    }
  };

  const applyImageChange = () => {
    if (selectedElement && selectedElement.type === 'image') {
      (selectedElement.element as HTMLImageElement).src = imageUrl;
      toast({ title: 'Изменения применены', description: 'Изображение обновлено' });
    }
  };

  const applyLinkChange = () => {
    if (selectedElement && selectedElement.type === 'link') {
      (selectedElement.element as HTMLAnchorElement).href = linkUrl;
      toast({ title: 'Изменения применены', description: 'Ссылка обновлена' });
    }
  };

  const applyStyleChange = (property: string, value: string) => {
    if (selectedElement) {
      (selectedElement.element.style as any)[property] = value;
      toast({ title: 'Стиль применен' });
    }
  };

  const applyTextAlignment = (alignment: string) => {
    if (selectedElement) {
      selectedElement.element.style.textAlign = alignment;
    }
  };

  const toggleTextStyle = (style: 'bold' | 'italic' | 'underline') => {
    if (!selectedElement) return;
    
    const el = selectedElement.element;
    switch (style) {
      case 'bold':
        el.style.fontWeight = el.style.fontWeight === 'bold' ? 'normal' : 'bold';
        break;
      case 'italic':
        el.style.fontStyle = el.style.fontStyle === 'italic' ? 'normal' : 'italic';
        break;
      case 'underline':
        el.style.textDecoration = el.style.textDecoration === 'underline' ? 'none' : 'underline';
        break;
    }
  };

  if (!isEditMode) return null;

  return (
    <>
      <div 
        className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-primary text-primary-foreground px-4 py-2 rounded-md shadow-lg"
        data-editor-panel
      >
        Режим редактирования активен - выделите элемент для редактирования
      </div>

      {editPanel && selectedElement && (
        <Card 
          className="fixed z-50 w-80 shadow-xl"
          style={{ top: editPanel.y, left: editPanel.x }}
          data-editor-panel
        >
          <CardHeader className="flex flex-row items-center justify-between gap-2 pb-2">
            <CardTitle className="text-sm">
              Редактирование: {selectedElement.type === 'text' ? 'Текст' : 
                              selectedElement.type === 'image' ? 'Изображение' :
                              selectedElement.type === 'button' ? 'Кнопка' : 'Ссылка'}
            </CardTitle>
            <Button variant="ghost" size="icon" onClick={closePanel} data-testid="button-close-editor">
              <X className="w-4 h-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="content" className="w-full">
              <TabsList className="w-full">
                <TabsTrigger value="content" className="flex-1">Контент</TabsTrigger>
                <TabsTrigger value="style" className="flex-1">Стиль</TabsTrigger>
              </TabsList>

              <TabsContent value="content" className="space-y-4 mt-4">
                {(selectedElement.type === 'text' || selectedElement.type === 'button') && (
                  <div className="space-y-2">
                    <Label>Текст</Label>
                    <Textarea
                      value={textContent}
                      onChange={(e) => setTextContent(e.target.value)}
                      className="min-h-[80px]"
                      data-testid="input-text-content"
                    />
                    <Button onClick={applyTextChange} size="sm" className="w-full" data-testid="button-apply-text">
                      <Save className="w-4 h-4 mr-2" />
                      Применить
                    </Button>
                  </div>
                )}

                {selectedElement.type === 'image' && (
                  <div className="space-y-2">
                    <Label>URL изображения</Label>
                    <Input
                      value={imageUrl}
                      onChange={(e) => setImageUrl(e.target.value)}
                      placeholder="https://..."
                      data-testid="input-image-url"
                    />
                    <Button onClick={applyImageChange} size="sm" className="w-full" data-testid="button-apply-image">
                      <Image className="w-4 h-4 mr-2" />
                      Применить
                    </Button>
                  </div>
                )}

                {selectedElement.type === 'link' && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Текст ссылки</Label>
                      <Input
                        value={textContent}
                        onChange={(e) => setTextContent(e.target.value)}
                        data-testid="input-link-text"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>URL ссылки</Label>
                      <Input
                        value={linkUrl}
                        onChange={(e) => setLinkUrl(e.target.value)}
                        placeholder="https://..."
                        data-testid="input-link-url"
                      />
                    </div>
                    <Button onClick={() => { applyTextChange(); applyLinkChange(); }} size="sm" className="w-full" data-testid="button-apply-link">
                      <Link2 className="w-4 h-4 mr-2" />
                      Применить
                    </Button>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="style" className="space-y-4 mt-4">
                <div className="flex gap-1 justify-center">
                  <Button variant="outline" size="icon" onClick={() => toggleTextStyle('bold')} data-testid="button-bold">
                    <Bold className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="icon" onClick={() => toggleTextStyle('italic')} data-testid="button-italic">
                    <Italic className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="icon" onClick={() => toggleTextStyle('underline')} data-testid="button-underline">
                    <Underline className="w-4 h-4" />
                  </Button>
                  <div className="w-px bg-border mx-1" />
                  <Button variant="outline" size="icon" onClick={() => applyTextAlignment('left')} data-testid="button-align-left">
                    <AlignLeft className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="icon" onClick={() => applyTextAlignment('center')} data-testid="button-align-center">
                    <AlignCenter className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="icon" onClick={() => applyTextAlignment('right')} data-testid="button-align-right">
                    <AlignRight className="w-4 h-4" />
                  </Button>
                </div>

                <div className="space-y-2">
                  <Label>Размер шрифта</Label>
                  <div className="flex gap-2">
                    <Input
                      value={fontSize}
                      onChange={(e) => setFontSize(e.target.value)}
                      placeholder="16px"
                      data-testid="input-font-size"
                    />
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => applyStyleChange('fontSize', fontSize)}
                      data-testid="button-apply-font-size"
                    >
                      OK
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Цвет текста</Label>
                  <div className="flex gap-2">
                    <Input
                      type="color"
                      value={fontColor.startsWith('rgb') ? '#000000' : fontColor}
                      onChange={(e) => {
                        setFontColor(e.target.value);
                        applyStyleChange('color', e.target.value);
                      }}
                      className="w-12 h-9 p-1"
                      data-testid="input-font-color"
                    />
                    <Input
                      value={fontColor}
                      onChange={(e) => setFontColor(e.target.value)}
                      placeholder="#000000"
                      className="flex-1"
                      data-testid="input-font-color-text"
                    />
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      )}
    </>
  );
}
