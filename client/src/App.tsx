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
import MessengerWidget from "@/components/MessengerWidget";
import AIAssistantWidget from "@/components/AIAssistantWidget";
import HomePage from "@/pages/HomePage";
import PrivacyPolicy from "@/pages/PrivacyPolicy";
import CookiePolicy from "@/pages/CookiePolicy";
import DataProtection from "@/pages/DataProtection";
import TermsOfService from "@/pages/TermsOfService";
import CareersPage from "@/pages/CareersPage";
import PageBuilder from "@/pages/PageBuilder";
import EducationalInfoPage from "@/pages/EducationalInfoPage";
import AwardsPage from "@/pages/AwardsPage";
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

// List of protected testid patterns for header/navigation elements
const PROTECTED_TESTIDS = [
  'header-main',
  'link-logo',
  'nav-about-system',
  'nav-program',
  'nav-channels',
  'nav-services',
  'nav-awards',
  'nav-founder',
  'nav-faq',
  'mobile-nav-about-system',
  'mobile-nav-program',
  'mobile-nav-channels',
  'mobile-nav-services',
  'mobile-nav-awards',
  'mobile-nav-founder',
  'mobile-nav-faq',
  'button-mobile-menu',
  'button-sidebar-toggle',
];

// Check if element is part of header/navigation (protected from visual changes)
function isProtectedElement(element: HTMLElement): boolean {
  // Check if element has protected testid
  const testId = element.dataset?.testid || '';
  if (PROTECTED_TESTIDS.includes(testId)) return true;
  
  // Check if element is inside the main header (data-testid="header-main")
  const headerMain = element.closest('[data-testid="header-main"]');
  if (headerMain) return true;
  
  return false;
}

// Check if an elementId refers to a protected element
function isProtectedElementId(elementId: string): boolean {
  // Check protected testids
  if (elementId.startsWith('testid:')) {
    const testId = elementId.replace('testid:', '');
    if (PROTECTED_TESTIDS.includes(testId)) return true;
  }
  return false;
}

// Apply saved changes to elements by their ID
function applyVisualChanges(changes: Record<string, ElementChange>) {
  Object.entries(changes).forEach(([elementId, change]) => {
    let element: HTMLElement | null = null;
    
    // Skip protected element IDs
    if (isProtectedElementId(elementId)) {
      console.log(`Skipping protected element: ${elementId}`);
      return;
    }
    
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
    
    // Skip protected elements (header, nav, etc.)
    if (isProtectedElement(element)) {
      console.log(`Skipping protected element: ${elementId}`);
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
          <Route path="/educational-info" component={EducationalInfoPage} />
          <Route path="/awards" component={AwardsPage} />
          <Route component={NotFound} />
        </Switch>
      </div>
      <AdminLoginButton />
      <VisualEditor />
      <AIAssistantWidget />
      <MessengerWidget />
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
