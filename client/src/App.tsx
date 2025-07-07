import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/home";
import Assessment from "@/pages/assessment";
import Dashboard from "@/pages/dashboard";
import AICoachPage from "@/pages/ai-coach";
import ClientPortal from "@/pages/client-portal";
import ClientLogin from "@/pages/client-login";
import Contact from "@/pages/contact";
import About from "@/pages/about";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/assessment" component={Assessment} />
      <Route path="/dashboard/:id" component={Dashboard} />
      <Route path="/ai-coach" component={AICoachPage} />
      <Route path="/portal/login" component={ClientLogin} />
      <Route path="/portal" component={ClientPortal} />
      <Route path="/contact" component={Contact} />
      <Route path="/about" component={About} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
