import { useEffect } from "react";
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
import SendCampaignEditor from "@/pages/send-campaign-editor";
import SendTemplates from "@/pages/send-templates";
import RespondLanding from "@/pages/respond-landing";
import RespondPage from "@/pages/respond";
import LivechatLanding from "@/pages/livechat-landing";
import LiveChatDemo from "@/pages/livechat-demo";
import ChatDashboard from "@/pages/chat-dashboard";
import LiveChatInstall from "@/pages/livechat-install";
import PostLanding from "@/pages/post-landing";
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
import PostManagement from "@/pages/post-management";
import ReviewManagement from "@/pages/review";
import ListManagement from "@/pages/list";
import LocalBlueLanding from "@/pages/localblue-landing";
import ListLanding from "@/pages/list-landing";
import ReviewLanding from "@/pages/review-landing";
import Privacy from "@/pages/privacy";
import Terms from "@/pages/terms";
import DataDeletion from "@/pages/data-deletion";
import PortalTestAccess from "@/pages/portal-test-access";
import PortalPrescriptions from "@/pages/portal-prescriptions";
import FindResults from "@/pages/find-results";
import RelationshipsLanding from "@/pages/relationships-landing";
import RelationshipsDashboard from "@/pages/relationships";
import ApiDocs from "@/pages/api-docs";
import AssessmentConfirmation from "@/pages/assessment-confirmation";
import KnowledgeBase from "@/pages/knowledge-base";
import Tour from "@/pages/tour";
import ScansBluePurchase from "@/pages/scansblue-purchase";
import ScansBlueSuccess from "@/pages/scansblue-success";
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
      <Route path="/portal/respond" component={RespondPage} />
      <Route path="/portal/prescriptions/:id" component={PortalPrescriptions} />
      <Route path="/portal/prescriptions" component={PortalPrescriptions} />
      <Route path="/portal/prescription/:token" component={PortalPrescriptions} />
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
      <Route path="/promote" component={SendLanding} />
      <Route path="/promote-app" component={SendDashboard} />
      <Route path="/promote/campaigns/new" component={SendCampaignEditor} />
      <Route path="/promote/campaigns/:id/edit" component={SendCampaignEditor} />
      <Route path="/promote/templates" component={SendTemplates} />
      <Route path="/respond" component={RespondLanding} />
      <Route path="/respond-app" component={RespondPage} />
      <Route path="/engage" component={LivechatLanding} />
      <Route path="/engage/dashboard" component={ChatDashboard} />
      <Route path="/engage-demo" component={LiveChatDemo} />
      <Route path="/engage-install" component={LiveChatInstall} />
      <Route path="/post-landing" component={PostLanding} />
      <Route path="/commverse" component={CommverseLanding} />
      <Route path="/commverse-pricing" component={CommversePricing} />
      <Route path="/biif" component={BIIF} />
      <Route path="/admin" component={AdminPanel} />
      <Route path="/brand-studio" component={BrandStudio} />
      <Route path="/post" component={PostManagement} />
      <Route path="/localblue" component={LocalBlueLanding} />
      <Route path="/publish-landing" component={ListLanding} />
      <Route path="/elevate-landing" component={ReviewLanding} />
      <Route path="/elevate-app" component={ReviewManagement} />
      <Route path="/publish-app" component={ListManagement} />
      <Route path="/privacy" component={Privacy} />
      <Route path="/terms" component={Terms} />
      <Route path="/data-deletion" component={DataDeletion} />
      <Route path="/find-results" component={FindResults} />
      <Route path="/connect" component={RelationshipsLanding} />
      <Route path="/connect/dashboard" component={RelationshipsDashboard} />
      <Route path="/api-docs" component={ApiDocs} />
      <Route path="/portal/assessment/confirmation" component={AssessmentConfirmation} />
      <Route path="/knowledge-base" component={KnowledgeBase} />
      <Route path="/tour" component={Tour} />
      <Route path="/scansblue/purchase" component={ScansBluePurchase} />
      <Route path="/scansblue/success" component={ScansBlueSuccess} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  // Clean up stale auth data on app init
  useEffect(() => {
    const clientId = sessionStorage.getItem("clientId");
    const authToken = sessionStorage.getItem("authToken");
    
    // Clear stale data - must have BOTH to be valid
    if (!authToken || !clientId) {
      sessionStorage.removeItem("clientId");
      sessionStorage.removeItem("authToken");
      localStorage.removeItem("clientId");
    }
  }, []);

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
