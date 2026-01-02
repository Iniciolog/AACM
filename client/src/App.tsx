import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider, useQuery } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LanguageProvider, useLanguage } from "@/contexts/LanguageContext";
import { EditModeProvider } from "@/contexts/EditModeContext";
import { AdminAuthProvider } from "@/contexts/AdminAuthContext";
import { AdminLoginButton } from "@/components/AdminLoginButton";
import { VisualEditor } from "@/components/VisualEditor";
import HomePage from "@/pages/HomePage";
import PrivacyPolicy from "@/pages/PrivacyPolicy";
import CookiePolicy from "@/pages/CookiePolicy";
import DataProtection from "@/pages/DataProtection";
import TermsOfService from "@/pages/TermsOfService";
import CareersPage from "@/pages/CareersPage";
import PageBuilder from "@/pages/PageBuilder";
import NotFound from "@/pages/not-found";
import { useEffect } from "react";

interface ElementChange {
  text?: string;
  src?: string;
  href?: string;
  styles?: Record<string, string>;
}

// Find element by path like "div[0]>div[1]>p[0]"
function findElementByPath(path: string): HTMLElement | null {
  const parts = path.split('>');
  let current: Element = document.body;
  
  for (const part of parts) {
    const match = part.match(/^(\w+)\[(\d+)\]$/);
    if (!match) return null;
    
    const [, tagName, indexStr] = match;
    const index = parseInt(indexStr, 10);
    const children = Array.from(current.children).filter(c => c.tagName.toLowerCase() === tagName.toLowerCase());
    
    if (index >= children.length) return null;
    current = children[index];
  }
  
  return current as HTMLElement;
}

// Apply saved changes to elements by their ID
function applyVisualChanges(changes: Record<string, ElementChange>) {
  Object.entries(changes).forEach(([elementId, change]) => {
    let element: HTMLElement | null = null;
    
    // Find element by its ID type
    if (elementId.startsWith('testid:')) {
      const testId = elementId.replace('testid:', '');
      element = document.querySelector(`[data-testid="${testId}"]`) as HTMLElement;
    } else if (elementId.startsWith('id:')) {
      const id = elementId.replace('id:', '');
      element = document.getElementById(id);
    } else if (elementId.startsWith('path:')) {
      const path = elementId.replace('path:', '');
      element = findElementByPath(path);
    }
    
    if (!element) {
      console.warn(`Element not found for ID: ${elementId}`);
      return;
    }
    
    // Apply text changes
    if (change.text !== undefined) {
      element.textContent = change.text;
    }
    
    // Apply image src
    if (change.src !== undefined && element.tagName === 'IMG') {
      (element as HTMLImageElement).src = change.src;
    }
    
    // Apply link href
    if (change.href !== undefined && element.tagName === 'A') {
      (element as HTMLAnchorElement).href = change.href;
    }
    
    // Apply styles
    if (change.styles) {
      Object.entries(change.styles).forEach(([prop, value]) => {
        (element!.style as any)[prop] = value;
      });
    }
  });
}

function Content() {
  const { language } = useLanguage();
  const { data: visualChanges } = useQuery<any>({
    queryKey: [`/api/content/visual_changes/${language || 'ru'}`],
  });

  useEffect(() => {
    console.log("visualChanges received:", visualChanges);
    if (visualChanges?.content && visualChanges.content !== "" && visualChanges.content !== "{}") {
      try {
        // Parse JSON content and apply changes
        const changes = JSON.parse(visualChanges.content) as Record<string, ElementChange>;
        console.log("Parsed changes:", changes);
        
        // Apply changes after a short delay to ensure DOM is ready
        setTimeout(() => {
          applyVisualChanges(changes);
          console.log("Visual changes applied:", Object.keys(changes).length, "elements");
        }, 100);
      } catch (e) {
        console.error("Failed to apply visual changes", e);
      }
    }
  }, [visualChanges]);

  return (
    <>
      <div className="relative">
        <Switch>
          <Route path="/" component={HomePage} />
          <Route path="/privacy-policy" component={PrivacyPolicy} />
          <Route path="/cookie-policy" component={CookiePolicy} />
          <Route path="/data-protection" component={DataProtection} />
          <Route path="/terms-of-service" component={TermsOfService} />
          <Route path="/careers" component={CareersPage} />
          <Route path="/page/new" component={PageBuilder} />
          <Route path="/page/:slug" component={PageBuilder} />
          <Route component={NotFound} />
        </Switch>
      </div>
      <AdminLoginButton />
      <VisualEditor />
    </>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <LanguageProvider>
          <AdminAuthProvider>
            <EditModeProvider>
              <Toaster />
              <Content />
            </EditModeProvider>
          </AdminAuthProvider>
        </LanguageProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
