import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { addToCart, getCartCount, getCartTotal } from "@/lib/cart";
import { ShoppingCart, ClipboardCheck } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { NAV_ITEMS, HOW_IT_WORKS_STEPS } from "@/components/navigation-config";
import { Plus, Minus } from "lucide-react";
import layersIcon from "@assets/icons/layers.svg";
import bookOpenIcon from "@assets/icons/book-open.svg";
import dollarSignIcon from "@assets/icons/dollar-sign.svg";
import compassIcon from "@assets/icons/compass.svg";
import shoppingBasketIcon from "@assets/icons/shopping-basket.svg";
import logInIcon from "@assets/icons/log-in.svg";
import userPlusIcon from "@assets/icons/user-plus.svg";
import userIcon from "@assets/icons/user.svg";
import menuIcon from "@assets/icons/menu.svg";
import xIcon from "@assets/icons/x.svg";
import trendingUpIcon from "@assets/icons/trending-up.svg";
import graduationCapIcon from "@assets/icons/graduation-cap.svg";
import codeIcon from "@assets/icons/code.svg";
import helpCircleIcon from "@assets/icons/help-circle.svg";
import fileTextIcon from "@assets/icons/file-text.svg";
import videoIcon from "@assets/icons/video.svg";
import usersIcon from "@assets/icons/users.svg";
import lightbulbIcon from "@assets/icons/lightbulb.svg";
import wrenchIcon from "@assets/icons/wrench.svg";
import messageSquareIcon from "@assets/icons/message-square.svg";
import settingsIcon from "@assets/native icons and favicons/settings.png";
import { BrandLogo, BrandIcon } from "@/components/brand-logo";
import bbAvatar from "@assets/Blueprint_Favicon_1762489845363.png";
import bbIcon from "@assets/Blueprint_Favicon_1762489845363.png";
import contentIcon from "@assets/native icons and favicons/: content app icon.png";
import contentLogo from "@assets/content_1762930219626.png";
import inboxIcon from "@assets/native icons and favicons/: inbox app icon.png";
import webhostedLogo from "@assets/hostsblue assets/hostsblue URL.png";
import webhostedIcon from "@assets/hostsblue assets/Hosts Blue Brandmark.png";
import airswipedLogo from "@assets/swipesblue/swipesblue brandmark.png";
import sendLogo from "@assets/send_1762930219634.png";
import sendIcon from "@assets/native icons and favicons/: send app icon.png";
import inboxLogo from "@assets/inbox_1762930219632.png";
import livechatLogo from "@assets/livechat_1762930219632.png";
import livechatIcon from "@assets/native icons and favicons/: livechat app icon.png";
import hostsBlueIcon from "@assets/hostsblue assets/Hosts Blue Brandmark.png";
import hostsBlueWordmark from "@assets/Hosts Blue Lockup_1762931589296.png";
import swipesBlueIcon from "@assets/swipesblue/swipesblue brandmark.png";
import swipesBlueWordmark from "@assets/Swipes Blue Lockup_1762931589297.png";
import blueprintIcon from "@assets/Blueprint_Favicon_1762489845363.png";
import commverseBundle from "@assets/commverse-bundle-logo.png";
import commverseIcon from "@assets/step5-commverse.png";
import coachBlueIcon from "@assets/step4-coach-blue.png";
import captainingIcon from "@assets/native icons and favicons/Captaining Icon.png";
import alaCarteIcon from "@assets/native icons and favicons/A LA CARTE.png";
import diyIcon from "@assets/native icons and favicons/diy.png";
import reputationIcon from "@assets/reputation app triad blue and repoutation gold_1762804622669.png";
import reputationLogo from "@assets/reputation_1762930219633.png";
import listingsIcon from "@assets/listings app_1762804610311.png";
import listingsLogo from "@assets/listings_1762930219632.png";
import localBlueLogo from "@assets/localblue-logo.png";
import badge1 from "@assets/digital iq assessment_1764056639965.png";
import badge2 from "@assets/Get Your Prescribed Blueprint (2)_1763874287090.png";
import badge3 from "@assets/LocalBlue Bundle (3)_1763874287091.png";
import badge4 from "@assets/Coach Blue as Blue(4)_1763874287091.png";
import badge5 from "@assets/Commverse (5)_1763874287091.png";
import consoleBluelogo from "@assets/Blue Favicon_1764098681244.png";
import siteInspectorIcon from "@assets/SiteInspectorIcon_1764098487505.png";
import localblueIcon from "@assets/localblue_1764091108634.png";
import commverseWordmark from "@assets/_ comverse bundle_1764096245312.png";
import localblueWordmark from "@assets/_ local blue bundle_1764096245313.png";
import sendWordmark from "@assets/send_1764098321043.png";
import inboxWordmark from "@assets/: inbox app logo_1764088895509.png";
import livechatWordmark from "@assets/: livechat app logo_1764088895509.png";
import contentWordmark from "@assets/: content app logo_1764088895508.png";
import listingsWordmark from "@assets/: listings color triad black and FF0040_1764089307839.png";
import reputationWordmark from "@assets/: reputation color triad black and D59600_1764089307840.png";


interface HeaderProps {
  showNavigation?: boolean;
}

// Helper to get icon for nav item
const getNavIcon = (navLabel: string) => {
  switch(navLabel) {
    case 'How It Works': return compassIcon;
    case 'Products': return shoppingBasketIcon;
    case 'Solutions': return lightbulbIcon;
    case 'Resources': return bookOpenIcon;
    default: return compassIcon;
  }
};

export function Header({ showNavigation = true }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();
  const [hasClientPortalAccess, setHasClientPortalAccess] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  // Billing cycle state (used by Pricing menu only - NOT Applications menu)
  const [globalBillingCycle, setGlobalBillingCycle] = useState<'monthly' | 'annual'>('monthly');
  const [itemBillingOverrides, setItemBillingOverrides] = useState<Record<string, 'monthly' | 'annual'>>({});

  // Clean up overrides when global cycle changes
  useEffect(() => {
    setItemBillingOverrides(prev => {
      const updated = { ...prev };
      let changed = false;

      for (const itemId in updated) {
        if (updated[itemId] === globalBillingCycle) {
          delete updated[itemId];
          changed = true;
        }
      }

      return changed ? updated : prev;
    });
  }, [globalBillingCycle]);

  // Calculate annual price (20% discount)
  const getAnnualPrice = (monthlyPrice: number) => Math.round(monthlyPrice * 12 * 0.8);

  // Get billing cycle for an item (override or global)
  const getItemBillingCycle = (itemId: string) => itemBillingOverrides[itemId] || globalBillingCycle;

  // Toggle individual item billing cycle
  const toggleItemBilling = (itemId: string) => {
    const currentCycle = getItemBillingCycle(itemId);
    const newCycle = currentCycle === 'monthly' ? 'annual' : 'monthly';

    if (newCycle === globalBillingCycle) {
      setItemBillingOverrides(prev => {
        const updated = { ...prev };
        delete updated[itemId];
        return updated;
      });
    } else {
      setItemBillingOverrides(prev => ({ ...prev, [itemId]: newCycle }));
    }
  };

  // Get price and billing cycle for an item
  const getItemPrice = (itemId: string, monthlyPrice: number) => {
    const cycle = getItemBillingCycle(itemId);
    return {
      price: cycle === 'annual' ? getAnnualPrice(monthlyPrice) : monthlyPrice,
      cycle,
      displayPrice: cycle === 'annual' ? `$${getAnnualPrice(monthlyPrice)}/yr` : `$${monthlyPrice}/mo`
    };
  };

  const handleAddToCart = (id: string, name: string, monthlyPrice: number, type: 'plan' | 'addon') => {
    const { price, cycle } = getItemPrice(id, monthlyPrice);
    addToCart(id, name, price, type, cycle);
    toast({
      title: "Added to cart",
      description: `${name} has been added to your cart`,
    });
  };

  // Check if user has client portal access - must have BOTH clientId AND authToken
  useEffect(() => {
    const checkClientPortal = () => {
      const clientId = sessionStorage.getItem("clientId");
      const authToken = sessionStorage.getItem("authToken");
      
      // Only consider user logged in if they have BOTH tokens
      if (clientId && authToken) {
        setHasClientPortalAccess(true);
      } else {
        setHasClientPortalAccess(false);
        // Clean up stale data
        if (clientId || authToken) {
          sessionStorage.removeItem("clientId");
          sessionStorage.removeItem("authToken");
          localStorage.removeItem("clientId");
        }
      }
    };

    checkClientPortal();

    // Check periodically in case session changes (every 5 seconds)
    const interval = setInterval(checkClientPortal, 5000);
    return () => clearInterval(interval);
  }, []);

  // Track cart count (used by Pricing menu only)
  useEffect(() => {
    setCartCount(getCartCount());

    const handleCartUpdate = () => {
      setCartCount(getCartCount());
    };

    window.addEventListener('cartUpdated', handleCartUpdate);
    return () => window.removeEventListener('cartUpdated', handleCartUpdate);
  }, []);

  // User is logged in if they have Replit Auth OR Client Portal access
  const isLoggedIn = isAuthenticated || hasClientPortalAccess;

  return (
    <header className="bg-gray-100 border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between lg:h-20 h-16">
          {/* Logo - Takes up ~1/5 of header width */}
          <div className="flex items-center w-1/5 min-w-fit mr-4">
            <Link href="/" className="hover:opacity-80 transition-opacity cursor-pointer" data-testid="header-logo">
              <BrandLogo brand="businessblueprint" size="md" />
            </Link>

            {showNavigation && (
              <>
                {/* Desktop Mega Menu - Closer spacing
                    NOTE: Menu items rendered below MUST match NAV_ITEMS order and labels.
                    Update navigation-config.ts and sync both desktop/mobile. */}
                <NavigationMenu className="hidden lg:flex ml-4">
                  <NavigationMenuList className="-space-x-4">
                    {/* How It Works - Desktop Mega Menu Item */}
                    <NavigationMenuItem>
                      <NavigationMenuTrigger className="flex items-center space-x-1 bg-gray-100" data-testid="menu-trigger-how-it-works">
                        <img src={compassIcon} alt="" className="w-4 h-4" />
                        <span>How It Works</span>
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <div className="p-4 w-[90vw] max-w-[600px]">
                          <div className="mb-4">
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                              A Blueprint to your growth
                            </h3>
                            <p className="text-xs text-gray-600 dark:text-gray-400">
                              Custom digital growth plan based on AI analysis of your business
                            </p>
                          </div>

                          <div className="space-y-3">
                            <Link href="/assessment" className="block" data-testid="link-how-it-works-step1-blueprint">
                              <div className="flex items-start gap-2 p-2 rounded-lg border-l-4 hover:transition-colors cursor-pointer" style={{ borderColor: '#A00028', backgroundColor: 'transparent' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#fafafa'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
                                <div className="flex-shrink-0 -mt-2">
                                  <img src={badge1} alt="Step 1" className="w-10 h-10 object-contain" />
                                </div>
                                <div className="text-left">
                                  <div className="font-bold text-sm text-gray-900 dark:text-white">Complete Your Digital IQ Assessment</div>
                                  <p className="text-xs text-gray-600 dark:text-gray-400">
                                    You start with a quick assessment, and we generate your custom blueprint.
                                  </p>
                                </div>
                              </div>
                            </Link>

                            <div className="flex items-start gap-2 p-2 rounded-lg border-l-4 border-yellow-500">
                              <div className="flex-shrink-0 -mt-2">
                                <img src={badge2} alt="Step 2" className="w-10 h-10 object-contain" />
                              </div>
                              <div className="text-left">
                                <div className="font-bold text-sm text-gray-900 dark:text-white">Prescribed Blueprint</div>
                                <p className="text-xs text-gray-600 dark:text-gray-400">
                                  Your custom action plan with SEO, content strategy, and revenue-focused steps.
                                </p>
                              </div>
                            </div>

                            <Link href="/localblue" className="block" data-testid="link-how-it-works-step3-localblue">
                              <div className="flex items-start gap-2 p-2 rounded-lg border-l-4 border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-950 transition-colors cursor-pointer">
                                <div className="flex-shrink-0 -mt-2">
                                  <img src={badge3} alt="Step 3" className="w-10 h-10 object-contain" />
                                </div>
                                <div className="text-left">
                                  <div className="font-bold text-sm text-gray-900 dark:text-white">
                                    <img src={localBlueLogo} alt="LocalBlue" className="h-4" />
                                  </div>
                                  <p className="text-xs text-gray-600 dark:text-gray-400">
                                    Listings management + reputation building for stronger local visibility.
                                  </p>
                                </div>
                              </div>
                            </Link>

                            <Link href="/ai-coach" className="block" data-testid="link-how-it-works-step4-coach-blue">
                              <div className="flex items-start gap-2 p-2 rounded-lg border-l-4 border-purple-500 hover:bg-purple-50 dark:hover:bg-purple-950 transition-colors cursor-pointer">
                                <div className="flex-shrink-0 -mt-2">
                                  <img src={badge4} alt="Step 4" className="w-10 h-10 object-contain" />
                                </div>
                                <div className="text-left">
                                  <div className="font-bold text-sm text-gray-900 dark:text-white">Coach Blue</div>
                                  <p className="text-xs text-gray-600 dark:text-gray-400">
                                    24/7 AI business coach guiding you through every step of your growth journey.
                                  </p>
                                </div>
                              </div>
                            </Link>

                            <Link href="/pricing?addon=commverse" className="block" data-testid="link-how-it-works-step5-commverse">
                              <div className="flex items-start gap-2 p-2 rounded-lg border-l-4 border-green-500 hover:bg-green-50 dark:hover:bg-green-950 transition-colors cursor-pointer">
                                <div className="flex-shrink-0 -mt-2">
                                  <img src={badge5} alt="Step 5" className="w-10 h-10 object-contain" />
                                </div>
                                <div className="text-left">
                                  <div className="font-bold text-sm text-gray-900 dark:text-white">
                                    <img src={commverseBundle} alt="commverse" className="h-5" />
                                  </div>
                                  <p className="text-xs text-gray-600 dark:text-gray-400">
                                    Complete communication suite: /send, /inbox, /livechat, /content.
                                  </p>
                                </div>
                              </div>
                            </Link>
                          </div>

                          <div className="mt-6">
                            <Link href="/assessment">
                              <Button className="w-full text-white" style={{ backgroundColor: '#A00028' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#800020'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#A00028'} data-testid="button-start-blueprint">
                                Start Your Blueprint Assessment →
                              </Button>
                            </Link>
                          </div>
                        </div>
                      </NavigationMenuContent>
                    </NavigationMenuItem>

                    {/* Products (Merged Applications + Pricing) */}
                    <NavigationMenuItem>
                      <NavigationMenuTrigger className="flex items-center space-x-1 bg-gray-100" data-testid="menu-trigger-products">
                        <img src={shoppingBasketIcon} alt="" className="w-4 h-4" />
                        <span>Products</span>
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <div className="p-2 w-[900px]">
                          {/* MASTER BILLING CYCLE TOGGLE */}
                          <div className="flex items-center justify-center mb-2 pb-2 border-b border-gray-300">
                            <div className="flex items-center gap-3 bg-white rounded-full border-2 border-blue-600 p-1">
                              <button
                                onClick={() => setGlobalBillingCycle('monthly')}
                                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                                  globalBillingCycle === 'monthly'
                                    ? 'bg-blue-600 text-white'
                                    : 'text-gray-600 hover:text-blue-600'
                                }`}
                                data-testid="toggle-global-monthly"
                              >
                                Monthly
                              </button>
                              <button
                                onClick={() => setGlobalBillingCycle('annual')}
                                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                                  globalBillingCycle === 'annual'
                                    ? 'bg-blue-600 text-white'
                                    : 'text-gray-600 hover:text-blue-600'
                                }`}
                                data-testid="toggle-global-annual"
                              >
                                Annual <span className="text-green-600">Save 20%</span>
                              </button>
                            </div>
                          </div>

                          {/* TOP ROW: DIGITAL IQ + COACH BLUE (50/50) */}
                          <div className="grid grid-cols-2 gap-2 mb-3">
                            {/* Digital IQ Assessment - FREE */}
                            <div className="p-2 rounded-lg border-2 hover:shadow-lg transition-all" style={{ borderColor: '#A00028' }}>
                              <div className="flex items-start justify-between mb-1">
                                <div className="flex items-center gap-1.5">
                                  <img src={badge1} alt="" className="w-6 h-6" />
                                  <div>
                                    <p className="text-sm font-bold text-gray-900">Digital IQ Assessment</p>
                                    <p className="text-xs text-gray-500">Free Business Intelligence Tool</p>
                                  </div>
                                </div>
                              </div>
                              <div className="flex items-end justify-between">
                                <div>
                                  <div className="text-lg font-extrabold mb-1" style={{ color: '#A00028' }}>
                                    Free
                                  </div>
                                  <p className="text-xs text-gray-600">Discover your business opportunities</p>
                                </div>
                                <a 
                                  href="/assessment" 
                                  className="px-3 py-1.5 rounded text-sm font-bold text-white hover:opacity-90 transition-opacity"
                                  style={{ backgroundColor: '#A00028' }}
                                  data-testid="button-start-assessment"
                                >
                                  Start Assessment →
                                </a>
                              </div>
                            </div>

                            {/* Coach Blue */}
                            <div className="p-2 rounded-lg border-2 hover:shadow-lg transition-all" style={{ borderColor: '#A855F7' }}>
                              <div className="flex items-start justify-between mb-1">
                                <div className="flex items-center gap-1.5">
                                  <img src={badge4} alt="" className="w-6 h-6" />
                                  <div>
                                    <p className="text-sm font-bold text-gray-900">Coach Blue</p>
                                    <p className="text-xs text-gray-500">AI Business Coach</p>
                                  </div>
                                </div>
                                <button
                                  onClick={() => toggleItemBilling('coach-blue')}
                                  className="text-xs font-bold px-3 py-1 rounded border-2 border-purple-600 hover:bg-purple-50"
                                  data-testid="toggle-coach-blue"
                                >
                                  {getItemBillingCycle('coach-blue') === 'monthly' ? 'Mo' : 'Yr'}
                                </button>
                              </div>
                              <div className="flex items-end justify-between">
                                <div>
                                  <div className="text-lg font-extrabold mb-1" style={{ color: '#A855F7' }}>
                                    {getItemPrice('coach-blue', 99).displayPrice}
                                  </div>
                                  <a href="/ai-coach" className="text-xs font-bold text-blue-600 hover:underline">Learn More →</a>
                                </div>
                                <button
                                  onClick={() => handleAddToCart('coach-blue', 'Coach Blue', 99, 'addon')}
                                  className="text-lg font-bold w-8 h-8 rounded-full text-white flex items-center justify-center"
                                  style={{ backgroundColor: '#A855F7' }}
                                  data-testid="button-add-coach-blue"
                                  title="Add to Cart"
                                >
                                  +
                                </button>
                              </div>
                            </div>
                          </div>

                          {/* LOCALBLUE BUNDLE - FULL WIDTH */}
                          <div className="mb-3">
                            <h4 className="text-[10px] font-bold text-gray-700 mb-2 uppercase tracking-wide">
                              LOCALBLUE BUNDLE
                            </h4>
                            {/* Bundle Card */}
                            <div className="p-2 rounded-lg border-2 mb-2 hover:shadow-lg transition-all" style={{ borderColor: '#6EA6FF' }}>
                              <div className="flex items-center justify-between mb-1">
                                <div className="flex items-center gap-1.5">
                                  <img src={localblueIcon} alt="" className="w-6 h-6" />
                                  <img src={localblueWordmark} alt="LocalBlue Bundle" className="h-8" />
                                </div>
                                <button
                                  onClick={() => toggleItemBilling('localblue-bundle')}
                                  className="text-xs font-bold px-3 py-1 rounded border-2 border-blue-600 hover:bg-blue-50"
                                  data-testid="toggle-localblue-bundle"
                                >
                                  {getItemBillingCycle('localblue-bundle') === 'monthly' ? 'Mo' : 'Yr'}
                                </button>
                              </div>
                              <div className="flex items-end justify-between">
                                <div>
                                  <p className="text-xs text-gray-600 mb-1">Includes both applications below</p>
                                  <div className="text-lg font-extrabold mb-1" style={{ color: '#6EA6FF' }}>
                                    {getItemPrice('localblue-bundle', 60).displayPrice}
                                  </div>
                                  <a href="/localblue" className="text-xs font-bold text-blue-600 hover:underline">Learn More →</a>
                                </div>
                                <button
                                  onClick={() => handleAddToCart('localblue-bundle', 'LocalBlue Bundle', 60, 'addon')}
                                  className="text-lg font-bold w-8 h-8 rounded-full text-white flex items-center justify-center"
                                  style={{ backgroundColor: '#6EA6FF' }}
                                  data-testid="button-add-localblue-bundle"
                                  title="Add to Cart"
                                >
                                  +
                                </button>
                              </div>
                            </div>

                            {/* 2 Apps in a Row */}
                            <div className="grid grid-cols-2 gap-2">
                              {/* /listings */}
                              <div className="p-2 rounded-lg border-2 hover:shadow-lg transition-all" style={{ borderColor: '#FF0040' }}>
                                <div className="flex items-start justify-between mb-1">
                                  <div className="flex items-center gap-1.5">
                                    <img src={listingsIcon} alt="" className="w-5 h-5" />
                                    <img src={listingsWordmark} alt="/listings" className="h-4" />
                                  </div>
                                  <button
                                    onClick={() => handleAddToCart('listings-addon', '/listings', 40, 'addon')}
                                    className="text-base font-bold w-5 h-5 rounded-full text-white flex items-center justify-center flex-shrink-0"
                                    style={{ backgroundColor: '#FF0040' }}
                                    data-testid="button-add-listings"
                                    title="Add to Cart"
                                  >
                                    +
                                  </button>
                                </div>
                                <div className="border-t pt-1">
                                  <div className="text-xs font-extrabold mb-0.5" style={{ color: '#FF0040' }}>
                                    {getItemPrice('listings-addon', 40).displayPrice}
                                  </div>
                                  <a href="/listings" className="text-xs font-bold text-blue-600 hover:underline">Learn More →</a>
                                </div>
                              </div>

                              {/* /reputation */}
                              <div className="p-2 rounded-lg border-2 hover:shadow-lg transition-all" style={{ borderColor: '#D59600' }}>
                                <div className="flex items-start justify-between mb-1">
                                  <div className="flex items-center gap-1.5">
                                    <img src={reputationIcon} alt="" className="w-5 h-5" />
                                    <img src={reputationWordmark} alt="/reputation" className="h-4" />
                                  </div>
                                  <button
                                    onClick={() => handleAddToCart('reputation-management', '/reputation', 40, 'addon')}
                                    className="text-base font-bold w-5 h-5 rounded-full text-white flex items-center justify-center flex-shrink-0"
                                    style={{ backgroundColor: '#D59600' }}
                                    data-testid="button-add-reputation"
                                    title="Add to Cart"
                                  >
                                    +
                                  </button>
                                </div>
                                <div className="border-t pt-1">
                                  <div className="text-xs font-extrabold mb-0.5" style={{ color: '#D59600' }}>
                                    {getItemPrice('reputation-management', 40).displayPrice}
                                  </div>
                                  <a href="/reputation" className="text-xs font-bold text-blue-600 hover:underline">Learn More →</a>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* COMMVERSE BUNDLE - FULL WIDTH */}
                          <div>
                              <h4 className="text-[10px] font-bold text-gray-700 mb-2 uppercase tracking-wide">
                                COMMVERSE BUNDLE
                              </h4>
                              {/* Bundle Card */}
                              <div className="p-2 rounded-lg border-2 mb-2 hover:shadow-lg transition-all" style={{ borderColor: '#FF6B00' }}>
                                <div className="flex items-center justify-between mb-1">
                                  <div className="flex items-center gap-1.5">
                                    <img src={commverseIcon} alt="" className="w-6 h-6" />
                                    <img src={commverseWordmark} alt="Commverse Bundle" className="h-8" />
                                  </div>
                                  <button
                                    onClick={() => toggleItemBilling('bundle')}
                                    className="text-xs font-bold px-3 py-1 rounded border-2 hover:bg-orange-50"
                                    style={{ borderColor: '#FF6B00' }}
                                    data-testid="toggle-commverse-bundle"
                                  >
                                    {getItemBillingCycle('bundle') === 'monthly' ? 'Mo' : 'Yr'}
                                  </button>
                                </div>
                                <div className="flex items-end justify-between">
                                  <div>
                                    <p className="text-xs text-gray-600 mb-1">Includes all 4 applications below</p>
                                    <div className="text-lg font-extrabold mb-1" style={{ color: '#FF6B00' }}>
                                      {getItemPrice('bundle', 100).displayPrice}
                                    </div>
                                    <a href="/commverse" className="text-xs font-bold text-blue-600 hover:underline">Learn More →</a>
                                  </div>
                                  <button
                                    onClick={() => handleAddToCart('bundle', 'Commverse Bundle', 100, 'addon')}
                                    className="text-lg font-bold w-8 h-8 rounded-full text-white flex items-center justify-center"
                                    style={{ backgroundColor: '#FF6B00' }}
                                    data-testid="button-add-commverse-bundle"
                                    title="Add to Cart"
                                  >
                                    +
                                  </button>
                                </div>
                              </div>

                              {/* 4 Apps in a Row */}
                              <div className="grid grid-cols-4 gap-2">
                                {/* /send */}
                                <div className="p-2 rounded-lg border-2 hover:shadow-lg transition-all" style={{ borderColor: '#FFFF00', boxShadow: '0 0 0 1px #000000' }}>
                              <div className="flex items-start justify-between mb-1">
                                <div className="flex items-center gap-1.5">
                                  <img src={sendIcon} alt="" className="w-5 h-5" />
                                  <img src={sendWordmark} alt="/send" className="h-3.5" />
                                </div>
                                <button
                                  onClick={() => handleAddToCart('send-addon', '/send', 35, 'addon')}
                                  className="text-base font-bold w-5 h-5 rounded-full text-white flex items-center justify-center flex-shrink-0"
                                  style={{ backgroundColor: '#FF6B00' }}
                                  data-testid="button-add-send"
                                  title="Add to Cart"
                                >
                                  +
                                </button>
                              </div>
                              <div className="border-t pt-1">
                                <div className="text-xs font-extrabold mb-0.5" style={{ color: '#FF6B00' }}>
                                  {getItemPrice('send-addon', 35).displayPrice}
                                </div>
                                <a href="/send" className="text-xs font-bold text-blue-600 hover:underline">Learn More →</a>
                              </div>
                            </div>

                            {/* /inbox */}
                            <div className="p-2 rounded-lg border-2 hover:shadow-lg transition-all" style={{ borderColor: '#0080FF' }}>
                              <div className="flex items-start justify-between mb-1">
                                <div className="flex items-center gap-1.5">
                                  <img src={inboxIcon} alt="" className="w-5 h-5" />
                                  <img src={inboxWordmark} alt="/inbox" className="h-4" />
                                </div>
                                <button
                                  onClick={() => handleAddToCart('inbox-addon', '/inbox', 35, 'addon')}
                                  className="text-base font-bold w-5 h-5 rounded-full text-white flex items-center justify-center flex-shrink-0"
                                  style={{ backgroundColor: '#0080FF' }}
                                  data-testid="button-add-inbox"
                                  title="Add to Cart"
                                >
                                  +
                                </button>
                              </div>
                              <div className="border-t pt-1">
                                <div className="text-xs font-extrabold mb-0.5" style={{ color: '#0080FF' }}>
                                  {getItemPrice('inbox-addon', 35).displayPrice}
                                </div>
                                <a href="/inbox" className="text-xs font-bold text-blue-600 hover:underline">Learn More →</a>
                              </div>
                            </div>

                            {/* /livechat */}
                            <div className="p-2 rounded-lg border-2 hover:shadow-lg transition-all" style={{ borderColor: '#8000FF' }}>
                              <div className="flex items-start justify-between mb-1">
                                <div className="flex items-center gap-1.5">
                                  <img src={livechatIcon} alt="" className="w-5 h-5" />
                                  <img src={livechatWordmark} alt="/livechat" className="h-4" />
                                </div>
                                <button
                                  onClick={() => handleAddToCart('livechat-addon', '/livechat', 35, 'addon')}
                                  className="text-base font-bold w-5 h-5 rounded-full text-white flex items-center justify-center flex-shrink-0"
                                  style={{ backgroundColor: '#8000FF' }}
                                  data-testid="button-add-livechat"
                                  title="Add to Cart"
                                >
                                  +
                                </button>
                              </div>
                              <div className="border-t pt-1">
                                <div className="text-xs font-extrabold mb-0.5" style={{ color: '#8000FF' }}>
                                  {getItemPrice('livechat-addon', 35).displayPrice}
                                </div>
                                <a href="/livechat" className="text-xs font-bold text-blue-600 hover:underline">Learn More →</a>
                              </div>
                            </div>

                            {/* /content */}
                            <div className="p-2 rounded-lg border-2 hover:shadow-lg transition-all" style={{ borderColor: '#E91EBC' }}>
                              <div className="flex items-start justify-between mb-1">
                                <div className="flex items-center gap-1.5">
                                  <img src={contentIcon} alt="" className="w-5 h-5" />
                                  <img src={contentWordmark} alt="/content" className="h-4" />
                                </div>
                                <button
                                  onClick={() => handleAddToCart('content-addon', '/content', 35, 'addon')}
                                  className="text-base font-bold w-5 h-5 rounded-full text-white flex items-center justify-center flex-shrink-0"
                                  style={{ backgroundColor: '#E91EBC' }}
                                  data-testid="button-add-content"
                                  title="Add to Cart"
                                >
                                  +
                                </button>
                              </div>
                              <div className="border-t pt-1">
                                <div className="text-xs font-extrabold mb-0.5" style={{ color: '#E91EBC' }}>
                                  {getItemPrice('content-addon', 35).displayPrice}
                                </div>
                                <a href="/content" className="text-xs font-bold text-blue-600 hover:underline">Learn More →</a>
                              </div>
                            </div>
                          </div>
                        </div>
                        </div>
                      </NavigationMenuContent>
                    </NavigationMenuItem>

                    {/* Solutions - All 13 Items */}
                    <NavigationMenuItem>
                      <NavigationMenuTrigger className="flex items-center space-x-1 bg-gray-100" data-testid="menu-trigger-solutions">
                        <img src={lightbulbIcon} alt="" className="w-4 h-4" />
                        <span>Solutions</span>
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <div className="p-4 w-[90vw] max-w-[900px]">
                          <div className="grid grid-cols-3 gap-3">
                            {/* Row 1: Main Platforms */}
                            <NavigationMenuLink asChild>
                              <a href="/" className="flex flex-col items-center p-3 rounded-lg border-2 hover:shadow-lg transition-all cursor-pointer" style={{ borderColor: '#FF6B00' }} data-testid="link-solution-businessblueprint">
                                <img src={blueprintIcon} alt="BusinessBlueprint" className="h-12 w-12 object-contain mb-2" />
                                <div className="text-sm font-bold text-gray-900 dark:text-white text-center">BusinessBlueprint</div>
                                <p className="text-xs text-gray-600 dark:text-gray-400 text-center">Digital Intelligence</p>
                              </a>
                            </NavigationMenuLink>

                            <NavigationMenuLink asChild>
                              <a href="#hostsblue" className="flex flex-col items-center p-3 rounded-lg border-2 hover:shadow-lg transition-all cursor-pointer" style={{ borderColor: '#8000FF' }} data-testid="link-solution-hostsblue">
                                <img src={hostsBlueIcon} alt="HostsBlue" className="h-12 w-12 object-contain mb-2" />
                                <div className="text-sm font-bold text-gray-900 dark:text-white text-center">HostsBlue</div>
                                <p className="text-xs text-gray-600 dark:text-gray-400 text-center">Web Services</p>
                              </a>
                            </NavigationMenuLink>

                            <NavigationMenuLink asChild>
                              <a href="#swipesblue" className="flex flex-col items-center p-3 rounded-lg border-2 hover:shadow-lg transition-all cursor-pointer" style={{ borderColor: '#FF0040' }} data-testid="link-solution-swipesblue">
                                <img src={swipesBlueIcon} alt="SwipesBlue" className="h-12 w-12 object-contain mb-2" />
                                <div className="text-sm font-bold text-gray-900 dark:text-white text-center">SwipesBlue</div>
                                <p className="text-xs text-gray-600 dark:text-gray-400 text-center">Payment Gateway</p>
                              </a>
                            </NavigationMenuLink>

                            {/* Row 2: New Platforms */}
                            <NavigationMenuLink asChild>
                              <a href="#consoleblue" className="flex flex-col items-center p-3 rounded-lg border-2 hover:shadow-lg transition-all cursor-pointer" style={{ borderColor: '#0000FF' }} data-testid="link-solution-consoleblue">
                                <img src={consoleBluelogo} alt="ConsoleBlue" className="h-12 w-12 object-contain mb-2" />
                                <div className="text-sm font-bold text-gray-900 dark:text-white text-center">ConsoleBlue</div>
                                <p className="text-xs text-gray-600 dark:text-gray-400 text-center">Admin Console</p>
                              </a>
                            </NavigationMenuLink>

                            <NavigationMenuLink asChild>
                              <a href="#siteinspector" className="flex flex-col items-center p-3 rounded-lg border-2 hover:shadow-lg transition-all cursor-pointer" style={{ borderColor: '#0000FF' }} data-testid="link-solution-siteinspector">
                                <img src={siteInspectorIcon} alt="SiteInspector" className="h-12 w-12 object-contain mb-2" />
                                <div className="text-sm font-bold text-gray-900 dark:text-white text-center">SiteInspector</div>
                                <p className="text-xs text-gray-600 dark:text-gray-400 text-center">Site Analysis</p>
                              </a>
                            </NavigationMenuLink>

                            {/* Row 2 Col 3: AI Business Coach */}
                            <NavigationMenuLink asChild>
                              <a href="/ai-coach" className="flex flex-col items-center p-3 rounded-lg border-2 hover:shadow-lg transition-all cursor-pointer" style={{ borderColor: '#A855F7' }} data-testid="link-solution-ai-coach">
                                <img src={badge4} alt="AI Business Coach" className="h-12 w-12 object-contain mb-2" />
                                <div className="text-sm font-bold text-gray-900 dark:text-white text-center">AI Business Coach</div>
                                <p className="text-xs text-gray-600 dark:text-gray-400 text-center">Smart Guidance</p>
                              </a>
                            </NavigationMenuLink>

                            {/* Row 3: Digital IQ + Commverse Apps */}
                            <NavigationMenuLink asChild>
                              <a href="/assessment" className="flex flex-col items-center p-3 rounded-lg border-2 hover:shadow-lg transition-all cursor-pointer" style={{ borderColor: '#A00028' }} data-testid="link-solution-digital-iq">
                                <img src={badge1} alt="Digital IQ" className="h-12 w-12 object-contain mb-2" />
                                <div className="text-sm font-bold text-gray-900 dark:text-white text-center">Digital IQ</div>
                                <p className="text-xs text-gray-600 dark:text-gray-400 text-center">Business Assessment</p>
                              </a>
                            </NavigationMenuLink>

                            <NavigationMenuLink asChild>
                              <a href="/send" className="flex flex-col items-center p-3 rounded-lg border-2 hover:shadow-lg transition-all cursor-pointer" style={{ borderColor: '#FF6B00' }} data-testid="link-solution-send">
                                <img src={sendIcon} alt="/send" className="h-12 w-12 object-contain mb-2" />
                                <div className="text-sm font-bold text-gray-900 dark:text-white text-center">/send</div>
                                <p className="text-xs text-gray-600 dark:text-gray-400 text-center">Email & SMS</p>
                              </a>
                            </NavigationMenuLink>

                            <NavigationMenuLink asChild>
                              <a href="/inbox" className="flex flex-col items-center p-3 rounded-lg border-2 hover:shadow-lg transition-all cursor-pointer" style={{ borderColor: '#0080FF' }} data-testid="link-solution-inbox">
                                <img src={inboxIcon} alt="/inbox" className="h-12 w-12 object-contain mb-2" />
                                <div className="text-sm font-bold text-gray-900 dark:text-white text-center">/inbox</div>
                                <p className="text-xs text-gray-600 dark:text-gray-400 text-center">Unified Comms</p>
                              </a>
                            </NavigationMenuLink>

                            {/* Row 4: More Apps */}
                            <NavigationMenuLink asChild>
                              <a href="/livechat" className="flex flex-col items-center p-3 rounded-lg border-2 hover:shadow-lg transition-all cursor-pointer" style={{ borderColor: '#8000FF' }} data-testid="link-solution-livechat">
                                <img src={livechatIcon} alt="/livechat" className="h-12 w-12 object-contain mb-2" />
                                <div className="text-sm font-bold text-gray-900 dark:text-white text-center">/livechat</div>
                                <p className="text-xs text-gray-600 dark:text-gray-400 text-center">Live Chat</p>
                              </a>
                            </NavigationMenuLink>

                            <NavigationMenuLink asChild>
                              <a href="/content-landing" className="flex flex-col items-center p-3 rounded-lg border-2 hover:shadow-lg transition-all cursor-pointer" style={{ borderColor: '#E91EBC' }} data-testid="link-solution-content">
                                <img src={contentIcon} alt="/content" className="h-12 w-12 object-contain mb-2" />
                                <div className="text-sm font-bold text-gray-900 dark:text-white text-center">/content</div>
                                <p className="text-xs text-gray-600 dark:text-gray-400 text-center">Social Media</p>
                              </a>
                            </NavigationMenuLink>

                            <NavigationMenuLink asChild>
                              <a href="/listings-landing" className="flex flex-col items-center p-3 rounded-lg border-2 hover:shadow-lg transition-all cursor-pointer" style={{ borderColor: '#FF0040' }} data-testid="link-solution-listings">
                                <img src={listingsIcon} alt="/listings" className="h-12 w-12 object-contain mb-2" />
                                <div className="text-sm font-bold text-gray-900 dark:text-white text-center">/listings</div>
                                <p className="text-xs text-gray-600 dark:text-gray-400 text-center">Directory Sync</p>
                              </a>
                            </NavigationMenuLink>

                            {/* Row 5: Last App */}
                            <NavigationMenuLink asChild>
                              <a href="/reputation-landing" className="flex flex-col items-center p-3 rounded-lg border-2 hover:shadow-lg transition-all cursor-pointer" style={{ borderColor: '#D59600' }} data-testid="link-solution-reputation">
                                <img src={reputationIcon} alt="/reputation" className="h-12 w-12 object-contain mb-2" />
                                <div className="text-sm font-bold text-gray-900 dark:text-white text-center">/reputation</div>
                                <p className="text-xs text-gray-600 dark:text-gray-400 text-center">Review Mgmt</p>
                              </a>
                            </NavigationMenuLink>
                          </div>
                        </div>
                      </NavigationMenuContent>
                    </NavigationMenuItem>

                    {/* Resources - Keep Current */}
                    <NavigationMenuItem>
                      <NavigationMenuTrigger className="flex items-center space-x-1 bg-gray-100" data-testid="menu-trigger-resources">
                        <img src={bookOpenIcon} alt="" className="w-4 h-4" />
                        <span>Resources</span>
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <div className="grid grid-cols-3 gap-4 p-6 w-[90vw] max-w-[700px]">
                          {/* Learning Column */}
                          <div className="space-y-3">
                            <div className="flex items-center gap-2 mb-2">
                              <img src={graduationCapIcon} alt="" className="w-4 h-4" style={{ filter: 'invert(31%) sepia(100%) saturate(2000%) hue-rotate(205deg) brightness(95%) contrast(101%)' }} />
                              <h4 className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wide">Learn</h4>
                            </div>
                            <NavigationMenuLink asChild>
                              <a
                                className="group flex items-start space-x-2 rounded-md p-2 leading-none no-underline outline-none transition-colors hover:bg-accent"
                                href="/journey"
                                data-testid="link-resources-journey"
                              >
                                <img src={compassIcon} alt="" className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ filter: 'invert(50%) sepia(10%) saturate(100%) hue-rotate(180deg) brightness(90%) contrast(90%)' }} />
                                <div>
                                  <div className="text-sm font-medium text-gray-900 dark:text-white">Getting Started Guide</div>
                                  <p className="text-xs text-gray-600 dark:text-gray-400">5-step digital growth journey</p>
                                </div>
                              </a>
                            </NavigationMenuLink>
                            <NavigationMenuLink asChild>
                              <a
                                className="group flex items-start space-x-2 rounded-md p-2 leading-none no-underline outline-none transition-colors hover:bg-accent"
                                href="/about"
                                data-testid="link-resources-success"
                              >
                                <img src={trendingUpIcon} alt="" className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ filter: 'invert(50%) sepia(10%) saturate(100%) hue-rotate(180deg) brightness(90%) contrast(90%)' }} />
                                <div>
                                  <div className="text-sm font-medium text-gray-900 dark:text-white">Success Stories</div>
                                  <p className="text-xs text-gray-600 dark:text-gray-400">Real results from businesses</p>
                                </div>
                              </a>
                            </NavigationMenuLink>
                            <NavigationMenuLink asChild>
                              <a
                                className="group flex items-start space-x-2 rounded-md p-2 leading-none no-underline outline-none transition-colors hover:bg-accent"
                                href="/biif"
                                data-testid="link-resources-biif"
                              >
                                <img src={videoIcon} alt="" className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ filter: 'invert(50%) sepia(10%) saturate(100%) hue-rotate(180deg) brightness(90%) contrast(90%)' }} />
                                <div>
                                  <div className="text-sm font-medium text-gray-900 dark:text-white">Video Tutorials</div>
                                  <p className="text-xs text-gray-600 dark:text-gray-400">Step-by-step walkthroughs</p>
                                </div>
                              </a>
                            </NavigationMenuLink>
                          </div>

                          {/* Platforms Column */}
                          <div className="space-y-3">
                            <div className="flex items-center gap-2 mb-2">
                              <img src={compassIcon} alt="" className="w-4 h-4" style={{ filter: 'invert(55%) sepia(89%) saturate(1787%) hue-rotate(359deg) brightness(102%) contrast(101%)' }} />
                              <h4 className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wide">Platforms</h4>
                            </div>
                            <NavigationMenuLink asChild>
                              <a
                                className="group flex items-start space-x-2 rounded-md p-2 leading-none no-underline outline-none transition-colors hover:bg-accent"
                                href="/"
                                data-testid="link-resources-businessblueprint"
                              >
                                <div className="w-4 h-4 mt-0.5 flex-shrink-0">
                                  <img src={bbIcon} alt="BusinessBlueprint" className="w-full h-full object-contain" />
                                </div>
                                <div>
                                  <div className="text-sm font-medium text-gray-900 dark:text-white">BusinessBlueprint</div>
                                  <p className="text-xs text-gray-600 dark:text-gray-400">Digital intelligence platform</p>
                                </div>
                              </a>
                            </NavigationMenuLink>
                            <NavigationMenuLink asChild>
                              <a
                                className="group flex items-start space-x-2 rounded-md p-2 leading-none no-underline outline-none transition-colors hover:bg-accent"
                                href="#hostsblue"
                                data-testid="link-resources-hostsblue"
                              >
                                <div className="w-4 h-4 mt-0.5 flex-shrink-0">
                                  <img src={hostsBlueIcon} alt="HostsBlue" className="w-full h-full object-contain" />
                                </div>
                                <div>
                                  <div className="text-sm font-medium text-gray-900 dark:text-white">HostsBlue</div>
                                  <p className="text-xs text-gray-600 dark:text-gray-400">Website hosting & builder</p>
                                </div>
                              </a>
                            </NavigationMenuLink>
                            <NavigationMenuLink asChild>
                              <a
                                className="group flex items-start space-x-2 rounded-md p-2 leading-none no-underline outline-none transition-colors hover:bg-accent"
                                href="#swipesblue"
                                data-testid="link-resources-swipesblue"
                              >
                                <div className="w-4 h-4 mt-0.5 flex-shrink-0">
                                  <img src={swipesBlueIcon} alt="SwipesBlue" className="w-full h-full object-contain" />
                                </div>
                                <div>
                                  <div className="text-sm font-medium text-gray-900 dark:text-white">SwipesBlue</div>
                                  <p className="text-xs text-gray-600 dark:text-gray-400">Payment gateway</p>
                                </div>
                              </a>
                            </NavigationMenuLink>
                            <NavigationMenuLink asChild>
                              <a
                                className="group flex items-start space-x-2 rounded-md p-2 leading-none no-underline outline-none transition-colors hover:bg-accent"
                                href="#consoleblue"
                                data-testid="link-resources-consoleblue"
                              >
                                <div className="w-4 h-4 mt-0.5 flex-shrink-0">
                                  <img src={consoleBluelogo} alt="ConsoleBlue" className="w-full h-full object-contain" />
                                </div>
                                <div>
                                  <div className="text-sm font-medium text-gray-900 dark:text-white">ConsoleBlue</div>
                                  <p className="text-xs text-gray-600 dark:text-gray-400">Admin console</p>
                                </div>
                              </a>
                            </NavigationMenuLink>
                            <NavigationMenuLink asChild>
                              <a
                                className="group flex items-start space-x-2 rounded-md p-2 leading-none no-underline outline-none transition-colors hover:bg-accent"
                                href="#siteinspector"
                                data-testid="link-resources-siteinspector"
                              >
                                <div className="w-4 h-4 mt-0.5 flex-shrink-0">
                                  <img src={siteInspectorIcon} alt="SiteInspector" className="w-full h-full object-contain" />
                                </div>
                                <div>
                                  <div className="text-sm font-medium text-gray-900 dark:text-white">SiteInspector</div>
                                  <p className="text-xs text-gray-600 dark:text-gray-400">Site analysis tool</p>
                                </div>
                              </a>
                            </NavigationMenuLink>
                          </div>

                          {/* Developer Column */}
                          <div className="space-y-3">
                            <div className="flex items-center gap-2 mb-2">
                              <img src={codeIcon} alt="" className="w-4 h-4" style={{ filter: 'invert(35%) sepia(97%) saturate(3738%) hue-rotate(262deg) brightness(93%) contrast(95%)' }} />
                              <h4 className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wide">Developers</h4>
                            </div>
                            <NavigationMenuLink asChild>
                              <a
                                className="group flex items-start space-x-2 rounded-md p-2 leading-none no-underline outline-none transition-colors hover:bg-accent"
                                href="/send-api-docs"
                                data-testid="link-resources-api"
                              >
                                <img src={fileTextIcon} alt="" className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ filter: 'invert(50%) sepia(10%) saturate(100%) hue-rotate(180deg) brightness(90%) contrast(90%)' }} />
                                <div>
                                  <div className="text-sm font-medium text-gray-900 dark:text-white">/send API Docs</div>
                                  <p className="text-xs text-gray-600 dark:text-gray-400">Email & SMS API reference</p>
                                </div>
                              </a>
                            </NavigationMenuLink>
                            <NavigationMenuLink asChild>
                              <a
                                className="group flex items-start space-x-2 rounded-md p-2 leading-none no-underline outline-none transition-colors hover:bg-accent"
                                href="/inbox-api-docs"
                                data-testid="link-resources-inbox-api"
                              >
                                <img src={fileTextIcon} alt="" className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ filter: 'invert(50%) sepia(10%) saturate(100%) hue-rotate(180deg) brightness(90%) contrast(90%)' }} />
                                <div>
                                  <div className="text-sm font-medium text-gray-900 dark:text-white">/inbox API Docs</div>
                                  <p className="text-xs text-gray-600 dark:text-gray-400">Unified communications API</p>
                                </div>
                              </a>
                            </NavigationMenuLink>
                            <NavigationMenuLink asChild>
                              <a
                                className="group flex items-start space-x-2 rounded-md p-2 leading-none no-underline outline-none transition-colors hover:bg-accent"
                                href="/content-api-docs"
                                data-testid="link-resources-content-api"
                              >
                                <img src={fileTextIcon} alt="" className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ filter: 'invert(50%) sepia(10%) saturate(100%) hue-rotate(180deg) brightness(90%) contrast(90%)' }} />
                                <div>
                                  <div className="text-sm font-medium text-gray-900 dark:text-white">/content API Docs</div>
                                  <p className="text-xs text-gray-600 dark:text-gray-400">Social media posting API</p>
                                </div>
                              </a>
                            </NavigationMenuLink>
                            <NavigationMenuLink asChild>
                              <a
                                className="group flex items-start space-x-2 rounded-md p-2 leading-none no-underline outline-none transition-colors hover:bg-accent"
                                href="/livechat-install"
                                data-testid="link-resources-livechat-install"
                              >
                                <img src={codeIcon} alt="" className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ filter: 'invert(50%) sepia(10%) saturate(100%) hue-rotate(180deg) brightness(90%) contrast(90%)' }} />
                                <div>
                                  <div className="text-sm font-medium text-gray-900 dark:text-white">LiveChat Installation</div>
                                  <p className="text-xs text-gray-600 dark:text-gray-400">Widget integration guide</p>
                                </div>
                              </a>
                            </NavigationMenuLink>
                            <NavigationMenuLink asChild>
                              <a
                                className="group flex items-start space-x-2 rounded-md p-2 leading-none no-underline outline-none transition-colors hover:bg-accent"
                                href="/sitemap"
                                data-testid="link-resources-sitemap"
                              >
                                <img src={compassIcon} alt="" className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ filter: 'invert(50%) sepia(10%) saturate(100%) hue-rotate(180deg) brightness(90%) contrast(90%)' }} />
                                <div>
                                  <div className="text-sm font-medium text-gray-900 dark:text-white">Site Map</div>
                                  <p className="text-xs text-gray-600 dark:text-gray-400">Complete navigation</p>
                                </div>
                              </a>
                            </NavigationMenuLink>
                          </div>

                          {/* Support Column */}
                          <div className="space-y-3">
                            <div className="flex items-center gap-2 mb-2">
                              <img src={helpCircleIcon} alt="" className="w-4 h-4" style={{ filter: 'invert(46%) sepia(96%) saturate(589%) hue-rotate(86deg) brightness(92%) contrast(87%)' }} />
                              <h4 className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wide">Support</h4>
                            </div>
                            <NavigationMenuLink asChild>
                              <a
                                className="group flex items-start space-x-2 rounded-md p-2 leading-none no-underline outline-none transition-colors hover:bg-accent"
                                href="/contact"
                                data-testid="link-resources-help"
                              >
                                <img src={messageSquareIcon} alt="" className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ filter: 'invert(50%) sepia(10%) saturate(100%) hue-rotate(180deg) brightness(90%) contrast(90%)' }} />
                                <div>
                                  <div className="text-sm font-medium text-gray-900 dark:text-white">Help Center</div>
                                  <p className="text-xs text-gray-600 dark:text-gray-400">Get answers & support</p>
                                </div>
                              </a>
                            </NavigationMenuLink>
                            <NavigationMenuLink asChild>
                              <a
                                className="group flex items-start space-x-2 rounded-md p-2 leading-none no-underline outline-none transition-colors hover:bg-accent"
                                href="/livechat-demo"
                                data-testid="link-resources-demo"
                              >
                                <img src={messageSquareIcon} alt="" className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ filter: 'invert(50%) sepia(10%) saturate(100%) hue-rotate(180deg) brightness(90%) contrast(90%)' }} />
                                <div>
                                  <div className="text-sm font-medium text-gray-900 dark:text-white">Live Demo</div>
                                  <p className="text-xs text-gray-600 dark:text-gray-400">Try our live chat</p>
                                </div>
                              </a>
                            </NavigationMenuLink>
                            <NavigationMenuLink asChild>
                              <a
                                className="group flex items-start space-x-2 rounded-md p-2 leading-none no-underline outline-none transition-colors hover:bg-accent"
                                href="/portal"
                                data-testid="link-resources-portal"
                              >
                                <img src={usersIcon} alt="" className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ filter: 'invert(50%) sepia(10%) saturate(100%) hue-rotate(180deg) brightness(90%) contrast(90%)' }} />
                                <div>
                                  <div className="text-sm font-medium text-gray-900 dark:text-white">Client Portal</div>
                                  <p className="text-xs text-gray-600 dark:text-gray-400">Manage your account</p>
                                </div>
                              </a>
                            </NavigationMenuLink>

                            {/* Administration Section */}
                            <div className="border-t border-gray-200 pt-2 mt-2">
                              <div className="flex items-center gap-2 mb-2">
                                <img src={settingsIcon} alt="" className="w-4 h-4" style={{ filter: 'invert(46%) sepia(96%) saturate(589%) hue-rotate(86deg) brightness(92%) contrast(87%)' }} />
                                <h4 className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wide">Administration</h4>
                              </div>
                              <NavigationMenuLink asChild>
                                <a
                                  className="group flex items-start space-x-2 rounded-md p-2 leading-none no-underline outline-none transition-colors hover:bg-accent"
                                  href="/api/login"
                                  data-testid="link-resources-admin-login"
                                >
                                  <img src={logInIcon} alt="" className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ filter: 'invert(50%) sepia(10%) saturate(100%) hue-rotate(180deg) brightness(90%) contrast(90%)' }} />
                                  <div>
                                    <div className="text-sm font-medium text-gray-900 dark:text-white">Admin Login</div>
                                    <p className="text-xs text-gray-600 dark:text-gray-400">Owner & staff access</p>
                                  </div>
                                </a>
                              </NavigationMenuLink>
                            </div>
                          </div>

                          {/* Featured CTA - Full Width */}
                          <div className="col-span-3 border-t border-gray-200 pt-3 mt-1">
                            <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 rounded-lg p-3 border border-blue-200 dark:border-blue-800">
                              <div className="flex items-center justify-between">
                                <div>
                                  <div className="text-sm font-bold text-gray-900 dark:text-white">Need personalized guidance?</div>
                                  <p className="text-xs text-gray-600 dark:text-gray-400">Talk to our digital growth experts</p>
                                </div>
                                <a href="/contact" className="px-3 py-1.5 bg-blue-600 text-white text-xs font-semibold rounded-md hover:bg-blue-700 transition-colors">
                                  Contact Us
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                  </NavigationMenuList>
                </NavigationMenu>

                {/* Mobile menu button */}
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="lg:hidden ml-4 p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                  data-testid="button-mobile-menu"
                >
                  {isMobileMenuOpen ? (
                    <img src={xIcon} alt="" className="w-5 h-5" />
                  ) : (
                    <img src={menuIcon} alt="" className="w-5 h-5" />
                  )}
                </button>

                {/* Mobile Cart - Icon only, top right corner */}
                <Link
                  href="/cart"
                  className="lg:hidden relative hover:opacity-80 transition-opacity ml-auto mr-1"
                  data-testid="button-cart-mobile-top"
                >
                  <ShoppingCart className="w-7 h-7 text-gray-700" />
                  {cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center" data-testid="cart-count-badge-mobile-top">
                      {cartCount}
                    </span>
                  )}
                </Link>
              </>
            )}
          </div>

          {/* Right side - Quick Access & Login/Signup Buttons (Desktop only) */}
          <div className="hidden lg:flex items-center gap-2">
            {showNavigation && (
              <>
                {/* Inbox Button - Only visible when logged in, links to portal inbox */}
                {(isAuthenticated || hasClientPortalAccess) && (
                  <a
                    href="/portal/inbox"
                    className="flex items-center px-2 sm:px-6 py-2 bg-white border border-blue-600 hover:bg-blue-50 text-blue-600 rounded-md font-bold text-xs sm:text-sm transition-colors"
                    data-testid="button-quick-inbox"
                  >
                    Inbox
                  </a>
                )}

                {/* Login/Dashboard Button - Shows Dashboard when authenticated */}
                {(isAuthenticated || hasClientPortalAccess) ? (
                  <a
                    href="/portal/dashboard"
                    className="flex items-center px-2 sm:px-6 py-2 border border-gray-900 hover:bg-gray-100 text-gray-900 rounded-md text-xs sm:text-sm font-medium transition-colors"
                    data-testid="button-dashboard"
                  >
                    Dashboard
                  </a>
                ) : (
                  <a
                    href="/portal/login"
                    className="flex items-center px-2 sm:px-6 py-2 border border-gray-900 hover:bg-gray-100 text-gray-900 rounded-md text-xs sm:text-sm font-medium transition-colors"
                    data-testid="button-login"
                  >
                    Login
                  </a>
                )}

                {/* Digital IQ Button - Text only with proper padding */}
                <a
                  href="/assessment"
                  className="flex items-center px-2 sm:px-6 py-2 border-2 border-orange-500 text-orange-500 bg-transparent hover:bg-orange-500 hover:text-white rounded-md text-xs sm:text-sm font-bold transition-all whitespace-nowrap"
                  data-testid="button-digital-iq"
                >
                  Digital IQ
                </a>

                {/* Shopping Cart - Icon only, on far right */}
                <Link
                  href="/cart"
                  className="relative p-2 hover:bg-white rounded-md transition-colors ml-4"
                  data-testid="button-cart"
                >
                  <ShoppingCart className="w-5 h-5 text-gray-700" />
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center" data-testid="cart-count-badge">
                      {cartCount}
                    </span>
                  )}
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Mobile Second Row - Action Buttons (Only on mobile) */}
        <div className="lg:hidden flex items-center justify-between gap-2 h-16 border-t border-gray-200 flex-wrap p-2">
          {showNavigation && (
            <>
              {/* Inbox - Only when logged in */}
              {(isAuthenticated || hasClientPortalAccess) && (
                <a href="/portal/inbox" className="flex-1 px-2 py-2 bg-white border border-blue-600 hover:bg-blue-50 text-blue-600 rounded-md font-bold text-xs text-center transition-colors" data-testid="button-inbox-mobile">
                  Inbox
                </a>
              )}

              {/* Dashboard or Login */}
              {(isAuthenticated || hasClientPortalAccess) ? (
                <a href="/portal/dashboard" className="flex-1 px-2 py-2 border border-gray-900 hover:bg-gray-100 text-gray-900 rounded-md text-xs font-medium text-center transition-colors" data-testid="button-dashboard-mobile">
                  Dashboard
                </a>
              ) : (
                <a href="/portal/login" className="flex-1 px-2 py-2 border border-gray-900 hover:bg-gray-100 text-gray-900 rounded-md text-xs font-medium text-center transition-colors" data-testid="button-login-mobile">
                  Login
                </a>
              )}

              {/* Digital IQ */}
              <a href="/assessment" className="flex-1 px-2 py-2 border-2 border-orange-500 text-orange-500 bg-transparent hover:bg-orange-500 hover:text-white rounded-md text-xs font-bold text-center transition-all" data-testid="button-digital-iq-mobile">
                Digital IQ
              </a>
            </>
          )}
        </div>

        {/* Mobile Menu - Mobile-First Redesign
            NOTE: This menu must stay in sync with NAV_ITEMS order and labels from navigation-config.ts.
            Main nav sections: How It Works → Products → Solutions → Resources
            Action items: Cart → Inbox → Dashboard → Digital IQ */}
        {isMobileMenuOpen && showNavigation && (
          <div className="lg:hidden fixed inset-0 lg:top-20 top-32 z-40 bg-white flex flex-col">
            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto pb-28">
              <nav className="p-4">

                {/* Cart Preview - If has items */}
                {cartCount > 0 && (
                  <Link href="/cart" className="block mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg" data-testid="mobile-cart-preview">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <ShoppingCart className="w-5 h-5 text-blue-600" />
                        <div>
                          <div className="font-bold text-gray-900">{cartCount} {cartCount === 1 ? 'Item' : 'Items'} in Cart</div>
                          <div className="text-sm text-gray-600">Tap to view & checkout</div>
                        </div>
                      </div>
                      <div className="text-lg font-bold text-blue-600">${getCartTotal().toFixed(2)}</div>
                    </div>
                  </Link>
                )}


                {/* Accordion Navigation - +/- Toggles */}
                <div className="space-y-2">
                  {NAV_ITEMS.map((item) => {
                    const isOpen = openAccordion === item.label;
                    return (
                      <div key={item.label} className="border rounded-lg overflow-hidden">
                        {/* Accordion Header with +/- Toggle */}
                        <button
                          onClick={() => setOpenAccordion(isOpen ? null : item.label)}
                          className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition-colors"
                          data-testid={`mobile-accordion-${item.label.toLowerCase().replace(' ', '-')}`}
                        >
                          <div className="text-left">
                            <div className="font-bold text-gray-900">{item.label}</div>
                            {item.description && <div className="text-xs text-gray-600">{item.description}</div>}
                          </div>
                          {isOpen ? <Minus className="w-5 h-5 text-blue-600 flex-shrink-0" /> : <Plus className="w-5 h-5 text-gray-600 flex-shrink-0" />}
                        </button>

                        {/* Accordion Content */}
                        {isOpen && (
                          <div className="p-4 border-t space-y-3">
                            {item.title && (
                              <div className="mb-3">
                                <h4 className="font-bold text-gray-900">{item.title}</h4>
                                {item.description && <p className="text-xs text-gray-600 mt-1">{item.description}</p>}
                              </div>
                            )}

                            {/* How It Works Steps */}
                            {item.label === 'How It Works' && (
                              <div className="space-y-2">
                                {HOW_IT_WORKS_STEPS.map((step) => (
                                  <a key={step.number} href={step.href} className="flex items-start gap-3 p-3 bg-white border-l-4 rounded hover:bg-gray-50 transition-colors" style={{ borderColor: step.borderColor }} data-testid={step.testId}>
                                    <div className="text-xs font-bold text-gray-500 uppercase mt-1">Step {step.number}</div>
                                    <div className="flex-1">
                                      <div className="font-bold text-sm text-gray-900">{step.title}</div>
                                      <div className="text-xs text-gray-600">{step.description}</div>
                                    </div>
                                  </a>
                                ))}
                              </div>
                            )}

                            {/* Products - Full inline display */}
                            {item.label === 'Products' && (
                              <div className="space-y-3">
                                {/* TOP ROW: Digital IQ + Coach Blue */}
                                <div className="space-y-2">
                                  {/* Digital IQ Assessment - FREE */}
                                  <div className="p-2 rounded-lg border-2" style={{ borderColor: '#A00028' }}>
                                    <div className="flex items-center justify-between mb-2">
                                      <div>
                                        <p className="text-sm font-bold text-gray-900">Digital IQ Assessment</p>
                                        <p className="text-xs text-gray-500">Free Business Intelligence Tool</p>
                                      </div>
                                    </div>
                                    <div className="flex items-center justify-between">
                                      <div>
                                        <div className="text-lg font-extrabold" style={{ color: '#A00028' }}>Free</div>
                                        <p className="text-xs text-gray-600">Discover your business opportunities</p>
                                      </div>
                                      <a href="/assessment" className="px-2 py-1 rounded text-xs font-bold text-white" style={{ backgroundColor: '#A00028' }} data-testid="mobile-start-assessment">
                                        Start →
                                      </a>
                                    </div>
                                  </div>

                                  {/* Coach Blue */}
                                  <div className="p-2 rounded-lg border-2" style={{ borderColor: '#A855F7' }}>
                                    <div className="flex items-center justify-between mb-2">
                                      <div>
                                        <p className="text-sm font-bold text-gray-900">Coach Blue</p>
                                        <p className="text-xs text-gray-500">AI Business Coach</p>
                                      </div>
                                    </div>
                                    <div className="flex items-center justify-between">
                                      <div>
                                        <div className="text-lg font-extrabold" style={{ color: '#A855F7' }}>$99/mo</div>
                                        <a href="/ai-coach" className="text-xs font-bold text-blue-600 hover:underline">Learn More →</a>
                                      </div>
                                      <button className="text-lg font-bold w-6 h-6 rounded-full text-white flex items-center justify-center" style={{ backgroundColor: '#A855F7' }} data-testid="mobile-add-coach-blue" title="Add to Cart">+</button>
                                    </div>
                                  </div>
                                </div>

                                {/* LOCALBLUE BUNDLE */}
                                <div className="border-t pt-3">
                                  <h4 className="text-xs font-bold text-gray-700 uppercase mb-2">LocalBlue Bundle</h4>
                                  
                                  {/* Bundle Card */}
                                  <div className="p-2 rounded-lg border-2 mb-2" style={{ borderColor: '#6EA6FF' }}>
                                    <div className="flex items-center justify-between mb-2">
                                      <div>
                                        <p className="text-sm font-bold text-gray-900">LocalBlue Bundle</p>
                                        <p className="text-xs text-gray-500">Listings + Reputation</p>
                                      </div>
                                    </div>
                                    <div className="flex items-center justify-between">
                                      <div>
                                        <p className="text-xs text-gray-600 mb-1">Includes both apps below</p>
                                        <div className="text-lg font-extrabold" style={{ color: '#6EA6FF' }}>$60/mo</div>
                                        <a href="/localblue" className="text-xs font-bold text-blue-600 hover:underline">Learn More →</a>
                                      </div>
                                      <button className="text-lg font-bold w-6 h-6 rounded-full text-white flex items-center justify-center" style={{ backgroundColor: '#6EA6FF' }} data-testid="mobile-add-localblue" title="Add to Cart">+</button>
                                    </div>
                                  </div>

                                  {/* 2 Apps */}
                                  <div className="grid grid-cols-2 gap-2">
                                    {/* /listings */}
                                    <div className="p-2 rounded-lg border-2" style={{ borderColor: '#FF0040' }}>
                                      <div className="flex items-start justify-between mb-2">
                                        <div>
                                          <p className="text-xs font-bold text-gray-900">/listings</p>
                                          <p className="text-xs text-gray-500">Directory</p>
                                        </div>
                                        <button className="text-base font-bold w-5 h-5 rounded-full text-white flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#FF0040' }} data-testid="mobile-add-listings" title="Add to Cart">+</button>
                                      </div>
                                      <div className="text-xs font-extrabold" style={{ color: '#FF0040' }}>$40/mo</div>
                                      <a href="/listings" className="text-xs font-bold text-blue-600 hover:underline">Learn More →</a>
                                    </div>

                                    {/* /reputation */}
                                    <div className="p-2 rounded-lg border-2" style={{ borderColor: '#D59600' }}>
                                      <div className="flex items-start justify-between mb-2">
                                        <div>
                                          <p className="text-xs font-bold text-gray-900">/reputation</p>
                                          <p className="text-xs text-gray-500">Reviews</p>
                                        </div>
                                        <button className="text-base font-bold w-5 h-5 rounded-full text-white flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#D59600' }} data-testid="mobile-add-reputation" title="Add to Cart">+</button>
                                      </div>
                                      <div className="text-xs font-extrabold" style={{ color: '#D59600' }}>$40/mo</div>
                                      <a href="/reputation" className="text-xs font-bold text-blue-600 hover:underline">Learn More →</a>
                                    </div>
                                  </div>
                                </div>

                                {/* COMMVERSE BUNDLE */}
                                <div className="border-t pt-3">
                                  <h4 className="text-xs font-bold text-gray-700 uppercase mb-2">Commverse Bundle</h4>
                                  
                                  {/* Bundle Card */}
                                  <div className="p-2 rounded-lg border-2 mb-2" style={{ borderColor: '#FF6B00' }}>
                                    <div className="flex items-center justify-between mb-2">
                                      <div>
                                        <p className="text-sm font-bold text-gray-900">Commverse Bundle</p>
                                        <p className="text-xs text-gray-500">Communication Suite</p>
                                      </div>
                                    </div>
                                    <div className="flex items-center justify-between">
                                      <div>
                                        <p className="text-xs text-gray-600 mb-1">Includes all 4 apps below</p>
                                        <div className="text-lg font-extrabold" style={{ color: '#FF6B00' }}>$100/mo</div>
                                        <a href="/commverse" className="text-xs font-bold text-blue-600 hover:underline">Learn More →</a>
                                      </div>
                                      <button className="text-lg font-bold w-6 h-6 rounded-full text-white flex items-center justify-center" style={{ backgroundColor: '#FF6B00' }} data-testid="mobile-add-commverse" title="Add to Cart">+</button>
                                    </div>
                                  </div>

                                  {/* 4 Apps */}
                                  <div className="grid grid-cols-2 gap-2">
                                    {/* /send */}
                                    <div className="p-2 rounded-lg border-2" style={{ borderColor: '#FFFF00', boxShadow: '0 0 0 1px #000000' }}>
                                      <div className="flex items-start justify-between mb-2">
                                        <div>
                                          <p className="text-xs font-bold text-gray-900">/send</p>
                                          <p className="text-xs text-gray-500">Email & SMS</p>
                                        </div>
                                        <button className="text-base font-bold w-5 h-5 rounded-full text-white flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#FF6B00' }} data-testid="mobile-add-send" title="Add to Cart">+</button>
                                      </div>
                                      <div className="text-xs font-extrabold" style={{ color: '#FF6B00' }}>$35/mo</div>
                                      <a href="/send" className="text-xs font-bold text-blue-600 hover:underline">Learn More →</a>
                                    </div>

                                    {/* /inbox */}
                                    <div className="p-2 rounded-lg border-2" style={{ borderColor: '#0080FF' }}>
                                      <div className="flex items-start justify-between mb-2">
                                        <div>
                                          <p className="text-xs font-bold text-gray-900">/inbox</p>
                                          <p className="text-xs text-gray-500">Comms Hub</p>
                                        </div>
                                        <button className="text-base font-bold w-5 h-5 rounded-full text-white flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#0080FF' }} data-testid="mobile-add-inbox" title="Add to Cart">+</button>
                                      </div>
                                      <div className="text-xs font-extrabold" style={{ color: '#0080FF' }}>$35/mo</div>
                                      <a href="/inbox" className="text-xs font-bold text-blue-600 hover:underline">Learn More →</a>
                                    </div>

                                    {/* /livechat */}
                                    <div className="p-2 rounded-lg border-2" style={{ borderColor: '#8000FF' }}>
                                      <div className="flex items-start justify-between mb-2">
                                        <div>
                                          <p className="text-xs font-bold text-gray-900">/livechat</p>
                                          <p className="text-xs text-gray-500">Chat Widget</p>
                                        </div>
                                        <button className="text-base font-bold w-5 h-5 rounded-full text-white flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#8000FF' }} data-testid="mobile-add-livechat" title="Add to Cart">+</button>
                                      </div>
                                      <div className="text-xs font-extrabold" style={{ color: '#8000FF' }}>$35/mo</div>
                                      <a href="/livechat" className="text-xs font-bold text-blue-600 hover:underline">Learn More →</a>
                                    </div>

                                    {/* /content */}
                                    <div className="p-2 rounded-lg border-2" style={{ borderColor: '#E91EBC' }}>
                                      <div className="flex items-start justify-between mb-2">
                                        <div>
                                          <p className="text-xs font-bold text-gray-900">/content</p>
                                          <p className="text-xs text-gray-500">Social Media</p>
                                        </div>
                                        <button className="text-base font-bold w-5 h-5 rounded-full text-white flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#E91EBC' }} data-testid="mobile-add-content" title="Add to Cart">+</button>
                                      </div>
                                      <div className="text-xs font-extrabold" style={{ color: '#E91EBC' }}>$35/mo</div>
                                      <a href="/content" className="text-xs font-bold text-blue-600 hover:underline">Learn More →</a>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}

                            {/* Solutions - 13 Platforms & Apps Grid */}
                            {item.label === 'Solutions' && (
                              <div className="space-y-3">
                                <div className="grid grid-cols-2 gap-2">
                                  {/* BusinessBlueprint */}
                                  <a href="/" className="flex flex-col items-center p-2 rounded-lg border-2 hover:shadow-lg transition-all" style={{ borderColor: '#FF6B00' }} data-testid="mobile-link-businessblueprint">
                                    <p className="text-xs font-bold text-gray-900 text-center">BusinessBlueprint</p>
                                    <p className="text-xs text-gray-600 text-center">Digital Intelligence</p>
                                  </a>

                                  {/* HostsBlue */}
                                  <a href="#hostsblue" className="flex flex-col items-center p-2 rounded-lg border-2 hover:shadow-lg transition-all" style={{ borderColor: '#8000FF' }} data-testid="mobile-link-hostsblue">
                                    <p className="text-xs font-bold text-gray-900 text-center">HostsBlue</p>
                                    <p className="text-xs text-gray-600 text-center">Web Services</p>
                                  </a>

                                  {/* SwipesBlue */}
                                  <a href="#swipesblue" className="flex flex-col items-center p-2 rounded-lg border-2 hover:shadow-lg transition-all" style={{ borderColor: '#FF0040' }} data-testid="mobile-link-swipesblue">
                                    <p className="text-xs font-bold text-gray-900 text-center">SwipesBlue</p>
                                    <p className="text-xs text-gray-600 text-center">Payment Gateway</p>
                                  </a>

                                  {/* ConsoleBlue */}
                                  <a href="#consoleblue" className="flex flex-col items-center p-2 rounded-lg border-2 hover:shadow-lg transition-all" style={{ borderColor: '#0000FF' }} data-testid="mobile-link-consoleblue">
                                    <p className="text-xs font-bold text-gray-900 text-center">ConsoleBlue</p>
                                    <p className="text-xs text-gray-600 text-center">Admin Console</p>
                                  </a>

                                  {/* SiteInspector */}
                                  <a href="#siteinspector" className="flex flex-col items-center p-2 rounded-lg border-2 hover:shadow-lg transition-all" style={{ borderColor: '#0000FF' }} data-testid="mobile-link-siteinspector">
                                    <p className="text-xs font-bold text-gray-900 text-center">SiteInspector</p>
                                    <p className="text-xs text-gray-600 text-center">Site Analysis</p>
                                  </a>

                                  {/* AI Business Coach */}
                                  <a href="/ai-coach" className="flex flex-col items-center p-2 rounded-lg border-2 hover:shadow-lg transition-all" style={{ borderColor: '#A855F7' }} data-testid="mobile-link-ai-coach">
                                    <p className="text-xs font-bold text-gray-900 text-center">Coach Blue</p>
                                    <p className="text-xs text-gray-600 text-center">Smart Guidance</p>
                                  </a>

                                  {/* Digital IQ */}
                                  <a href="/assessment" className="flex flex-col items-center p-2 rounded-lg border-2 hover:shadow-lg transition-all" style={{ borderColor: '#A00028' }} data-testid="mobile-link-digital-iq">
                                    <p className="text-xs font-bold text-gray-900 text-center">Digital IQ</p>
                                    <p className="text-xs text-gray-600 text-center">Business Assessment</p>
                                  </a>

                                  {/* /send */}
                                  <a href="/send" className="flex flex-col items-center p-2 rounded-lg border-2 hover:shadow-lg transition-all" style={{ borderColor: '#FF6B00' }} data-testid="mobile-link-send-app">
                                    <p className="text-xs font-bold text-gray-900 text-center">/send</p>
                                    <p className="text-xs text-gray-600 text-center">Email & SMS</p>
                                  </a>

                                  {/* /inbox */}
                                  <a href="/inbox" className="flex flex-col items-center p-2 rounded-lg border-2 hover:shadow-lg transition-all" style={{ borderColor: '#0080FF' }} data-testid="mobile-link-inbox-app">
                                    <p className="text-xs font-bold text-gray-900 text-center">/inbox</p>
                                    <p className="text-xs text-gray-600 text-center">Unified Comms</p>
                                  </a>

                                  {/* /livechat */}
                                  <a href="/livechat" className="flex flex-col items-center p-2 rounded-lg border-2 hover:shadow-lg transition-all" style={{ borderColor: '#8000FF' }} data-testid="mobile-link-livechat-app">
                                    <p className="text-xs font-bold text-gray-900 text-center">/livechat</p>
                                    <p className="text-xs text-gray-600 text-center">Live Chat</p>
                                  </a>

                                  {/* /content */}
                                  <a href="/content-landing" className="flex flex-col items-center p-2 rounded-lg border-2 hover:shadow-lg transition-all" style={{ borderColor: '#E91EBC' }} data-testid="mobile-link-content-app">
                                    <p className="text-xs font-bold text-gray-900 text-center">/content</p>
                                    <p className="text-xs text-gray-600 text-center">Social Media</p>
                                  </a>

                                  {/* /listings */}
                                  <a href="/listings-landing" className="flex flex-col items-center p-2 rounded-lg border-2 hover:shadow-lg transition-all" style={{ borderColor: '#FF0040' }} data-testid="mobile-link-listings-app">
                                    <p className="text-xs font-bold text-gray-900 text-center">/listings</p>
                                    <p className="text-xs text-gray-600 text-center">Directory Sync</p>
                                  </a>

                                  {/* /reputation */}
                                  <a href="/reputation-landing" className="flex flex-col items-center p-2 rounded-lg border-2 hover:shadow-lg transition-all" style={{ borderColor: '#D59600' }} data-testid="mobile-link-reputation-app">
                                    <p className="text-xs font-bold text-gray-900 text-center">/reputation</p>
                                    <p className="text-xs text-gray-600 text-center">Review Mgmt</p>
                                  </a>
                                </div>
                              </div>
                            )}

                            {/* Resources - 4 Columns */}
                            {item.label === 'Resources' && (
                              <div className="space-y-4">
                                {/* Learning */}
                                <div>
                                  <h4 className="text-xs font-bold text-gray-700 uppercase mb-2">Learn</h4>
                                  <div className="space-y-2">
                                    <a href="/journey" className="block p-2 text-gray-900 hover:bg-gray-50 rounded text-sm">
                                      <div className="font-bold">Getting Started Guide</div>
                                      <p className="text-xs text-gray-600">5-step digital growth journey</p>
                                    </a>
                                    <a href="/about" className="block p-2 text-gray-900 hover:bg-gray-50 rounded text-sm">
                                      <div className="font-bold">Success Stories</div>
                                      <p className="text-xs text-gray-600">Real results from businesses</p>
                                    </a>
                                    <a href="/biif" className="block p-2 text-gray-900 hover:bg-gray-50 rounded text-sm">
                                      <div className="font-bold">Video Tutorials</div>
                                      <p className="text-xs text-gray-600">Step-by-step walkthroughs</p>
                                    </a>
                                  </div>
                                </div>

                                {/* Platforms */}
                                <div className="border-t pt-3">
                                  <h4 className="text-xs font-bold text-gray-700 uppercase mb-2">Platforms</h4>
                                  <div className="space-y-2">
                                    <a href="/" className="block p-2 text-gray-900 hover:bg-gray-50 rounded text-sm">
                                      <div className="font-bold">BusinessBlueprint</div>
                                      <p className="text-xs text-gray-600">Digital intelligence platform</p>
                                    </a>
                                    <a href="#hostsblue" className="block p-2 text-gray-900 hover:bg-gray-50 rounded text-sm">
                                      <div className="font-bold">HostsBlue</div>
                                      <p className="text-xs text-gray-600">Website hosting & builder</p>
                                    </a>
                                    <a href="#swipesblue" className="block p-2 text-gray-900 hover:bg-gray-50 rounded text-sm">
                                      <div className="font-bold">SwipesBlue</div>
                                      <p className="text-xs text-gray-600">Payment gateway</p>
                                    </a>
                                    <a href="#consoleblue" className="block p-2 text-gray-900 hover:bg-gray-50 rounded text-sm">
                                      <div className="font-bold">ConsoleBlue</div>
                                      <p className="text-xs text-gray-600">Admin console</p>
                                    </a>
                                    <a href="#siteinspector" className="block p-2 text-gray-900 hover:bg-gray-50 rounded text-sm">
                                      <div className="font-bold">SiteInspector</div>
                                      <p className="text-xs text-gray-600">Site analysis tool</p>
                                    </a>
                                  </div>
                                </div>

                                {/* Developers */}
                                <div className="border-t pt-3">
                                  <h4 className="text-xs font-bold text-gray-700 uppercase mb-2">Developers</h4>
                                  <div className="space-y-2">
                                    <a href="/send-api-docs" className="block p-2 text-gray-900 hover:bg-gray-50 rounded text-sm">
                                      <div className="font-bold">/send API Docs</div>
                                      <p className="text-xs text-gray-600">Email & SMS API reference</p>
                                    </a>
                                    <a href="/inbox-api-docs" className="block p-2 text-gray-900 hover:bg-gray-50 rounded text-sm">
                                      <div className="font-bold">/inbox API Docs</div>
                                      <p className="text-xs text-gray-600">Unified communications API</p>
                                    </a>
                                    <a href="/content-api-docs" className="block p-2 text-gray-900 hover:bg-gray-50 rounded text-sm">
                                      <div className="font-bold">/content API Docs</div>
                                      <p className="text-xs text-gray-600">Social media posting API</p>
                                    </a>
                                    <a href="/livechat-install" className="block p-2 text-gray-900 hover:bg-gray-50 rounded text-sm">
                                      <div className="font-bold">LiveChat Installation</div>
                                      <p className="text-xs text-gray-600">Widget integration guide</p>
                                    </a>
                                    <a href="/sitemap" className="block p-2 text-gray-900 hover:bg-gray-50 rounded text-sm">
                                      <div className="font-bold">Site Map</div>
                                      <p className="text-xs text-gray-600">Complete navigation</p>
                                    </a>
                                  </div>
                                </div>

                                {/* Support & Administration */}
                                <div className="border-t pt-3">
                                  <h4 className="text-xs font-bold text-gray-700 uppercase mb-2">Support</h4>
                                  <div className="space-y-2">
                                    <a href="/contact" className="block p-2 text-gray-900 hover:bg-gray-50 rounded text-sm">
                                      <div className="font-bold">Help Center</div>
                                      <p className="text-xs text-gray-600">Get answers & support</p>
                                    </a>
                                    <a href="/livechat-demo" className="block p-2 text-gray-900 hover:bg-gray-50 rounded text-sm">
                                      <div className="font-bold">Live Demo</div>
                                      <p className="text-xs text-gray-600">Try our live chat</p>
                                    </a>
                                    <a href="/portal" className="block p-2 text-gray-900 hover:bg-gray-50 rounded text-sm">
                                      <div className="font-bold">Client Portal</div>
                                      <p className="text-xs text-gray-600">Manage your account</p>
                                    </a>
                                  </div>

                                  {/* Administration */}
                                  <div className="border-t border-gray-200 pt-2 mt-2">
                                    <h4 className="text-xs font-bold text-gray-700 uppercase mb-2">Administration</h4>
                                    <a href="/api/login" className="block p-2 text-gray-900 hover:bg-gray-50 rounded text-sm">
                                      <div className="font-bold">Admin Login</div>
                                      <p className="text-xs text-gray-600">Owner & staff access</p>
                                    </a>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

              </nav>
            </div>

            {/* Sticky Footer - Login/Dashboard CTA */}
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200 shadow-lg">
              {(isAuthenticated || hasClientPortalAccess) ? (
                <a href="/portal/dashboard" className="flex items-center justify-center gap-3 w-full p-4 border-2 border-gray-900 text-gray-900 rounded-lg font-bold text-lg active:bg-gray-50 transition-colors" data-testid="mobile-dashboard-btn">
                  Dashboard
                </a>
              ) : (
                <a href="/portal/login" className="flex items-center justify-center gap-3 w-full p-4 border-2 border-gray-900 text-gray-900 rounded-lg font-bold text-lg active:bg-gray-50 transition-colors" data-testid="mobile-login-btn">
                  Login
                </a>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}