import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/useAuth";
import { ClipboardCheck, FileText, Layers, Wrench, Rocket } from "lucide-react";
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
import badge1 from "@assets/Digital IQ Assessment (1)_1763874287091.png";
import badge2 from "@assets/Get Your Prescribed Blueprint (2)_1763874287090.png";
import badge3 from "@assets/LocalBlue Bundle (3)_1763874287091.png";
import badge4 from "@assets/Coach Blue as Blue(4)_1763874287091.png";
import badge5 from "@assets/Commverse (5)_1763874287091.png";

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
        <div className="flex items-center justify-between h-20">
          {/* Logo - Takes up ~1/5 of header width */}
          <div className="flex items-center w-1/5 min-w-fit mr-4">
            <Link href="/" className="hover:opacity-80 transition-opacity cursor-pointer" data-testid="header-logo">
              <BrandLogo brand="businessblueprint" size="md" />
            </Link>

            {showNavigation && (
              <>
                {/* Desktop Mega Menu - Closer spacing */}
                <NavigationMenu className="hidden lg:flex ml-4">
                  <NavigationMenuList className="-space-x-4">
                    {/* How It Works (NEW) */}
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
                            <Link href="/assessment" className="block" data-testid="link-how-it-works-step1-digital-iq">
                              <div className="flex items-start gap-2 p-2 rounded-lg border-l-4 border-orange-500 hover:bg-orange-50 dark:hover:bg-orange-950 transition-colors cursor-pointer">
                                <div className="flex-shrink-0 -mt-2">
                                  <img src={badge1} alt="Step 1" className="w-10 h-10 object-contain" />
                                </div>
                                <div className="text-left">
                                  <div className="font-bold text-sm text-gray-900 dark:text-white">Digital IQ Assessment</div>
                                  <p className="text-xs text-gray-600 dark:text-gray-400">
                                    AI-powered audit of your online presence
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
                                  Your personalized growth plan
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
                                    Listings & reputation management
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
                                    Your AI business coach
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
                                    Messaging suite: /send /inbox /livechat /content
                                  </p>
                                </div>
                              </div>
                            </Link>
                          </div>

                          <div className="mt-6">
                            <Link href="/assessment">
                              <Button className="w-full bg-orange-500 hover:bg-orange-600" data-testid="button-start-digital-iq">
                                Get Your Digital IQ Score →
                              </Button>
                            </Link>
                          </div>
                        </div>
                      </NavigationMenuContent>
                    </NavigationMenuItem>

                    {/* Pricing (ENHANCED) */}
                    <NavigationMenuItem>
                      <NavigationMenuTrigger className="flex items-center space-x-1 bg-gray-100" data-testid="menu-trigger-pricing">
                        <img src={dollarSignIcon} alt="" className="w-4 h-4" />
                        <span>Pricing</span>
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <div className="p-3 w-[600px]">
                          {/* APP BUNDLES */}
                          <div className="mb-4">
                            <h4 className="text-[10px] font-bold text-gray-700 mb-2 uppercase tracking-wide">
                              APP BUNDLES - COMPLETE SOLUTIONS
                            </h4>
                            <div className="grid grid-cols-2 gap-2">
                              {/* Commverse Bundle */}
                              <a href="/pricing?bundle=commverse" className="block p-3 rounded border border-blue-600 hover:shadow-lg transition-all">
                                <div className="flex items-center gap-1 mb-1">
                                  <img src={commverseIcon} alt="" className="w-6 h-6" />
                                  <img src={commverseBundle} alt="Commverse" className="h-4" />
                                </div>
                                <div className="text-xl font-bold mb-0.5" style={{ color: '#0000FF' }}>$100<span className="text-xs">/mo</span></div>
                                <p className="text-[10px] text-gray-600 mb-1">/send + /inbox + /livechat + /content</p>
                                <p className="text-[10px] text-green-600 mb-2">Save $40/month</p>
                                <Button size="sm" variant="outline" className="w-full h-7 text-xs border-blue-600 text-blue-600 hover:bg-blue-50">
                                  Select →
                                </Button>
                                <p className="text-[9px] text-gray-500 mt-1 text-center">COMMVERSE 2/3 OF BASE</p>
                              </a>

                              {/* LocalBlue Bundle */}
                              <a href="/localblue" className="block p-3 rounded border border-blue-600 hover:shadow-lg transition-all">
                                <div className="flex items-center gap-1 mb-1">
                                  <img src={badge3} alt="" className="w-6 h-6" />
                                  <img src={localBlueLogo} alt="LocalBlue" className="h-4" />
                                </div>
                                <div className="text-xl font-bold mb-0.5" style={{ color: '#0000FF' }}>$60<span className="text-xs">/mo</span></div>
                                <p className="text-[10px] text-gray-600 mb-1">/listings + /reputation</p>
                                <p className="text-[10px] text-green-600 mb-2">Save $20/month</p>
                                <Button size="sm" variant="outline" className="w-full h-7 text-xs border-blue-600 text-blue-600 hover:bg-blue-50">
                                  Select →
                                </Button>
                                <p className="text-[9px] text-gray-500 mt-1 text-center">localblue 1/3 of base</p>
                              </a>
                            </div>
                          </div>

                          {/* INDIVIDUAL APPS - COMMVERSE */}
                          <div className="mb-4">
                            <h4 className="text-[10px] font-bold text-gray-700 mb-2 uppercase tracking-wide">
                              INDIVIDUAL APPS - $35/MO EACH
                            </h4>
                            <div className="grid grid-cols-2 gap-2">
                              <a href="/send" className="p-2 rounded border hover:shadow transition-all" style={{ borderColor: '#FF6B00' }}>
                                <div className="flex items-center gap-1 mb-1">
                                  <img src={sendIcon} alt="" className="w-6 h-6" />
                                  <img src={sendLogo} alt="/send" className="h-3" />
                                </div>
                                <p className="text-[9px] text-gray-600">Email/SMS</p>
                              </a>

                              <a href="/inbox" className="p-2 rounded border hover:shadow transition-all" style={{ borderColor: '#0080FF' }}>
                                <div className="flex items-center gap-1 mb-1">
                                  <img src={inboxIcon} alt="" className="w-6 h-6" />
                                  <img src={inboxLogo} alt="/inbox" className="h-3" />
                                </div>
                                <p className="text-[9px] text-gray-600">Unified Inbox</p>
                              </a>

                              <a href="/livechat" className="p-2 rounded border hover:shadow transition-all" style={{ borderColor: '#8000FF' }}>
                                <div className="flex items-center gap-1 mb-1">
                                  <img src={livechatIcon} alt="" className="w-6 h-6" />
                                  <img src={livechatLogo} alt="/livechat" className="h-3" />
                                </div>
                                <p className="text-[9px] text-gray-600">Real-time</p>
                              </a>

                              <a href="/content" className="p-2 rounded border hover:shadow transition-all" style={{ borderColor: '#E91EBC' }}>
                                <div className="flex items-center gap-1 mb-1">
                                  <img src={contentIcon} alt="" className="w-6 h-6" />
                                  <img src={contentLogo} alt="/content" className="h-3" />
                                </div>
                                <p className="text-[9px] text-gray-600">Social</p>
                              </a>
                            </div>
                          </div>

                          {/* INDIVIDUAL APPS - LOCALBLUE */}
                          <div className="mb-4">
                            <h4 className="text-[10px] font-bold text-gray-700 mb-2 uppercase tracking-wide">
                              INDIVIDUAL APPS - $40/MO EACH
                            </h4>
                            <div className="grid grid-cols-2 gap-2">
                              <a href="/listings-landing" className="p-2 rounded border hover:shadow transition-all" style={{ borderColor: '#FF0040' }}>
                                <div className="flex items-center gap-1 mb-1">
                                  <img src={listingsIcon} alt="" className="w-6 h-6" />
                                  <img src={listingsLogo} alt="/listings" className="h-3" />
                                </div>
                                <p className="text-[9px] text-gray-600">Directory sync</p>
                              </a>

                              <a href="/reputation-landing" className="p-2 rounded border hover:shadow transition-all" style={{ borderColor: '#D59600' }}>
                                <div className="flex items-center gap-1 mb-1">
                                  <img src={reputationIcon} alt="" className="w-6 h-6" />
                                  <img src={reputationLogo} alt="/reputation" className="h-3" />
                                </div>
                                <p className="text-[9px] text-gray-600">Reviews</p>
                              </a>
                            </div>
                          </div>

                          {/* ADDITIONAL SERVICES */}
                          <div>
                            <h4 className="text-[10px] font-bold text-gray-700 mb-2 uppercase tracking-wide">
                              ADDITIONAL SERVICES
                            </h4>
                            <div className="grid grid-cols-2 gap-2">
                              <a href="/ai-coach" className="flex items-center gap-2 p-2 rounded border hover:shadow transition-all">
                                <img src={coachBlueIcon} alt="Coach Blue" className="w-8 h-8" />
                                <div className="flex-1">
                                  <div className="text-xs font-bold">Coach Blue</div>
                                  <p className="text-[9px] text-gray-600">AI Agent Coach</p>
                                </div>
                                <div className="text-sm font-bold text-purple-600">$99/mo</div>
                              </a>

                              <a href="/assessment" className="flex items-center gap-2 p-2 rounded border hover:shadow transition-all">
                                <img src={badge1} alt="Digital IQ" className="w-8 h-8" />
                                <div className="flex-1">
                                  <div className="text-xs font-bold">Digital IQ</div>
                                  <p className="text-[9px] text-gray-600">Assessment</p>
                                </div>
                                <div className="text-sm font-bold text-green-600">FREE</div>
                              </a>
                            </div>
                          </div>
                        </div>
                      </NavigationMenuContent>
                    </NavigationMenuItem>

                    {/* Applications - Commverse Apps with Bundle Highlight */}
                    <NavigationMenuItem>
                      <NavigationMenuTrigger className="flex items-center space-x-1 bg-gray-100" data-testid="menu-trigger-applications">
                        <img src={layersIcon} alt="" className="w-4 h-4" />
                        <span>Applications</span>
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <div className="p-3 w-[90vw] max-w-[1000px]">
                          {/* Two-column layout: Commverse (left) | LocalBlue (right) */}
                          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                            {/* LEFT COLUMN: Commverse Bundle */}
                            <div className="space-y-2">
                              <div className="p-3 rounded-lg border border-blue-500 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950">
                                <div className="flex items-center justify-between mb-3">
                                  <div className="flex items-center gap-2">
                                    <img src={commverseIcon} alt="Commverse" className="h-9 w-9 object-contain rounded-lg" />
                                    <div>
                                      <img src={commverseBundle} alt="Commverse Bundle" className="h-6 object-contain mb-1" />
                                      <p className="text-[10px] text-gray-600 dark:text-gray-400">All 4 Apps</p>
                                    </div>
                                  </div>
                                  <div>
                                    <div className="text-lg font-bold text-blue-600 dark:text-blue-400">$100<span className="text-xs">/mo</span></div>
                                    <p className="text-[10px] text-green-600 dark:text-green-400">Save $40</p>
                                  </div>
                                </div>
                                <Link href="/commverse">
                                  <Button size="sm" className="w-full h-8 text-sm" data-testid="button-get-commverse">
                                    Get Bundle →
                                  </Button>
                                </Link>
                              </div>

                              <div>
                                <h4 className="text-[9px] font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wide mb-1">
                                  Or $35/mo each
                                </h4>
                              </div>
                              <div className="grid grid-cols-2 gap-2">
                            {/* /send */}
                            <div className="group flex flex-col h-full rounded-lg border border-gray-200 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 dark:border-gray-700 p-2 transition-all hover:border-green-500 hover:shadow-lg hover:from-green-50 hover:to-green-100 dark:hover:from-green-950 dark:hover:to-green-900" data-testid="card-app-send">
                              <div className="flex items-center gap-1 mb-1">
                                <img src={sendIcon} alt="/send icon" className="h-5 w-5 object-contain flex-shrink-0" />
                                <div className="h-4 flex items-center">
                                  <img src={sendLogo} alt="/send" className="h-4 w-16 object-contain" />
                                </div>
                              </div>
                              <div className="text-xs font-bold text-gray-900 dark:text-white" data-testid="text-app-send-title">Email + SMS Marketing</div>
                              <p className="text-[10px] leading-tight text-gray-600 dark:text-gray-400 mb-1" data-testid="text-app-send-description">
                                Unified campaigns
                              </p>
                              <ul className="space-y-0.5 text-[9px] text-gray-700 dark:text-gray-300 mb-2" data-testid="list-app-send-features">
                                <li className="flex items-center"><span className="text-green-500 dark:text-green-400 mr-1">✓</span> Email & SMS</li>
                                <li className="flex items-center"><span className="text-green-500 dark:text-green-400 mr-1">✓</span> Contact Mgmt</li>
                                <li className="flex items-center"><span className="text-green-500 dark:text-green-400 mr-1">✓</span> Compliant</li>
                              </ul>
                              <Button size="sm" className="w-full h-6 text-[10px] mt-auto text-black" style={{ backgroundColor: '#ffd700' }} asChild>
                                <Link href="/send" data-testid="button-select-send">
                                  Select →
                                </Link>
                              </Button>
                            </div>

                            {/* /inbox */}
                            <div className="group flex flex-col h-full rounded-lg border border-gray-200 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 dark:border-gray-700 p-2 transition-all hover:border-pink-500 hover:shadow-lg hover:from-pink-50 hover:to-pink-100 dark:hover:from-pink-950 dark:hover:to-pink-900" data-testid="card-app-inbox">
                              <div className="flex items-center gap-1 mb-1">
                                <img src={inboxIcon} alt="/inbox icon" className="h-5 w-5 object-contain flex-shrink-0" />
                                <div className="h-4 flex items-center">
                                  <img src={inboxLogo} alt="/inbox" className="h-4 w-16 object-contain" />
                                </div>
                              </div>
                              <div className="text-xs font-bold text-gray-900 dark:text-white" data-testid="text-app-inbox-title">Unified Comms</div>
                              <p className="text-[10px] leading-tight text-gray-600 dark:text-gray-400 mb-1" data-testid="text-app-inbox-description">
                                Multi-channel hub
                              </p>
                              <ul className="space-y-0.5 text-[9px] text-gray-700 dark:text-gray-300 mb-2" data-testid="list-app-inbox-features">
                                <li className="flex items-center"><span className="text-pink-500 dark:text-pink-400 mr-1">✓</span> Email & Chat</li>
                                <li className="flex items-center"><span className="text-pink-500 dark:text-pink-400 mr-1">✓</span> Real-time</li>
                                <li className="flex items-center"><span className="text-pink-500 dark:text-pink-400 mr-1">✓</span> Team Collab</li>
                              </ul>
                              <Button size="sm" className="w-full h-6 text-[10px] mt-auto text-white" style={{ backgroundColor: '#6ea6ff' }} asChild>
                                <Link href="/inbox" data-testid="button-select-inbox">
                                  Select →
                                </Link>
                              </Button>
                            </div>

                            {/* /livechat */}
                            <div className="group flex flex-col h-full rounded-lg border border-gray-200 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 dark:border-gray-700 p-2 transition-all hover:border-teal-500 hover:shadow-lg hover:from-teal-50 hover:to-teal-100 dark:hover:from-teal-950 dark:hover:to-teal-900" data-testid="card-app-livechat">
                              <div className="flex items-center gap-1 mb-1">
                                <img src={livechatIcon} alt="/livechat icon" className="h-5 w-5 object-contain flex-shrink-0" />
                                <div className="h-4 flex items-center">
                                  <img src={livechatLogo} alt="/livechat" className="h-4 w-16 object-contain" />
                                </div>
                              </div>
                              <div className="text-xs font-bold text-gray-900 dark:text-white" data-testid="text-app-livechat-title">Live Chat Widget</div>
                              <p className="text-[10px] leading-tight text-gray-600 dark:text-gray-400 mb-1" data-testid="text-app-livechat-description">
                                Website chat
                              </p>
                              <ul className="space-y-0.5 text-[9px] text-gray-700 dark:text-gray-300 mb-2" data-testid="list-app-livechat-features">
                                <li className="flex items-center"><span className="text-teal-500 dark:text-teal-400 mr-1">✓</span> Live Chat</li>
                                <li className="flex items-center"><span className="text-teal-500 dark:text-teal-400 mr-1">✓</span> Persistence</li>
                                <li className="flex items-center"><span className="text-teal-500 dark:text-teal-400 mr-1">✓</span> History</li>
                              </ul>
                              <Button size="sm" className="w-full h-6 text-[10px] mt-auto text-white" style={{ backgroundColor: '#8002ff' }} asChild>
                                <Link href="/livechat" data-testid="button-select-livechat">
                                  Select →
                                </Link>
                              </Button>
                            </div>

                            {/* /content */}
                            <div className="group flex flex-col h-full rounded-lg border border-gray-200 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 dark:border-gray-700 p-2 transition-all hover:border-fuchsia-500 hover:shadow-lg hover:from-fuchsia-50 hover:to-fuchsia-100 dark:hover:from-fuchsia-950 dark:hover:to-fuchsia-900" data-testid="card-app-content">
                              <div className="flex items-center gap-1 mb-1">
                                <img src={contentIcon} alt="/content icon" className="h-5 w-5 object-contain flex-shrink-0" />
                                <div className="h-4 flex items-center">
                                  <img src={contentLogo} alt="/content" className="h-4 w-16 object-contain" />
                                </div>
                              </div>
                              <div className="text-xs font-bold text-gray-900 dark:text-white" data-testid="text-app-content-title">Social Media</div>
                              <p className="text-[10px] leading-tight text-gray-600 dark:text-gray-400 mb-1" data-testid="text-app-content-description">
                                Social manager
                              </p>
                              <ul className="space-y-0.5 text-[9px] text-gray-700 dark:text-gray-300 mb-2" data-testid="list-app-content-features">
                                <li className="flex items-center"><span className="text-fuchsia-500 dark:text-fuchsia-400 mr-1">✓</span> Calendar</li>
                                <li className="flex items-center"><span className="text-fuchsia-500 dark:text-fuchsia-400 mr-1">✓</span> Media Library</li>
                                <li className="flex items-center"><span className="text-fuchsia-500 dark:text-fuchsia-400 mr-1">✓</span> AI Captions</li>
                              </ul>
                              <Button size="sm" className="w-full h-6 text-[10px] mt-auto text-white" style={{ backgroundColor: '#e91ebc' }} asChild>
                                <Link href="/content-landing" data-testid="button-select-content">
                                  Select →
                                </Link>
                              </Button>
                            </div>
                              </div>
                            </div>

                            {/* RIGHT COLUMN: LocalBlue Bundle */}
                            <div className="space-y-2">
                              <div className="p-2 rounded-lg border border-blue-500 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950">
                                <div className="flex items-center justify-between mb-2">
                                  <div className="flex items-center gap-1.5">
                                    <img src={badge3} alt="LocalBlue" className="h-7 w-7 object-contain rounded-lg" />
                                    <div>
                                      <img src={localBlueLogo} alt="/localblue Bundle" className="h-4 object-contain mb-0.5" />
                                      <p className="text-[9px] text-gray-600 dark:text-gray-400">All 3 Apps</p>
                                    </div>
                                  </div>
                                  <div>
                                    <div className="text-base font-bold text-blue-600 dark:text-blue-400">$75<span className="text-[10px]">/mo</span></div>
                                    <p className="text-[9px] text-green-600 dark:text-green-400">Save $10</p>
                                  </div>
                                </div>
                                <Link href="/localblue">
                                  <Button size="sm" className="w-full h-6 text-xs" data-testid="button-get-localblue">
                                    Get Bundle →
                                  </Button>
                                </Link>
                              </div>

                            <div className="mb-1">
                              <h4 className="text-[9px] font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wide">
                                Or $40/mo each
                              </h4>
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                              {/* /reputation */}
                              <div className="group flex flex-col h-full rounded-lg border border-gray-200 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 dark:border-gray-700 p-2 transition-all hover:border-amber-500 hover:shadow-lg hover:from-amber-50 hover:to-amber-100 dark:hover:from-amber-950 dark:hover:to-amber-900" data-testid="card-app-reputation">
                                <div className="flex items-center gap-1 mb-1">
                                  <img src={reputationIcon} alt="/reputation icon" className="h-5 w-5 object-contain flex-shrink-0" />
                                  <div className="h-4 flex items-center">
                                    <img src={reputationLogo} alt="/reputation" className="h-4 w-16 object-contain" />
                                  </div>
                                </div>
                                <div className="text-xs font-bold text-gray-900 dark:text-white" data-testid="text-app-reputation-title">Review Mgmt</div>
                                <p className="text-[10px] leading-tight text-gray-600 dark:text-gray-400 mb-1" data-testid="text-app-reputation-description">
                                  Review response
                                </p>
                                <ul className="space-y-0.5 text-[9px] text-gray-700 dark:text-gray-300 mb-2" data-testid="list-app-reputation-features">
                                  <li className="flex items-center"><span className="text-amber-500 dark:text-amber-400 mr-1">✓</span> Multi-Platform</li>
                                  <li className="flex items-center"><span className="text-amber-500 dark:text-amber-400 mr-1">✓</span> AI Responses</li>
                                  <li className="flex items-center"><span className="text-amber-500 dark:text-amber-400 mr-1">✓</span> Sentiment</li>
                                </ul>
                                <Button size="sm" className="w-full h-6 text-[10px] mt-auto text-white" style={{ backgroundColor: '#D59600' }} asChild>
                                  <Link href="/reputation-landing" data-testid="button-select-reputation">
                                    Select →
                                  </Link>
                                </Button>
                              </div>

                              {/* /listings */}
                              <div className="group flex flex-col h-full rounded-lg border border-gray-200 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 dark:border-gray-700 p-2 transition-all hover:border-rose-500 hover:shadow-lg hover:from-rose-50 hover:to-rose-100 dark:hover:from-rose-950 dark:hover:to-rose-900" data-testid="card-app-listings">
                                <div className="flex items-center gap-1 mb-1">
                                  <img src={listingsIcon} alt="/listings icon" className="h-5 w-5 object-contain flex-shrink-0" />
                                  <div className="h-4 flex items-center">
                                    <img src={listingsLogo} alt="/listings" className="h-4 w-16 object-contain" />
                                  </div>
                                </div>
                                <div className="text-xs font-bold text-gray-900 dark:text-white" data-testid="text-app-listings-title">Business Listings</div>
                                <p className="text-[10px] leading-tight text-gray-600 dark:text-gray-400 mb-1" data-testid="text-app-listings-description">
                                  Directory sync
                                </p>
                                <ul className="space-y-0.5 text-[9px] text-gray-700 dark:text-gray-300 mb-2" data-testid="list-app-listings-features">
                                  <li className="flex items-center"><span className="text-rose-500 dark:text-rose-400 mr-1">✓</span> Directory Sync</li>
                                  <li className="flex items-center"><span className="text-rose-500 dark:text-rose-400 mr-1">✓</span> Multi-Platform</li>
                                  <li className="flex items-center"><span className="text-rose-500 dark:text-rose-400 mr-1">✓</span> Analytics</li>
                                </ul>
                                <Button size="sm" className="w-full h-6 text-[10px] mt-auto text-white" style={{ backgroundColor: '#FF0040' }} asChild>
                                  <Link href="/listings-landing" data-testid="button-select-listings">
                                    Select →
                                  </Link>
                                </Button>
                              </div>
                              </div> {/* Close LocalBlue apps grid */}
                            </div> {/* Close RIGHT column */}
                          </div> {/* Close main grid wrapper */}
                        </div> {/* Close Applications content container */}
                      </NavigationMenuContent>
                    </NavigationMenuItem>

                    {/* Solutions */}
                    <NavigationMenuItem>
                      <NavigationMenuTrigger className="flex items-center space-x-1 bg-gray-100" data-testid="menu-trigger-solutions">
                        <img src={lightbulbIcon} alt="" className="w-4 h-4" />
                        <span>Solutions</span>
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <div className="grid gap-4 p-6 w-[90vw] max-w-[600px]">
                          <div className="grid grid-cols-1 gap-4">
                            <NavigationMenuLink asChild>
                              <a
                                className="group block select-none space-y-2 rounded-lg border border-gray-200 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 dark:border-gray-700 p-4 leading-none no-underline outline-none transition-all hover:border-orange-500 hover:shadow-lg"
                                href="/solutions/businessblueprint"
                                data-testid="link-solution-businessblueprint"
                              >
                                <div className="flex items-center gap-3 mb-2">
                                  <img src={blueprintIcon} alt="BusinessBlueprint" className="h-12 w-12 object-contain" />
                                  <div>
                                    <div className="text-lg font-bold text-gray-900 dark:text-white">BusinessBlueprint</div>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">AI-Powered Digital Intelligence Platform</p>
                                  </div>
                                </div>
                                <ul className="space-y-1.5 text-sm text-gray-700 dark:text-gray-300">
                                  <li className="flex items-center"><span className="text-orange-500 mr-1.5">•</span> <Link href="/assessment" className="hover:text-orange-500 underline" data-testid="link-solutions-digital-iq">Digital IQ Scanner</Link> - Get your score (70-140)</li>
                                  <li className="flex items-center"><span className="text-orange-500 mr-1.5">•</span> AI-powered assessment & coaching</li>
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
                                  <img src={hostsBlueIcon} alt="HostsBlue" className="h-12 w-12 object-contain" />
                                  <div>
                                    <div className="text-lg font-bold text-gray-900 dark:text-white">HostsBlue</div>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">Web Services Partner</p>
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
                                  <img src={swipesBlueIcon} alt="SwipesBlue" className="h-12 w-12 object-contain" />
                                  <div>
                                    <div className="text-lg font-bold text-gray-900 dark:text-white">SwipesBlue</div>
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
                                data-testid="link-solutions-businessblueprint"
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
                                data-testid="link-solutions-hostsblue"
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
                                data-testid="link-solutions-swipesblue"
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
          <div className="flex items-center gap-1.5">
            {showNavigation && (
              <>
                {/* Quick Access Inbox */}
                <a
                  href="/inbox"
                  className="hidden md:flex items-center gap-1.5 px-2.5 py-2 bg-white border border-blue-600 hover:bg-blue-50 text-blue-600 rounded-md font-medium text-sm transition-colors"
                  data-testid="button-quick-inbox"
                >
                  <img src={inboxIcon} alt="/inbox" className="w-5 h-5 opacity-90" style={{ filter: 'invert(31%) sepia(100%) saturate(2000%) hue-rotate(205deg) brightness(95%) contrast(101%)' }} />
                  <span className="font-bold">Inbox</span>
                </a>
                <a
                  href="/api/login"
                  className="hidden sm:flex items-center gap-1.5 px-2.5 py-2 hover:bg-gray-100 text-gray-900 rounded-md text-sm transition-colors"
                  data-testid="button-login"
                >
                  <img src={logInIcon} alt="" className="w-5 h-5 opacity-90" style={{ filter: 'invert(0%) sepia(0%) saturate(0%) brightness(20%)' }} />
                  <span>Login</span>
                </a>
                <a
                  href="/assessment"
                  className="hidden sm:flex items-center gap-1.5 px-3 py-2 border-2 border-orange-500 text-orange-500 bg-transparent hover:bg-orange-500 hover:text-white rounded-md text-sm font-bold transition-all whitespace-nowrap"
                  data-testid="button-digital-iq"
                >
                  <ClipboardCheck className="w-5 h-5" />
                  <span>Digital IQ</span>
                </a>
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
                  
                  {/* LocalBlue Apps */}
                  <div className="pt-2 mt-2 border-t border-gray-100">
                    <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide px-3 mb-2">Local SEO Mgmt</div>
                    <a href="/listings" className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-red-50 transition-colors" data-testid="link-mobile-listings">
                      <img src={listingsIcon} alt="" className="h-7 w-7 object-contain" />
                      <div className="flex-1">
                        <img src={listingsLogo} alt="/listings" className="h-5 mb-1" />
                        <div className="text-xs text-gray-600">Directory Sync & Consistency</div>
                      </div>
                    </a>
                    <a href="/reputation" className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-yellow-50 transition-colors" data-testid="link-mobile-reputation">
                      <img src={reputationIcon} alt="" className="h-7 w-7 object-contain" />
                      <div className="flex-1">
                        <img src={reputationLogo} alt="/reputation" className="h-5 mb-1" />
                        <div className="text-xs text-gray-600">Review Response & Reputation Mgmt</div>
                      </div>
                    </a>
                  </div>
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
                      <div className="text-sm font-semibold text-gray-900">BusinessBlueprint</div>
                      <div className="text-xs text-gray-600">Digital intelligence</div>
                    </div>
                  </a>
                  <a href="https://hostsblue.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-purple-50 transition-colors" data-testid="link-mobile-hostsblue">
                    <img src={hostsBlueIcon} alt="" className="h-7 w-7 object-contain" />
                    <div className="flex-1">
                      <img src={hostsBlueWordmark} alt="HostsBlue" className="h-5 mb-1" />
                      <div className="text-xs text-gray-600">Hosting & domains</div>
                    </div>
                  </a>
                  <a href="https://swipesblue.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-red-50 transition-colors" data-testid="link-mobile-swipesblue">
                    <img src={swipesBlueIcon} alt="" className="h-7 w-7 object-contain" />
                    <div className="flex-1">
                      <img src={swipesBlueWordmark} alt="SwipesBlue" className="h-5 mb-1" />
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
                      <div className="text-xs text-gray-600">DIY platform options</div>
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
                    <span className="font-semibold">Free Digital IQ Assessment</span>
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