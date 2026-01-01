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
import NotFound from "@/pages/not-found";
import { useEffect } from "react";

function Content() {
  const { language } = useLanguage();
  const { data: visualChanges } = useQuery<any>({
    queryKey: [`/api/content/visual_changes/${language || 'ru'}`],
  });

  useEffect(() => {
    if (visualChanges?.content && visualChanges.content !== "" && visualChanges.content !== "{}") {
      try {
        if (visualChanges.content.includes('<')) {
          // If we have saved HTML, we apply it. 
          // However, we must be careful not to break React hydration entirely if possible.
          // For a "visual editor" that saves the whole state, innerHTML is what they're doing.
          document.body.innerHTML = visualChanges.content;
          console.log("Saved content applied");
        }
      } catch (e) {
        console.error("Failed to apply visual changes", e);
      }
    }
  }, [visualChanges]);

  return (
    <div className="relative">
      <Switch>
        <Route path="/" component={HomePage} />
        <Route path="/privacy-policy" component={PrivacyPolicy} />
        <Route path="/cookie-policy" component={CookiePolicy} />
        <Route path="/data-protection" component={DataProtection} />
        <Route path="/terms-of-service" component={TermsOfService} />
        <Route path="/careers" component={CareersPage} />
        <Route component={NotFound} />
      </Switch>
      <AdminLoginButton />
      <VisualEditor />
    </div>
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
