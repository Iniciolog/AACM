import { useState, useEffect, useRef, useCallback } from 'react';
import { useLocation } from 'wouter';
import { X, Type, Image, Link2, Trash2, Save, Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight, Check, Copy, Clipboard, Plus, ImagePlus, FileText, FilePlus, GripHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useEditMode } from '@/contexts/EditModeContext';
import { useToast } from '@/hooks/use-toast';
import { apiRequest, queryClient } from '@/lib/queryClient';
import { useLanguage } from '@/contexts/LanguageContext';

interface EditableElement {
  element: HTMLElement;
  type: 'text' | 'image' | 'button' | 'link';
  originalContent: string;
  originalStyles: CSSStyleDeclaration;
  elementId: string;
}

interface ElementChange {
  text?: string;
  src?: string;
  href?: string;
  styles?: Record<string, string>;
}

// Generate a unique identifier for an element based on its path and attributes
function getElementId(el: HTMLElement): string {
  // Prefer data-testid if available
  if (el.dataset.testid) {
    return `testid:${el.dataset.testid}`;
  }
  // Use id if available
  if (el.id) {
    return `id:${el.id}`;
  }
  // Generate a path-based identifier
  const path: string[] = [];
  let current: HTMLElement | null = el;
  while (current && current !== document.body) {
    const parentEl: HTMLElement | null = current.parentElement;
    if (parentEl) {
      const tagName = current.tagName;
      const siblings = Array.from(parentEl.children).filter((c: Element) => c.tagName === tagName);
      const index = siblings.indexOf(current);
      path.unshift(`${current.tagName.toLowerCase()}[${index}]`);
    } else {
      path.unshift(current.tagName.toLowerCase());
    }
    current = parentEl;
  }
  return `path:${path.join('>')}`;
}

export function VisualEditor() {
  const { isEditMode } = useEditMode();
  const { language } = useLanguage();
  const { toast } = useToast();
  const [, navigate] = useLocation();
  const [selectedElement, setSelectedElement] = useState<EditableElement | null>(null);
  const [editPanel, setEditPanel] = useState<{ x: number; y: number } | null>(null);
  const [textContent, setTextContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [linkUrl, setLinkUrl] = useState('');
  const [fontSize, setFontSize] = useState('');
  const [fontColor, setFontColor] = useState('');
  const [fontFamily, setFontFamily] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [pendingChanges, setPendingChanges] = useState<Record<string, ElementChange>>({});
  const [clipboard, setClipboard] = useState<{ html: string; type: string } | null>(null);
  const [newImageUrl, setNewImageUrl] = useState('');
  const [toolbarPosition, setToolbarPosition] = useState<{ x: number; y: number }>({ x: -1, y: 16 });
  const [isDraggingToolbar, setIsDraggingToolbar] = useState(false);
  const [isDraggingPanel, setIsDraggingPanel] = useState(false);
  const dragOffsetRef = useRef({ x: 0, y: 0 });

  // Drag handlers for toolbar
  const handleToolbarDragStart = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDraggingToolbar(true);
    const toolbar = (e.target as HTMLElement).closest('[data-editor-panel]') as HTMLElement;
    if (toolbar) {
      const rect = toolbar.getBoundingClientRect();
      dragOffsetRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    }
  };

  const handlePanelDragStart = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDraggingPanel(true);
    if (editPanel) {
      dragOffsetRef.current = { x: e.clientX - editPanel.x, y: e.clientY - editPanel.y };
    }
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDraggingToolbar) {
        const newX = e.clientX - dragOffsetRef.current.x;
        const newY = Math.max(0, e.clientY - dragOffsetRef.current.y);
        setToolbarPosition({ x: newX, y: newY });
      }
      if (isDraggingPanel && editPanel) {
        const newX = Math.max(0, Math.min(e.clientX - dragOffsetRef.current.x, window.innerWidth - 320));
        const newY = Math.max(0, e.clientY - dragOffsetRef.current.y);
        setEditPanel({ x: newX, y: newY });
      }
    };

    const handleMouseUp = () => {
      setIsDraggingToolbar(false);
      setIsDraggingPanel(false);
    };

    if (isDraggingToolbar || isDraggingPanel) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDraggingToolbar, isDraggingPanel, editPanel]);

  // Track a change for an element
  const trackChange = (elementId: string, change: Partial<ElementChange>) => {
    setPendingChanges(prev => ({
      ...prev,
      [elementId]: {
        ...prev[elementId],
        ...change,
      }
    }));
  };

  const savePageContent = async () => {
    setIsSaving(true);
    console.log("Starting save, pendingChanges:", pendingChanges);
    try {
      // First close the panel to clear selection styles
      closePanel();
      
      // Only save the tracked changes - server will merge with existing
      const changes = { ...pendingChanges };
      
      if (Object.keys(changes).length === 0) {
        toast({ title: 'Информация', description: 'Нет изменений для сохранения' });
        setIsSaving(false);
        return;
      }
      
      // Save as JSON - server will merge with existing changes
      const content = JSON.stringify(changes);
      console.log("Saving changes:", content);
      console.log("Elements being saved:", Object.keys(changes).length);
      
      const response = await apiRequest('POST', '/api/content', {
        sectionType: 'visual_changes',
        language: language || 'ru',
        content: content
      });
      
      const result = await response.json();
      console.log("Save response:", result);
      
      // Clear pending changes after successful save
      setPendingChanges({});
      
      toast({ title: 'Успех', description: `Сохранено ${Object.keys(changes).length} изменений` });
    } catch (err) {
      console.error("Save error:", err);
      toast({ title: 'Ошибка', description: 'Не удалось сохранить изменения', variant: 'destructive' });
    } finally {
      setIsSaving(false);
    }
  };

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
    
    // Protect header/navigation elements from editing
    if (target.closest('[data-testid="header-main"]')) {
      toast({ title: 'Защищённый элемент', description: 'Меню и шапка защищены от редактирования', variant: 'default' });
      return;
    }

    e.preventDefault();
    e.stopPropagation();

    const editableElement: EditableElement = {
      element: target,
      type: getElementType(target),
      originalContent: target.tagName === 'IMG' ? (target as HTMLImageElement).src : target.textContent || '',
      originalStyles: window.getComputedStyle(target),
      elementId: getElementId(target),
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
    setFontFamily(computedStyle.fontFamily);

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
      trackChange(selectedElement.elementId, { text: textContent });
      toast({ title: 'Изменения применены', description: 'Текст обновлен' });
    }
  };

  const applyImageChange = () => {
    if (selectedElement && selectedElement.type === 'image') {
      (selectedElement.element as HTMLImageElement).src = imageUrl;
      trackChange(selectedElement.elementId, { src: imageUrl });
      toast({ title: 'Изменения применены', description: 'Изображение обновлено' });
    }
  };

  const applyLinkChange = () => {
    if (selectedElement && selectedElement.type === 'link') {
      (selectedElement.element as HTMLAnchorElement).href = linkUrl;
      trackChange(selectedElement.elementId, { href: linkUrl });
      toast({ title: 'Изменения применены', description: 'Ссылка обновлена' });
    }
  };

  const applyStyleChange = (property: string, value: string) => {
    if (selectedElement) {
      (selectedElement.element.style as any)[property] = value;
      trackChange(selectedElement.elementId, { 
        styles: { ...pendingChanges[selectedElement.elementId]?.styles, [property]: value } 
      });
      toast({ title: 'Стиль применен' });
    }
  };

  const applyTextAlignment = (alignment: string) => {
    if (selectedElement) {
      selectedElement.element.style.textAlign = alignment;
      trackChange(selectedElement.elementId, { 
        styles: { ...pendingChanges[selectedElement.elementId]?.styles, textAlign: alignment } 
      });
    }
  };

  const toggleTextStyle = (style: 'bold' | 'italic' | 'underline') => {
    if (!selectedElement) return;
    
    const el = selectedElement.element;
    let newValue = '';
    switch (style) {
      case 'bold':
        newValue = el.style.fontWeight === 'bold' ? 'normal' : 'bold';
        el.style.fontWeight = newValue;
        trackChange(selectedElement.elementId, { 
          styles: { ...pendingChanges[selectedElement.elementId]?.styles, fontWeight: newValue } 
        });
        break;
      case 'italic':
        newValue = el.style.fontStyle === 'italic' ? 'normal' : 'italic';
        el.style.fontStyle = newValue;
        trackChange(selectedElement.elementId, { 
          styles: { ...pendingChanges[selectedElement.elementId]?.styles, fontStyle: newValue } 
        });
        break;
      case 'underline':
        newValue = el.style.textDecoration === 'underline' ? 'none' : 'underline';
        el.style.textDecoration = newValue;
        trackChange(selectedElement.elementId, { 
          styles: { ...pendingChanges[selectedElement.elementId]?.styles, textDecoration: newValue } 
        });
        break;
    }
  };

  const copyElement = () => {
    if (selectedElement) {
      setClipboard({
        html: selectedElement.element.outerHTML,
        type: selectedElement.type
      });
      toast({ title: 'Скопировано', description: 'Элемент скопирован в буфер' });
    }
  };

  const saveBlockToAPI = async (parentLocator: string, htmlContent: string, blockType: string = 'text') => {
    try {
      await apiRequest('POST', '/api/blocks', {
        language: language || 'ru',
        parentLocator,
        sortOrder: 0,
        blockType,
        htmlContent,
        styles: '{}',
      });
      queryClient.invalidateQueries({ queryKey: [`/api/blocks/${language || 'ru'}`] });
    } catch (err) {
      console.error('Failed to save block:', err);
    }
  };

  const duplicateElement = async () => {
    if (selectedElement) {
      const clone = selectedElement.element.cloneNode(true) as HTMLElement;
      const uniqueId = `cloned-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      clone.setAttribute('data-testid', uniqueId);
      clone.setAttribute('data-inserted-block', 'true');
      clone.id = '';
      selectedElement.element.parentNode?.insertBefore(clone, selectedElement.element.nextSibling);
      
      // Get parent locator
      const parentLocator = selectedElement.elementId;
      
      // Save to database
      await saveBlockToAPI(parentLocator, clone.outerHTML, 'text');
      
      toast({ title: 'Дублировано', description: 'Элемент продублирован и сохранён в базу' });
      closePanel();
    }
  };

  const pasteElement = async () => {
    if (clipboard && selectedElement) {
      const temp = document.createElement('div');
      temp.innerHTML = clipboard.html;
      const newElement = temp.firstChild as HTMLElement;
      if (newElement) {
        const uniqueId = `pasted-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
        newElement.setAttribute('data-testid', uniqueId);
        newElement.setAttribute('data-inserted-block', 'true');
        newElement.id = '';
        selectedElement.element.parentNode?.insertBefore(newElement, selectedElement.element.nextSibling);
        
        // Get parent locator
        const parentLocator = selectedElement.elementId;
        
        // Save to database
        await saveBlockToAPI(parentLocator, newElement.outerHTML, 'text');
        
        toast({ title: 'Вставлено', description: 'Элемент вставлен и сохранён в базу' });
        closePanel();
      }
    }
  };

  const deleteElement = async () => {
    if (selectedElement) {
      // Check if this is an inserted block - look up the DOM tree for closest block
      let blockElement = selectedElement.element.closest('[data-block-id]') as HTMLElement | null;
      const blockId = blockElement?.getAttribute('data-block-id');
      
      if (blockId && blockElement) {
        try {
          await apiRequest('DELETE', `/api/blocks/${blockId}`);
          queryClient.invalidateQueries({ queryKey: [`/api/blocks/${language || 'ru'}`] });
          // Remove the whole block element, not just the selected child
          blockElement.remove();
        } catch (err) {
          console.error('Failed to delete block from database:', err);
          toast({ title: 'Ошибка', description: 'Не удалось удалить блок из базы', variant: 'destructive' });
          closePanel();
          return;
        }
      } else {
        // Regular element, just remove from DOM
        selectedElement.element.remove();
      }
      
      // Also remove from pending changes
      const elementId = selectedElement.elementId;
      setPendingChanges(prev => {
        const newChanges = { ...prev };
        delete newChanges[elementId];
        return newChanges;
      });
      
      toast({ title: 'Удалено', description: 'Элемент удален' });
      closePanel();
    }
  };

  const insertImage = () => {
    if (selectedElement && newImageUrl) {
      const img = document.createElement('img');
      img.src = newImageUrl;
      img.alt = 'Inserted image';
      img.className = 'max-w-full h-auto rounded-lg my-4';
      selectedElement.element.parentNode?.insertBefore(img, selectedElement.element.nextSibling);
      trackChange(`inserted-img-${Date.now()}`, { src: newImageUrl });
      toast({ title: 'Изображение добавлено' });
      setNewImageUrl('');
      closePanel();
    }
  };

  const insertTextBlock = async () => {
    if (selectedElement) {
      const uniqueId = `block-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      const block = document.createElement('div');
      block.className = 'p-4 my-4 bg-card rounded-lg';
      block.setAttribute('data-testid', uniqueId);
      block.setAttribute('data-inserted-block', 'true');
      block.innerHTML = '<p class="text-foreground">Новый текстовый блок. Кликните для редактирования.</p>';
      selectedElement.element.parentNode?.insertBefore(block, selectedElement.element.nextSibling);
      
      // Get parent locator
      const parentLocator = selectedElement.elementId;
      
      // Save to database
      await saveBlockToAPI(parentLocator, block.outerHTML, 'text');
      
      toast({ title: 'Блок добавлен', description: 'Новый текстовый блок создан и сохранён в базу' });
      closePanel();
    }
  };

  if (!isEditMode) return null;

  return (
    <>
      <div 
        className="fixed z-50 bg-primary text-primary-foreground px-4 py-2 rounded-md shadow-lg flex items-center gap-2 sm:gap-4 flex-wrap justify-center"
        style={toolbarPosition.x === -1 
          ? { top: toolbarPosition.y, left: '50%', transform: 'translateX(-50%)' }
          : { top: toolbarPosition.y, left: toolbarPosition.x }
        }
        data-editor-panel
      >
        <div 
          className="cursor-grab active:cursor-grabbing p-1 -ml-2 hover:bg-primary-foreground/20 rounded"
          onMouseDown={handleToolbarDragStart}
          title="Перетащить панель"
        >
          <GripHorizontal className="w-4 h-4" />
        </div>
        <span className="text-sm sm:text-base">Режим редактирования</span>
        {clipboard && (
          <span className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded flex items-center gap-1">
            <Clipboard className="w-3 h-3" />
            В буфере
          </span>
        )}
        <Button 
          size="sm" 
          variant="secondary" 
          onClick={savePageContent} 
          disabled={isSaving}
          data-testid="button-save-all"
        >
          {isSaving ? 'Сохранение...' : 'Сохранить'}
          <Check className="w-4 h-4 ml-2" />
        </Button>
        <Button 
          size="sm" 
          variant="outline" 
          onClick={() => navigate('/page/new')}
          data-testid="button-create-page"
          className="bg-background/80"
        >
          <FilePlus className="w-4 h-4 mr-2" />
          Новая страница
        </Button>
      </div>

      {editPanel && selectedElement && (
        <Card 
          className="fixed z-50 w-80 shadow-xl"
          style={{ top: editPanel.y, left: editPanel.x }}
          data-editor-panel
        >
          <CardHeader className="flex flex-row items-center justify-between gap-2 pb-2">
            <div 
              className="cursor-grab active:cursor-grabbing p-1 -ml-2 hover:bg-muted rounded"
              onMouseDown={handlePanelDragStart}
              title="Перетащить панель"
            >
              <GripHorizontal className="w-4 h-4 text-muted-foreground" />
            </div>
            <CardTitle className="text-sm flex-1">
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
                <TabsTrigger value="actions" className="flex-1">Действия</TabsTrigger>
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
                    
                    <div className="pt-2 border-t">
                      <Label>Добавить ссылку</Label>
                      <Input
                        value={linkUrl}
                        onChange={(e) => setLinkUrl(e.target.value)}
                        placeholder="https://..."
                        className="mt-1"
                        data-testid="input-add-link-url"
                      />
                      <Button 
                        onClick={() => {
                          if (selectedElement && linkUrl) {
                            const el = selectedElement.element;
                            const link = document.createElement('a');
                            link.href = linkUrl;
                            link.textContent = el.textContent || '';
                            link.style.cssText = el.style.cssText;
                            link.className = el.className;
                            link.target = '_blank';
                            link.rel = 'noopener noreferrer';
                            el.parentNode?.replaceChild(link, el);
                            trackChange(selectedElement.elementId, { href: linkUrl, text: textContent });
                            toast({ title: 'Ссылка добавлена', description: 'Элемент преобразован в ссылку' });
                            closePanel();
                          }
                        }} 
                        size="sm" 
                        variant="outline"
                        className="w-full mt-2" 
                        disabled={!linkUrl}
                        data-testid="button-convert-to-link"
                      >
                        <Link2 className="w-4 h-4 mr-2" />
                        Сделать ссылкой
                      </Button>
                    </div>
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
                  <Label>Шрифт</Label>
                  <select
                    value={fontFamily}
                    onChange={(e) => {
                      setFontFamily(e.target.value);
                      applyStyleChange('fontFamily', e.target.value);
                    }}
                    className="w-full h-9 px-3 rounded-md border border-input bg-background text-sm"
                    data-testid="select-font-family"
                  >
                    <option value="">-- Выберите шрифт --</option>
                    <option value="'Playfair Display', Georgia, serif">Playfair Display (заголовки)</option>
                    <option value="'Inter', sans-serif">Inter (основной)</option>
                    <option value="'Cormorant Garamond', Georgia, serif">Cormorant Garamond</option>
                    <option value="Georgia, serif">Georgia</option>
                    <option value="'Times New Roman', Times, serif">Times New Roman</option>
                    <option value="Arial, sans-serif">Arial</option>
                    <option value="'Roboto', sans-serif">Roboto</option>
                    <option value="'Open Sans', sans-serif">Open Sans</option>
                  </select>
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

              <TabsContent value="actions" className="space-y-3 mt-4">
                <div className="grid grid-cols-2 gap-2">
                  <Button variant="outline" size="sm" onClick={copyElement} data-testid="button-copy">
                    <Copy className="w-4 h-4 mr-1" />
                    Копировать
                  </Button>
                  <Button variant="outline" size="sm" onClick={pasteElement} disabled={!clipboard} data-testid="button-paste">
                    <Clipboard className="w-4 h-4 mr-1" />
                    Вставить
                  </Button>
                  <Button variant="outline" size="sm" onClick={duplicateElement} data-testid="button-duplicate">
                    <Plus className="w-4 h-4 mr-1" />
                    Дублировать
                  </Button>
                  <Button variant="outline" size="sm" onClick={insertTextBlock} data-testid="button-add-text-block">
                    <FileText className="w-4 h-4 mr-1" />
                    + Блок
                  </Button>
                </div>

                <div className="pt-2 border-t space-y-2">
                  <Label>Вставить изображение по URL</Label>
                  <Input
                    value={newImageUrl}
                    onChange={(e) => setNewImageUrl(e.target.value)}
                    placeholder="https://example.com/image.jpg"
                    data-testid="input-insert-image-url"
                  />
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full" 
                    onClick={insertImage}
                    disabled={!newImageUrl}
                    data-testid="button-insert-image"
                  >
                    <ImagePlus className="w-4 h-4 mr-2" />
                    Вставить изображение
                  </Button>
                </div>

                <div className="pt-2 border-t">
                  <Button variant="destructive" size="sm" className="w-full" onClick={deleteElement} data-testid="button-delete">
                    <Trash2 className="w-4 h-4 mr-2" />
                    Удалить элемент
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      )}
    </>
  );
}
