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
import CoachBluePage from "@/pages/coach-blue";
import ClientPortal from "@/pages/client-portal";
import ClientLogin from "@/pages/client-login";
import VerifyMagicLink from "@/pages/verify-magic-link";
import Contact from "@/pages/contact";
import About from "@/pages/about";
import Subscription from "@/pages/subscription";
import Sitemap from "@/pages/sitemap";
import Journey from "@/pages/journey";
import LogoPreview from "@/pages/logo-preview";
import PromoteLanding from "@/pages/promote-landing";
import PromoteDashboard from "@/pages/promote-dashboard";
import PromoteCampaignEditor from "@/pages/promote-campaign-editor";
import PromoteTemplates from "@/pages/promote-templates";
import RespondLanding from "@/pages/respond-landing";
import RespondPage from "@/pages/respond";
import EngageLanding from "@/pages/engage-landing";
import EngageDemo from "@/pages/engage-demo";
import EngageDashboard from "@/pages/engage-dashboard";
import EngageInstall from "@/pages/engage-install";
import PostLanding from "@/pages/post-landing";
import CompassLanding from "@/pages/compass-landing";
import CompassPricing from "@/pages/compass-pricing";
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
import ElevateDashboard from "@/pages/elevate-dashboard";
import PublishDashboard from "@/pages/publish-dashboard";
import AnchorLanding from "@/pages/anchor-landing";
import PublishLanding from "@/pages/publish-landing";
import ElevateLanding from "@/pages/elevate-landing";
import AmplifyLanding from "@/pages/amplify-landing";
import AmplifyDashboard from "@/pages/amplify-dashboard";
import AmplifyRedditWizard from "@/pages/amplify-reddit-wizard";
import Privacy from "@/pages/privacy";
import Terms from "@/pages/terms";
import DataDeletion from "@/pages/data-deletion";
import PortalTestAccess from "@/pages/portal-test-access";
import PortalPrescriptions from "@/pages/portal-prescriptions";
import FindResults from "@/pages/find-results";
import ConnectLanding from "@/pages/connect-landing";
import ConnectDashboard from "@/pages/connect-dashboard";
import ApiDocs from "@/pages/api-docs";
import AssessmentConfirmation from "@/pages/assessment-confirmation";
import KnowledgeBase from "@/pages/knowledge-base";
import Tour from "@/pages/tour";
import OptimizeLanding from "@/pages/optimize-landing";
import OptimizeSetup from "@/pages/optimize-setup";
import OptimizeDashboard from "@/pages/optimize";
import AdminLogin from "@/pages/login";
import VerifyAdminMagicLink from "@/pages/verify-admin-magic-link";
import DirectionsForUse from "@/pages/directions-for-use";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/assessment" component={Assessment} />
      <Route path="/dashboard/:id" component={Dashboard} />
      <Route path="/assessment-checkout" component={AssessmentCheckout} />
      <Route path="/coach-blue" component={CoachBluePage} />
      <Route path="/login" component={AdminLogin} />
      <Route path="/auth/verify" component={VerifyAdminMagicLink} />
      <Route path="/portal/login" component={ClientLogin} />
      <Route path="/portal/verify" component={VerifyMagicLink} />
      <Route path="/portal/test" component={PortalTestAccess} />
      <Route path="/portal/dashboard" component={ClientPortal} />
      <Route path="/portal/respond" component={RespondPage} />
      <Route path="/portal/directions" component={DirectionsForUse} />
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
      <Route path="/promote" component={PromoteLanding} />
      <Route path="/promote/dashboard" component={PromoteDashboard} />
      <Route path="/promote/campaigns/new" component={PromoteCampaignEditor} />
      <Route path="/promote/campaigns/:id/edit" component={PromoteCampaignEditor} />
      <Route path="/promote/templates" component={PromoteTemplates} />
      <Route path="/respond" component={RespondLanding} />
      <Route path="/respond/dashboard" component={RespondPage} />
      <Route path="/engage" component={EngageLanding} />
      <Route path="/engage/dashboard" component={EngageDashboard} />
      <Route path="/engage/demo" component={EngageDemo} />
      <Route path="/engage/install" component={EngageInstall} />
      <Route path="/post" component={PostLanding} />
      <Route path="/post-landing" component={PostLanding} />
      <Route path="/post/landing" component={PostLanding} />
      <Route path="/compass" component={CompassLanding} />
      <Route path="/compass/pricing" component={CompassPricing} />
      <Route path="/biif" component={BIIF} />
      <Route path="/admin" component={AdminPanel} />
      <Route path="/brand-studio" component={BrandStudio} />
      <Route path="/post/dashboard" component={PostManagement} />
      <Route path="/anchor" component={AnchorLanding} />
      <Route path="/publish" component={PublishLanding} />
      <Route path="/elevate" component={ElevateLanding} />
      <Route path="/elevate/dashboard" component={ElevateDashboard} />
      <Route path="/optimize" component={OptimizeLanding} />
      <Route path="/optimize/setup" component={OptimizeSetup} />
      <Route path="/optimize/dashboard" component={OptimizeDashboard} />
      <Route path="/amplify" component={AmplifyLanding} />
      <Route path="/amplify/landing" component={AmplifyLanding} />
      <Route path="/amplify/dashboard" component={AmplifyDashboard} />
      <Route path="/amplify/reddit/new" component={AmplifyRedditWizard} />
      <Route path="/publish/dashboard" component={PublishDashboard} />
      <Route path="/privacy" component={Privacy} />
      <Route path="/terms" component={Terms} />
      <Route path="/data-deletion" component={DataDeletion} />
      <Route path="/find-results" component={FindResults} />
      <Route path="/connect" component={ConnectLanding} />
      <Route path="/connect/dashboard" component={ConnectDashboard} />
      <Route path="/api-docs" component={ApiDocs} />
      <Route path="/portal/assessment/confirmation" component={AssessmentConfirmation} />
      <Route path="/knowledge-base" component={KnowledgeBase} />
      <Route path="/tour" component={Tour} />
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
