import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/useAuth";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
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
import { BrandLogo, BrandIcon } from "@/components/brand-logo";
import bbAvatar from "@assets/businesblueprint assets/Blueprint_Avatar.png";
import bbIcon from "@assets/businesblueprint assets/Blueprint_Favicon.png";
import contentIcon from "@assets/native icons and favicons/: content app icon.png";
import contentLogo from "@assets/logos and wordmarks/: content app logo.png";
import inboxIcon from "@assets/native icons and favicons/: inbox app icon.png";
import webhostedLogo from "@assets/hostsblue assets/hostsblue URL.png";
import webhostedIcon from "@assets/hostsblue assets/Hosts Blue Brandmark.png";
import airswipedLogo from "@assets/swipesblue/swipesblue brandmark.png";
import sendLogo from "@assets/logos and wordmarks/: send app logo.png";
import sendIcon from "@assets/native icons and favicons/: send app icon.png";
import inboxLogo from "@assets/logos and wordmarks/: inbox app logo.png";
import livechatLogo from "@assets/logos and wordmarks/: livechat app logo.png";
import livechatIcon from "@assets/native icons and favicons/: livechat app icon.png";
import hostsBlueIcon from "@assets/hostsblue assets/Hosts Blue Brandmark.png";
import swipesBlueIcon from "@assets/swipesblue/swipesblue brandmark.png";
import blueprintIcon from "@assets/businesblueprint assets/Blueprint_Favicon.png";
import commverseBundle from "@assets/logos and wordmarks/: commverse bundle logo.png";

interface HeaderProps {
  showNavigation?: boolean;
}

export function Header({ showNavigation = true }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isAuthenticated } = useAuth();
  const [hasClientPortalAccess, setHasClientPortalAccess] = useState(false);

  // Check if user has client portal access
  useEffect(() => {
    const checkClientPortal = () => {
      const clientId = sessionStorage.getItem("clientId");
      setHasClientPortalAccess(!!clientId);
    };

    checkClientPortal();

    // Check periodically in case session changes (every 5 seconds)
    const interval = setInterval(checkClientPortal, 5000);
    return () => clearInterval(interval);
  }, []);

  // User is logged in if they have Replit Auth OR Client Portal access
  const isLoggedIn = isAuthenticated || hasClientPortalAccess;

  return (
    <header className="bg-gray-100 border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <Link href="/" className="hover:opacity-80 transition-opacity cursor-pointer" data-testid="header-logo">
              <BrandLogo brand="businessblueprint" size="sm" />
            </Link>

            {showNavigation && (
              <>
                {/* Desktop Mega Menu */}
                <NavigationMenu className="hidden lg:flex ml-8">
                  <NavigationMenuList>
                    {/* How It Works (NEW) */}
                    <NavigationMenuItem>
                      <NavigationMenuTrigger className="flex items-center space-x-2 bg-gray-100" data-testid="menu-trigger-how-it-works">
                        <img src={compassIcon} alt="" className="w-4 h-4" />
                        <span>How It Works</span>
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <div className="p-6 w-[600px]">
                          <div className="mb-4">
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                              We Assess. We Prescribe. You Grow.
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              Your custom digital growth plan based on AI analysis of your business
                            </p>
                          </div>

                          <div className="space-y-4">
                            <div className="flex gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800">
                              <div className="flex-shrink-0">
                                <div className="w-8 h-8 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold">1</div>
                              </div>
                              <div>
                                <div className="font-bold text-gray-900 dark:text-white">Digital Assessment</div>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                  AI analyzes your online presence and scores your Digital IQ
                                </p>
                              </div>
                            </div>

                            <div className="flex gap-3 p-3 rounded-lg border-2 border-yellow-400 dark:border-yellow-600 bg-yellow-50 dark:bg-yellow-950 hover:bg-yellow-100 dark:hover:bg-yellow-900">
                              <div className="flex-shrink-0">
                                <div className="w-8 h-8 rounded-full bg-yellow-500 text-white flex items-center justify-center font-bold">2</div>
                              </div>
                              <div>
                                <div className="font-bold text-gray-900 dark:text-white flex items-center gap-2">
                                  Custom Blueprint Prescribed
                                  <span className="text-xs bg-yellow-500 text-white px-2 py-0.5 rounded-full">THE PRESCRIPTION</span>
                                </div>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                  We tell you exactly what your business needs and recommend your ideal plan
                                </p>
                              </div>
                            </div>

                            <div className="flex gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800">
                              <div className="flex-shrink-0">
                                <div className="w-8 h-8 rounded-full bg-purple-500 text-white flex items-center justify-center font-bold">3</div>
                              </div>
                              <div>
                                <div className="font-bold text-gray-900 dark:text-white">Choose Your Execution Style</div>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                  DIY (you build), MSP (we manage), or ALC (pick modules only)
                                </p>
                              </div>
                            </div>

                            <div className="flex gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800">
                              <div className="flex-shrink-0">
                                <div className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center font-bold">4</div>
                              </div>
                              <div>
                                <div className="font-bold text-gray-900 dark:text-white">Launch & Grow</div>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                  Access your dashboard, add Commverse tools, and watch your business grow
                                </p>
                              </div>
                            </div>
                          </div>

                          <div className="mt-6">
                            <Link href="/assessment">
                              <Button className="w-full" data-testid="button-start-assessment">
                                Start Your Free Assessment →
                              </Button>
                            </Link>
                          </div>
                        </div>
                      </NavigationMenuContent>
                    </NavigationMenuItem>

                    {/* Pricing (ENHANCED) */}
                    <NavigationMenuItem>
                      <NavigationMenuTrigger className="flex items-center space-x-2 bg-gray-100" data-testid="menu-trigger-pricing">
                        <img src={dollarSignIcon} alt="" className="w-4 h-4" />
                        <span>Pricing</span>
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <div className="p-6 w-[800px]">
                          <div className="mb-6">
                            <h4 className="text-sm font-bold text-gray-700 dark:text-gray-300 mb-3 uppercase tracking-wide">
                              Base Plans - Choose Your Structural Depth
                            </h4>
                            <div className="grid grid-cols-3 gap-4">
                              <NavigationMenuLink asChild>
                                <a
                                  className="block p-4 rounded-lg border-2 border-orange-200 dark:border-orange-800 hover:border-orange-500 hover:shadow-lg transition-all"
                                  href="/pricing?plan=start"
                                  data-testid="link-plan-start"
                                >
                                  <div className="text-2xl font-bold text-orange-600 dark:text-orange-400 mb-1">$99<span className="text-sm">/mo</span></div>
                                  <div className="font-bold text-gray-900 dark:text-white mb-2">Start</div>
                                  <p className="text-xs text-gray-600 dark:text-gray-400">
                                    Lay the foundation: assessment, Digital IQ, ~50 listings, starter SEO
                                  </p>
                                </a>
                              </NavigationMenuLink>

                              <NavigationMenuLink asChild>
                                <a
                                  className="block p-4 rounded-lg border-2 border-blue-200 dark:border-blue-800 hover:border-blue-500 hover:shadow-lg transition-all"
                                  href="/pricing?plan=advanced"
                                  data-testid="link-plan-advanced"
                                >
                                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-1">$299<span className="text-sm">/mo</span></div>
                                  <div className="font-bold text-gray-900 dark:text-white mb-2">Advanced</div>
                                  <p className="text-xs text-gray-600 dark:text-gray-400">
                                    Build your framework: ~150 listings, automation, review flow
                                  </p>
                                </a>
                              </NavigationMenuLink>

                              <NavigationMenuLink asChild>
                                <a
                                  className="block p-4 rounded-lg border-2 border-green-200 dark:border-green-800 hover:border-green-500 hover:shadow-lg transition-all"
                                  href="/pricing?plan=scale"
                                  data-testid="link-plan-scale"
                                >
                                  <div className="text-2xl font-bold text-green-600 dark:text-green-400 mb-1">$999<span className="text-sm">/mo</span></div>
                                  <div className="font-bold text-gray-900 dark:text-white mb-2">Scale</div>
                                  <p className="text-xs text-gray-600 dark:text-gray-400">
                                    Full build: multi-location, advanced automation, executive dashboards
                                  </p>
                                  <p className="text-xs text-red-600 dark:text-red-400 mt-2">
                                    ⚠️ Incompatible with ALC
                                  </p>
                                </a>
                              </NavigationMenuLink>
                            </div>
                          </div>

                          <div className="mb-6">
                            <h4 className="text-sm font-bold text-gray-700 dark:text-gray-300 mb-3 uppercase tracking-wide">
                              Execution Styles - Pick Your Build Method
                            </h4>
                            <div className="grid grid-cols-3 gap-4">
                              <NavigationMenuLink asChild>
                                <a
                                  className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-orange-500 hover:shadow-md transition-all"
                                  href="/pricing?style=diy"
                                  data-testid="link-execution-diy"
                                >
                                  <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center">
                                    <span className="text-xl">🔨</span>
                                  </div>
                                  <div>
                                    <div className="font-bold text-gray-900 dark:text-white">DIY</div>
                                    <p className="text-xs text-gray-600 dark:text-gray-400">You install from the plan</p>
                                  </div>
                                </a>
                              </NavigationMenuLink>

                              <NavigationMenuLink asChild>
                                <a
                                  className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-purple-500 hover:shadow-md transition-all"
                                  href="/pricing?style=msp"
                                  data-testid="link-execution-msp"
                                >
                                  <img src={hostsBlueIcon} alt="MSP" className="w-10 h-10 rounded-lg" />
                                  <div>
                                    <div className="font-bold text-gray-900 dark:text-white">MSP</div>
                                    <p className="text-xs text-gray-600 dark:text-gray-400">Our crew manages the build</p>
                                  </div>
                                </a>
                              </NavigationMenuLink>

                              <NavigationMenuLink asChild>
                                <a
                                  className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-green-500 hover:shadow-md transition-all"
                                  href="/pricing?style=alc"
                                  data-testid="link-execution-alc"
                                >
                                  <div className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
                                    <span className="text-xl">🎯</span>
                                  </div>
                                  <div>
                                    <div className="font-bold text-gray-900 dark:text-white">ALC</div>
                                    <p className="text-xs text-gray-600 dark:text-gray-400">Pick modules, no base plan</p>
                                  </div>
                                </a>
                              </NavigationMenuLink>
                            </div>
                          </div>

                          <div>
                            <h4 className="text-sm font-bold text-gray-700 dark:text-gray-300 mb-3 uppercase tracking-wide">
                              Marketplace - Add-Ons & Coaching
                            </h4>
                            <div className="space-y-2">
                              <NavigationMenuLink asChild>
                                <a
                                  className="flex items-center justify-between p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-500 hover:shadow-md transition-all"
                                  href="/pricing?addon=commverse"
                                  data-testid="link-addon-commverse"
                                >
                                  <div className="flex items-center gap-3">
                                    <img src={commverseBundle} alt="Commverse" className="w-10 h-10 rounded-lg" />
                                    <div>
                                      <div className="font-bold text-gray-900 dark:text-white">Commverse Bundle</div>
                                      <p className="text-xs text-gray-600 dark:text-gray-400">All 4 apps - Save $40/mo</p>
                                    </div>
                                  </div>
                                  <div className="text-lg font-bold text-blue-600 dark:text-blue-400">$100/mo</div>
                                </a>
                              </NavigationMenuLink>

                              <NavigationMenuLink asChild>
                                <a
                                  className="flex items-center justify-between p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-purple-500 hover:shadow-md transition-all"
                                  href="/pricing?addon=coach-blue"
                                  data-testid="link-addon-coach-blue"
                                >
                                  <div className="flex items-center gap-3">
                                    <span className="text-2xl">🤖</span>
                                    <div>
                                      <div className="font-bold text-gray-900 dark:text-white">Coach Blue</div>
                                      <p className="text-xs text-gray-600 dark:text-gray-400">AI Business Coach</p>
                                    </div>
                                  </div>
                                  <div className="text-sm font-bold text-purple-600 dark:text-purple-400">$99 DIY / $59 MSP</div>
                                </a>
                              </NavigationMenuLink>

                              <NavigationMenuLink asChild>
                                <a
                                  className="flex items-center justify-between p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-yellow-500 hover:shadow-md transition-all"
                                  href="/pricing?addon=captains-chair"
                                  data-testid="link-addon-captains-chair"
                                >
                                  <div className="flex items-center gap-3">
                                    <span className="text-2xl">👨‍✈️</span>
                                    <div>
                                      <div className="font-bold text-gray-900 dark:text-white">Captain's Chair</div>
                                      <p className="text-xs text-gray-600 dark:text-gray-400">Personal CEO Coaching (max 2 months)</p>
                                    </div>
                                  </div>
                                  <div className="text-lg font-bold text-yellow-600 dark:text-yellow-400">$499/mo</div>
                                </a>
                              </NavigationMenuLink>
                            </div>
                          </div>
                        </div>
                      </NavigationMenuContent>
                    </NavigationMenuItem>

                    {/* Applications - Commverse Apps with Bundle Highlight */}
                    <NavigationMenuItem>
                      <NavigationMenuTrigger className="flex items-center space-x-2 bg-gray-100" data-testid="menu-trigger-applications">
                        <img src={layersIcon} alt="" className="w-4 h-4" />
                        <span>Applications</span>
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <div className="p-6 w-[700px]">
                          <div className="mb-6 p-4 rounded-lg border-2 border-blue-500 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950">
                            <div className="flex items-center justify-between mb-3">
                              <div className="flex items-center gap-3">
                                <img src={commverseBundle} alt="Commverse Bundle" className="h-12 w-12 object-contain" />
                                <div>
                                  <div className="text-lg font-bold text-gray-900 dark:text-white">Commverse Bundle</div>
                                  <p className="text-sm text-gray-600 dark:text-gray-400">All 4 Communication Apps</p>
                                </div>
                              </div>
                              <div>
                                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">$100<span className="text-sm">/mo</span></div>
                                <p className="text-xs text-green-600 dark:text-green-400">Save $40/month</p>
                              </div>
                            </div>
                            <Link href="/applications?bundle=commverse">
                              <Button className="w-full" data-testid="button-get-commverse">
                                Get Commverse Bundle →
                              </Button>
                            </Link>
                          </div>

                          <div className="mb-3">
                            <h4 className="text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wide">
                              Or choose individual apps at $35/mo each
                            </h4>
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            {/* /send */}
                            <NavigationMenuLink asChild>
                              <a
                                className="group block select-none space-y-2 rounded-lg border border-gray-200 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 dark:border-gray-700 p-4 leading-none no-underline outline-none transition-all hover:border-green-500 hover:shadow-xl hover:from-green-50 hover:to-green-100 dark:hover:from-green-950 dark:hover:to-green-900 hover:scale-[1.02]"
                                href="/send"
                                data-testid="link-app-send"
                              >
                                <div className="flex items-center justify-between mb-3">
                                  <div className="flex items-center gap-2">
                                    <img src={sendIcon} alt="/send icon" className="h-10 w-10 object-contain" />
                                    <img src={sendLogo} alt="/send" className="h-8 object-contain" />
                                  </div>
                                  <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                                    <span className="text-xs font-semibold text-green-600 dark:text-green-400">Visit Platform →</span>
                                  </div>
                                </div>
                                <div className="text-base font-bold text-gray-900 dark:text-white" data-testid="text-app-send-title">Email + SMS Marketing</div>
                                <p className="text-xs leading-relaxed text-gray-600 dark:text-gray-400" data-testid="text-app-send-description">
                                  Unified marketing campaigns with full compliance
                                </p>
                                <ul className="mt-3 space-y-1.5 text-xs text-gray-700 dark:text-gray-300" data-testid="list-app-send-features">
                                  <li className="flex items-center"><span className="text-green-500 dark:text-green-400 mr-1.5">✓</span> Email & SMS Campaigns</li>
                                  <li className="flex items-center"><span className="text-green-500 dark:text-green-400 mr-1.5">✓</span> Contact Management</li>
                                  <li className="flex items-center"><span className="text-green-500 dark:text-green-400 mr-1.5">✓</span> GDPR/CAN-SPAM Compliant</li>
                                </ul>
                              </a>
                            </NavigationMenuLink>

                            {/* /inbox */}
                            <NavigationMenuLink asChild>
                              <a
                                className="group block select-none space-y-2 rounded-lg border border-gray-200 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 dark:border-gray-700 p-4 leading-none no-underline outline-none transition-all hover:border-yellow-500 hover:shadow-xl hover:from-yellow-50 hover:to-yellow-100 dark:hover:from-yellow-950 dark:hover:to-yellow-900 hover:scale-[1.02]"
                                href="/inbox-app"
                                data-testid="link-app-inbox"
                              >
                                <div className="flex items-center justify-between mb-3">
                                  <div className="flex items-center gap-2">
                                    <img src={inboxIcon} alt="/inbox icon" className="h-10 w-10 object-contain" />
                                    <img src={inboxLogo} alt="/inbox" className="h-8 object-contain" />
                                  </div>
                                  <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                                    <span className="text-xs font-semibold text-yellow-600 dark:text-yellow-400">Visit Platform →</span>
                                  </div>
                                </div>
                                <div className="text-base font-bold text-gray-900 dark:text-white" data-testid="text-app-inbox-title">Unified Communications</div>
                                <p className="text-xs leading-relaxed text-gray-600 dark:text-gray-400" data-testid="text-app-inbox-description">
                                  Multi-channel messaging hub for all customer communications
                                </p>
                                <ul className="mt-3 space-y-1.5 text-xs text-gray-700 dark:text-gray-300" data-testid="list-app-inbox-features">
                                  <li className="flex items-center"><span className="text-yellow-500 dark:text-yellow-400 mr-1.5">✓</span> Email, Chat & Social DMs</li>
                                  <li className="flex items-center"><span className="text-yellow-500 dark:text-yellow-400 mr-1.5">✓</span> Real-time Messaging</li>
                                  <li className="flex items-center"><span className="text-yellow-500 dark:text-yellow-400 mr-1.5">✓</span> Team Collaboration</li>
                                </ul>
                              </a>
                            </NavigationMenuLink>

                            {/* /livechat */}
                            <NavigationMenuLink asChild>
                              <a
                                className="group block select-none space-y-2 rounded-lg border border-gray-200 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 dark:border-gray-700 p-4 leading-none no-underline outline-none transition-all hover:border-teal-500 hover:shadow-xl hover:from-teal-50 hover:to-teal-100 dark:hover:from-teal-950 dark:hover:to-teal-900 hover:scale-[1.02]"
                                href="/livechat"
                                data-testid="link-app-livechat"
                              >
                                <div className="flex items-center justify-between mb-3">
                                  <div className="flex items-center gap-2">
                                    <img src={livechatIcon} alt="/livechat icon" className="h-10 w-10 object-contain" />
                                    <img src={livechatLogo} alt="/livechat" className="h-8 object-contain" />
                                  </div>
                                  <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                                    <span className="text-xs font-semibold text-teal-600 dark:text-teal-400">Visit Platform →</span>
                                  </div>
                                </div>
                                <div className="text-base font-bold text-gray-900 dark:text-white" data-testid="text-app-livechat-title">Live Chat Widget</div>
                                <p className="text-xs leading-relaxed text-gray-600 dark:text-gray-400" data-testid="text-app-livechat-description">
                                  Real-time customer chat for your website
                                </p>
                                <ul className="mt-3 space-y-1.5 text-xs text-gray-700 dark:text-gray-300" data-testid="list-app-livechat-features">
                                  <li className="flex items-center"><span className="text-teal-500 dark:text-teal-400 mr-1.5">✓</span> Website Live Chat</li>
                                  <li className="flex items-center"><span className="text-teal-500 dark:text-teal-400 mr-1.5">✓</span> Session Persistence</li>
                                  <li className="flex items-center"><span className="text-teal-500 dark:text-teal-400 mr-1.5">✓</span> Conversation History</li>
                                </ul>
                              </a>
                            </NavigationMenuLink>

                            {/* /content */}
                            <NavigationMenuLink asChild>
                              <a
                                className="group block select-none space-y-2 rounded-lg border border-gray-200 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 dark:border-gray-700 p-4 leading-none no-underline outline-none transition-all hover:border-pink-500 hover:shadow-xl hover:from-pink-50 hover:to-pink-100 dark:hover:from-pink-950 dark:hover:to-pink-900 hover:scale-[1.02]"
                                href="/content"
                                data-testid="link-app-content"
                              >
                                <div className="flex items-center justify-between mb-3">
                                  <div className="flex items-center gap-2">
                                    <img src={contentIcon} alt="/content icon" className="h-10 w-10 object-contain" />
                                    <img src={contentLogo} alt="/content" className="h-8 object-contain" />
                                  </div>
                                  <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                                    <span className="text-xs font-semibold text-pink-600 dark:text-pink-400">Visit Platform →</span>
                                  </div>
                                </div>
                                <div className="text-base font-bold text-gray-900 dark:text-white" data-testid="text-app-content-title">Social Media Management</div>
                                <p className="text-xs leading-relaxed text-gray-600 dark:text-gray-400" data-testid="text-app-content-description">
                                  Social media manager
                                </p>
                                <ul className="mt-3 space-y-1.5 text-xs text-gray-700 dark:text-gray-300" data-testid="list-app-content-features">
                                  <li className="flex items-center"><span className="text-pink-500 dark:text-pink-400 mr-1.5">✓</span> Content Calendar</li>
                                  <li className="flex items-center"><span className="text-pink-500 dark:text-pink-400 mr-1.5">✓</span> Media Library</li>
                                  <li className="flex items-center"><span className="text-pink-500 dark:text-pink-400 mr-1.5">✓</span> AI Caption Suggestions</li>
                                </ul>
                              </a>
                            </NavigationMenuLink>
                          </div>
                        </div>
                      </NavigationMenuContent>
                    </NavigationMenuItem>

                    {/* Solutions */}
                    <NavigationMenuItem>
                      <NavigationMenuTrigger className="flex items-center space-x-2 bg-gray-100" data-testid="menu-trigger-solutions">
                        <img src={lightbulbIcon} alt="" className="w-4 h-4" />
                        <span>Solutions</span>
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <div className="grid gap-4 p-6 w-[600px]">
                          <div className="grid grid-cols-1 gap-4">
                            <NavigationMenuLink asChild>
                              <a
                                className="group block select-none space-y-2 rounded-lg border border-gray-200 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 dark:border-gray-700 p-4 leading-none no-underline outline-none transition-all hover:border-orange-500 hover:shadow-lg"
                                href="/solutions/businessblueprint"
                                data-testid="link-solution-businessblueprint"
                              >
                                <div className="flex items-center gap-3 mb-2">
                                  <img src={blueprintIcon} alt="Business Blueprint" className="h-12 w-12 object-contain" />
                                  <div>
                                    <div className="text-lg font-bold text-gray-900 dark:text-white">Business Blueprint</div>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">AI-Powered Digital Intelligence Platform</p>
                                  </div>
                                </div>
                                <ul className="space-y-1.5 text-sm text-gray-700 dark:text-gray-300">
                                  <li className="flex items-center"><span className="text-orange-500 mr-1.5">•</span> AI-powered assessment & coaching</li>
                                  <li className="flex items-center"><span className="text-orange-500 mr-1.5">•</span> Digital IQ scoring</li>
                                  <li className="flex items-center"><span className="text-orange-500 mr-1.5">•</span> Complete communication suite</li>
                                  <li className="flex items-center"><span className="text-orange-500 mr-1.5">•</span> Dashboard & analytics</li>
                                </ul>
                              </a>
                            </NavigationMenuLink>

                            <NavigationMenuLink asChild>
                              <a
                                className="group block select-none space-y-2 rounded-lg border border-gray-200 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 dark:border-gray-700 p-4 leading-none no-underline outline-none transition-all hover:border-purple-500 hover:shadow-lg"
                                href="/solutions/hostsblue"
                                data-testid="link-solution-hostsblue"
                              >
                                <div className="flex items-center gap-3 mb-2">
                                  <img src={hostsBlueIcon} alt="Hosts Blue" className="h-12 w-12 object-contain" />
                                  <div>
                                    <div className="text-lg font-bold text-gray-900 dark:text-white">Hosts Blue</div>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">Web Services & MSP Partner</p>
                                  </div>
                                </div>
                                <ul className="space-y-1.5 text-sm text-gray-700 dark:text-gray-300">
                                  <li className="flex items-center"><span className="text-purple-500 mr-1.5">•</span> High-performance hosting</li>
                                  <li className="flex items-center"><span className="text-purple-500 mr-1.5">•</span> Domain management</li>
                                  <li className="flex items-center"><span className="text-purple-500 mr-1.5">•</span> Website builder tools</li>
                                  <li className="flex items-center"><span className="text-purple-500 mr-1.5">•</span> Technical infrastructure</li>
                                </ul>
                              </a>
                            </NavigationMenuLink>

                            <NavigationMenuLink asChild>
                              <a
                                className="group block select-none space-y-2 rounded-lg border border-gray-200 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 dark:border-gray-700 p-4 leading-none no-underline outline-none transition-all hover:border-red-500 hover:shadow-lg"
                                href="/solutions/swipesblue"
                                data-testid="link-solution-swipesblue"
                              >
                                <div className="flex items-center gap-3 mb-2">
                                  <img src={swipesBlueIcon} alt="Swipes Blue" className="h-12 w-12 object-contain" />
                                  <div>
                                    <div className="text-lg font-bold text-gray-900 dark:text-white">Swipes Blue</div>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">Secure Payment Gateway</p>
                                  </div>
                                </div>
                                <ul className="space-y-1.5 text-sm text-gray-700 dark:text-gray-300">
                                  <li className="flex items-center"><span className="text-red-500 mr-1.5">•</span> Secure checkout integration</li>
                                  <li className="flex items-center"><span className="text-red-500 mr-1.5">•</span> Transaction management</li>
                                  <li className="flex items-center"><span className="text-red-500 mr-1.5">•</span> Powers all platform payments</li>
                                  <li className="flex items-center"><span className="text-red-500 mr-1.5">•</span> Embedded payment flows</li>
                                </ul>
                              </a>
                            </NavigationMenuLink>
                          </div>
                        </div>
                      </NavigationMenuContent>
                    </NavigationMenuItem>

                    {/* Resources - Keep Current */}
                    <NavigationMenuItem>
                      <NavigationMenuTrigger className="flex items-center space-x-2 bg-gray-100" data-testid="menu-trigger-resources">
                        <img src={bookOpenIcon} alt="" className="w-4 h-4" />
                        <span>Resources</span>
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <div className="grid grid-cols-3 gap-4 p-6 w-[700px]">
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
                                data-testid="link-solutions-businessblueprint"
                              >
                                <div className="w-4 h-4 mt-0.5 flex-shrink-0">
                                  <img src={bbIcon} alt="Business Blueprint" className="w-full h-full object-contain" />
                                </div>
                                <div>
                                  <div className="text-sm font-medium text-gray-900 dark:text-white">Business Blueprint</div>
                                  <p className="text-xs text-gray-600 dark:text-gray-400">Digital intelligence platform</p>
                                </div>
                              </a>
                            </NavigationMenuLink>
                            <NavigationMenuLink asChild>
                              <a
                                className="group flex items-start space-x-2 rounded-md p-2 leading-none no-underline outline-none transition-colors hover:bg-accent"
                                href="#hostsblue"
                                data-testid="link-solutions-hostsblue"
                              >
                                <div className="w-4 h-4 mt-0.5 flex-shrink-0">
                                  <img src={hostsBlueIcon} alt="Hosts Blue" className="w-full h-full object-contain" />
                                </div>
                                <div>
                                  <div className="text-sm font-medium text-gray-900 dark:text-white">Hosts Blue</div>
                                  <p className="text-xs text-gray-600 dark:text-gray-400">Website hosting & builder</p>
                                </div>
                              </a>
                            </NavigationMenuLink>
                            <NavigationMenuLink asChild>
                              <a
                                className="group flex items-start space-x-2 rounded-md p-2 leading-none no-underline outline-none transition-colors hover:bg-accent"
                                href="#swipesblue"
                                data-testid="link-solutions-swipesblue"
                              >
                                <div className="w-4 h-4 mt-0.5 flex-shrink-0">
                                  <img src={swipesBlueIcon} alt="Swipes Blue" className="w-full h-full object-contain" />
                                </div>
                                <div>
                                  <div className="text-sm font-medium text-gray-900 dark:text-white">Swipes Blue</div>
                                  <p className="text-xs text-gray-600 dark:text-gray-400">Payment gateway</p>
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
              </>
            )}
          </div>

          {/* Right side - Quick Access & Login/Signup Buttons */}
          <div className="flex items-center space-x-3">
            {showNavigation && (
              <>
                {/* Quick Access Inbox */}
                <Button
                  variant="outline"
                  size="sm"
                  className="hidden md:flex items-center space-x-2 bg-white border-blue-500 hover:bg-blue-50 text-blue-600"
                  asChild
                  data-testid="button-quick-inbox"
                >
                  <a href="/inbox">
                    <img src={inboxIcon} alt="/inbox" className="w-5 h-5" style={{ filter: 'invert(31%) sepia(100%) saturate(2000%) hue-rotate(205deg) brightness(95%) contrast(101%)' }} />
                    <span className="font-bold">Inbox</span>
                  </a>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="hidden sm:flex items-center space-x-2"
                  asChild
                  data-testid="button-login"
                >
                  <a href="/api/login">
                    <img src={logInIcon} alt="" className="w-4 h-4" />
                    <span>Login</span>
                  </a>
                </Button>
                <Button
                  size="sm"
                  className="hidden sm:flex items-center space-x-2 bg-blue-600 hover:bg-blue-700"
                  asChild
                  data-testid="button-signup"
                >
                  <a href="/assessment">
                    <img src={userPlusIcon} alt="" className="w-4 h-4" />
                    <span>Sign Up</span>
                  </a>
                </Button>
              </>
            )}
          </div>
        </div>

        {/* Mobile Menu - Matches Desktop Navigation Structure */}
        {isMobileMenuOpen && showNavigation && (
          <div className="lg:hidden border-t border-gray-200 bg-white max-h-[calc(100vh-4rem)] overflow-y-auto">
            <nav className="p-4 space-y-1">
              {/* Applications Section */}
              <div className="border-b border-gray-200 pb-3 mb-3">
                <h3 className="font-semibold text-gray-500 text-xs uppercase tracking-wide px-3 mb-2 flex items-center gap-2">
                  <img src={layersIcon} alt="" className="w-4 h-4" style={{ filter: 'invert(50%) sepia(10%) saturate(100%) hue-rotate(180deg) brightness(90%) contrast(90%)' }} />
                  <span>Applications</span>
                </h3>
                <div className="space-y-1">
                  <a href="/send" className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-green-50 transition-colors" data-testid="link-mobile-send">
                    <img src={sendIcon} alt="" className="h-7 w-7 object-contain" />
                    <div className="flex-1">
                      <img src={sendLogo} alt="/send" className="h-5 mb-1" />
                      <div className="text-xs text-gray-600">Email & SMS Marketing</div>
                    </div>
                  </a>
                  <a href="/inbox-app" className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-yellow-50 transition-colors" data-testid="link-mobile-inbox">
                    <img src={inboxIcon} alt="" className="h-7 w-7 object-contain" />
                    <div className="flex-1">
                      <img src={inboxLogo} alt="/inbox" className="h-5 mb-1" />
                      <div className="text-xs text-gray-600">Unified Communications</div>
                    </div>
                  </a>
                  <a href="/livechat" className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-teal-50 transition-colors" data-testid="link-mobile-livechat">
                    <img src={livechatIcon} alt="" className="h-7 w-7 object-contain" />
                    <div className="flex-1">
                      <img src={livechatLogo} alt="/livechat" className="h-5 mb-1" />
                      <div className="text-xs text-gray-600">Live Chat Widget</div>
                    </div>
                  </a>
                  <a href="/content" className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-pink-50 transition-colors" data-testid="link-mobile-content">
                    <img src={contentIcon} alt="" className="h-7 w-7 object-contain" />
                    <div className="flex-1">
                      <img src={contentLogo} alt="/content" className="h-5 mb-1" />
                      <div className="text-xs text-gray-600">Social Media Mgmt</div>
                    </div>
                  </a>
                </div>
              </div>

              {/* Solutions Section */}
              <div className="border-b border-gray-200 pb-3 mb-3">
                <h3 className="font-semibold text-gray-500 text-xs uppercase tracking-wide px-3 mb-2 flex items-center gap-2">
                  <img src={bookOpenIcon} alt="" className="w-4 h-4" style={{ filter: 'invert(50%) sepia(10%) saturate(100%) hue-rotate(180deg) brightness(90%) contrast(90%)' }} />
                  <span>Solutions</span>
                </h3>
                
                {/* Platforms */}
                <div className="space-y-1">
                  <a href="/" className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-orange-50 transition-colors" data-testid="link-mobile-businessblueprint">
                    <img src={bbIcon} alt="" className="h-7 w-7 object-contain" />
                    <div className="flex-1">
                      <div className="text-sm font-semibold text-gray-900">Business Blueprint</div>
                      <div className="text-xs text-gray-600">Digital intelligence</div>
                    </div>
                  </a>
                  <a href="#hostsblue" className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-purple-50 transition-colors" data-testid="link-mobile-hostsblue">
                    <img src={hostsBlueIcon} alt="" className="h-7 w-7 object-contain" />
                    <div className="flex-1">
                      <div className="text-sm font-semibold text-gray-900">Hosts Blue</div>
                      <div className="text-xs text-gray-600">Hosting & domains</div>
                    </div>
                  </a>
                  <a href="#swipesblue" className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-red-50 transition-colors" data-testid="link-mobile-swipesblue">
                    <img src={swipesBlueIcon} alt="" className="h-7 w-7 object-contain" />
                    <div className="flex-1">
                      <div className="text-sm font-semibold text-gray-900">Swipes Blue</div>
                      <div className="text-xs text-gray-600">Payment gateway</div>
                    </div>
                  </a>
                </div>

                {/* Learning & Developer Resources */}
                <div className="mt-3 pt-3 border-t border-gray-100 space-y-1">
                  <a href="/journey" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors" data-testid="link-mobile-journey">
                    <img src={compassIcon} alt="" className="w-5 h-5" style={{ filter: 'invert(50%) sepia(10%) saturate(100%) hue-rotate(180deg) brightness(90%) contrast(90%)' }} />
                    <span className="text-sm text-gray-700">Getting Started</span>
                  </a>
                  <a href="/about" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors" data-testid="link-mobile-about">
                    <img src={trendingUpIcon} alt="" className="w-5 h-5" style={{ filter: 'invert(50%) sepia(10%) saturate(100%) hue-rotate(180deg) brightness(90%) contrast(90%)' }} />
                    <span className="text-sm text-gray-700">Success Stories</span>
                  </a>
                  <a href="/send-api-docs" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors" data-testid="link-mobile-api-docs">
                    <img src={codeIcon} alt="" className="w-5 h-5" style={{ filter: 'invert(50%) sepia(10%) saturate(100%) hue-rotate(180deg) brightness(90%) contrast(90%)' }} />
                    <span className="text-sm text-gray-700">/send API Docs</span>
                  </a>
                </div>
              </div>

              {/* Pricing Section */}
              <div className="pb-3">
                <h3 className="font-semibold text-gray-500 text-xs uppercase tracking-wide px-3 mb-2 flex items-center gap-2">
                  <img src={dollarSignIcon} alt="" className="w-4 h-4" style={{ filter: 'invert(50%) sepia(10%) saturate(100%) hue-rotate(180deg) brightness(90%) contrast(90%)' }} />
                  <span>Pricing</span>
                </h3>
                <div className="space-y-1">
                  <a href="/pathways" className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-blue-50 transition-colors">
                    <img src={compassIcon} alt="" className="w-6 h-6" style={{ filter: 'invert(31%) sepia(100%) saturate(2000%) hue-rotate(205deg) brightness(95%) contrast(101%)' }} />
                    <div className="flex-1">
                      <div className="text-sm font-semibold text-gray-900">Pathways</div>
                      <div className="text-xs text-gray-600">DIY vs MSP comparison</div>
                    </div>
                  </a>
                  <a href="/marketplace" className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-green-50 transition-colors">
                    <img src={shoppingBasketIcon} alt="" className="w-6 h-6" style={{ filter: 'invert(46%) sepia(96%) saturate(589%) hue-rotate(86deg) brightness(92%) contrast(87%)' }} />
                    <div className="flex-1">
                      <div className="text-sm font-semibold text-gray-900">Marketplace</div>
                      <div className="text-xs text-gray-600">Browse all pricing</div>
                    </div>
                  </a>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-2 pt-4 border-t border-gray-200">
                <Button variant="outline" size="lg" className="w-full justify-start gap-3" asChild>
                  <a href="/api/login">
                    <img src={logInIcon} alt="" className="w-5 h-5" />
                    <span className="font-semibold">Login</span>
                  </a>
                </Button>
                <Button size="lg" className="w-full justify-start gap-3 bg-blue-600 hover:bg-blue-700 text-white" asChild>
                  <a href="/assessment">
                    <img src={userPlusIcon} alt="" className="w-5 h-5" />
                    <span className="font-semibold">Free Assessment</span>
                  </a>
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}