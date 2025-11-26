import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { TaskContextMenu } from "@/components/task-context-menu";
import Home from "@/pages/home";
import Assessment from "@/pages/assessment";
import Dashboard from "@/pages/dashboard";
import AssessmentCheckout from "@/pages/assessment-checkout";
import AICoachPage from "@/pages/ai-coach";
import ClientPortal from "@/pages/client-portal";
import ClientLogin from "@/pages/client-login";
import VerifyMagicLink from "@/pages/verify-magic-link";
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
import LiveChatInstall from "@/pages/livechat-install";
import ContentLanding from "@/pages/content-landing";
import CommverseLanding from "@/pages/commverse-landing";
import CommversePricing from "@/pages/commverse-pricing";
import PathwaysPage from "@/pages/pathways";
import PricingPage from "@/pages/pricing";
import MarketplacePage from "@/pages/marketplace";
import MarketplaceCheckoutPage from "@/pages/marketplace-checkout";
import CartPage from "@/pages/cart";
import CheckoutPage from "@/pages/checkout";
import BIIF from "@/pages/biif";
import AdminPanel from "@/pages/admin-panel";
import BrandStudio from "@/pages/brand-studio";
import ContentManagement from "@/pages/content-management";
import ReputationManagement from "@/pages/reputation";
import ListingsManagement from "@/pages/listings";
import LocalBlueLanding from "@/pages/localblue-landing";
import ListingsLanding from "@/pages/listings-landing";
import ReputationLanding from "@/pages/reputation-landing";
import Privacy from "@/pages/privacy";
import Terms from "@/pages/terms";
import DataDeletion from "@/pages/data-deletion";
import PortalTestAccess from "@/pages/portal-test-access";
import FindResults from "@/pages/find-results";
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
      <Route path="/portal/verify" component={VerifyMagicLink} />
      <Route path="/portal/test" component={PortalTestAccess} />
      <Route path="/portal/dashboard" component={ClientPortal} />
      <Route path="/portal/inbox" component={InboxPage} />
      <Route path="/portal" component={ClientPortal} />
      <Route path="/contact" component={Contact} />
      <Route path="/about" component={About} />
      <Route path="/pathways" component={PathwaysPage} />
      <Route path="/pricing" component={PricingPage} />
      <Route path="/marketplace" component={MarketplacePage} />
      <Route path="/marketplace/checkout" component={MarketplaceCheckoutPage} />
      <Route path="/cart" component={CartPage} />
      <Route path="/checkout" component={CheckoutPage} />
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
      <Route path="/livechat-install" component={LiveChatInstall} />
      <Route path="/content-landing" component={ContentLanding} />
      <Route path="/commverse" component={CommverseLanding} />
      <Route path="/commverse-pricing" component={CommversePricing} />
      <Route path="/biif" component={BIIF} />
      <Route path="/admin" component={AdminPanel} />
      <Route path="/brand-studio" component={BrandStudio} />
      <Route path="/content" component={ContentManagement} />
      <Route path="/localblue" component={LocalBlueLanding} />
      <Route path="/listings-landing" component={ListingsLanding} />
      <Route path="/reputation-landing" component={ReputationLanding} />
      <Route path="/reputation-app" component={ReputationManagement} />
      <Route path="/listings-app" component={ListingsManagement} />
      <Route path="/privacy" component={Privacy} />
      <Route path="/terms" component={Terms} />
      <Route path="/data-deletion" component={DataDeletion} />
      <Route path="/find-results" component={FindResults} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <TaskContextMenu>
          <Toaster />
          <Router />
        </TaskContextMenu>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
