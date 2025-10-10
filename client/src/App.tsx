import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/home";
import Assessment from "@/pages/assessment";
import Dashboard from "@/pages/dashboard";
import AssessmentCheckout from "@/pages/assessment-checkout";
import AICoachPage from "@/pages/ai-coach";
import ClientPortal from "@/pages/client-portal";
import ClientLogin from "@/pages/client-login";
import VendastaIntegration from "@/pages/vendasta-integration";
import Contact from "@/pages/contact";
import About from "@/pages/about";
import Subscription from "@/pages/subscription";
import Sitemap from "@/pages/sitemap";
import Journey from "@/pages/journey";
import LogoPreview from "@/pages/logo-preview";
import SendLanding from "@/pages/send-landing";
import SendDashboard from "@/pages/send-dashboard";
import InboxLanding from "@/pages/inbox-landing";
import InboxPage from "@/pages/inbox";
import LivechatLanding from "@/pages/livechat-landing";
import LiveChatDemo from "@/pages/livechat-demo";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/assessment" component={Assessment} />
      <Route path="/dashboard/:id" component={Dashboard} />
      <Route path="/assessment-checkout" component={AssessmentCheckout} />
      <Route path="/ai-coach" component={AICoachPage} />
      <Route path="/portal/login" component={ClientLogin} />
      <Route path="/portal" component={ClientPortal} />
      <Route path="/vendasta" component={VendastaIntegration} />
      <Route path="/contact" component={Contact} />
      <Route path="/about" component={About} />
      <Route path="/subscription" component={Subscription} />
      <Route path="/sitemap" component={Sitemap} />
      <Route path="/journey" component={Journey} />
      <Route path="/logo-preview" component={LogoPreview} />
      <Route path="/send" component={SendLanding} />
      <Route path="/send-app" component={SendDashboard} />
      <Route path="/inbox" component={InboxLanding} />
      <Route path="/inbox-app" component={InboxPage} />
      <Route path="/livechat" component={LivechatLanding} />
      <Route path="/livechat-demo" component={LiveChatDemo} />
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
