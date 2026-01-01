import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LanguageProvider } from "@/contexts/LanguageContext";
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

function Router() {
  return (
    <Switch>
      <Route path="/" component={HomePage} />
      <Route path="/privacy-policy" component={PrivacyPolicy} />
      <Route path="/cookie-policy" component={CookiePolicy} />
      <Route path="/data-protection" component={DataProtection} />
      <Route path="/terms-of-service" component={TermsOfService} />
      <Route path="/careers" component={CareersPage} />
      <Route component={NotFound} />
    </Switch>
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
              <Router />
              <AdminLoginButton />
              <VisualEditor />
            </EditModeProvider>
          </AdminAuthProvider>
        </LanguageProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
