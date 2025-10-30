import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import {
  User,
  Menu,
  X,
  Globe,
  Compass,
  CreditCard,
  BookOpen,
  LogIn,
  UserPlus,
  Layers,
  TrendingUp,
  DollarSign,
  Mail,
  Server,
  Wallet,
  MessageSquare,
  MessageCircle,
  Inbox,
  Lightbulb,
  Wrench,
  GraduationCap,
  Code,
  HelpCircle,
  FileText,
  Video,
  Users,
  ShoppingCart
} from "lucide-react";
import { BrandLogo, BrandIcon } from "@/components/brand-logo";
import bbLogo from "@assets/Business Blueprint Logo and-or Icon All Versions_1759854008066.png";
import bbIcon from "@assets/Blueprint Icon_1760810447789.png";
import commverseIcon from "@assets/Commverse Bundle_1760662442941.png";
import webhostedLogo from "@assets/Web Hosted all Version Logo_1759857389704.png";
import webhostedIcon from "@assets/webhostedio icon all versions_1759857279422.png";
import airswipedLogo from "@assets/swipesblue icon_1760810511865.png";
import sendLogo from "@assets/send logo_1760075605263.png";
import sendIcon from "@assets/send icon_1760074368870.png";
import inboxLogo from "@assets/inbox logo_1760075605262.png";
import inboxIcon from "@assets/Unified mailbox_1760074368869.png";
import livechatLogo from "@assets/livechat logo_1760075605262.png";
import livechatIcon from "@assets/LiveChat Widget_1760074368868.png";
import hostsBlueIcon from "@assets/Hosts Blue Icon New_1760810493739.png";
import swipesBlueIcon from "@assets/swipesblue icon_1760810511865.png";
import blueprintIcon from "@assets/blueprint-icon.svg";

interface HeaderProps {
  showNavigation?: boolean;
}

export function Header({ showNavigation = true }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check if user is logged in
  useEffect(() => {
    const checkLoginStatus = () => {
      const clientId = sessionStorage.getItem("clientId");
      setIsLoggedIn(!!clientId);
    };

    checkLoginStatus();

    // Check periodically in case session changes (every 5 seconds instead of 1 second)
    const interval = setInterval(checkLoginStatus, 5000);
    return () => clearInterval(interval);
  }, []); // Add empty dependency array to run only once on mount

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <Link href="/" className="hover:opacity-80 transition-opacity cursor-pointer" data-testid="header-logo">
              <BrandLogo brand="businessblueprint" size="sm" showIcon={true} />
            </Link>

            {showNavigation && (
              <>
                {/* Desktop Mega Menu */}
                <NavigationMenu className="hidden lg:flex ml-8">
                  <NavigationMenuList>
                    {/* Applications - Commverse Apps Only */}
                    <NavigationMenuItem>
                      <NavigationMenuTrigger className="flex items-center space-x-2" data-testid="menu-trigger-applications">
                        <Layers className="w-4 h-4" />
                        <span>Applications</span>
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <div className="grid gap-4 p-6 w-[600px] lg:w-[700px]">
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
                                    <img src={commverseIcon} alt="/content icon" className="h-10 w-10 object-contain" />
                                    <span className="text-base font-semibold" style={{ color: '#E91E8C' }}>/content</span>
                                  </div>
                                  <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                                    <span className="text-xs font-semibold text-pink-600 dark:text-pink-400">Visit Platform →</span>
                                  </div>
                                </div>
                                <div className="text-base font-bold text-gray-900 dark:text-white" data-testid="text-app-content-title">Social Media Mgmt</div>
                                <p className="text-xs leading-relaxed text-gray-600 dark:text-gray-400" data-testid="text-app-content-description">
                                  Multi-platform posting & scheduling
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

                    {/* Pricing */}
                    <NavigationMenuItem>
                      <NavigationMenuTrigger className="flex items-center space-x-2" data-testid="menu-trigger-pricing">
                        <DollarSign className="w-4 h-4" />
                        <span>Pricing</span>
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <div className="p-6 w-[400px]">
                          <div className="space-y-4">
                            {/* Pathways */}
                            <a href="/pathways" className="group block p-4 rounded-lg border border-gray-200 hover:border-blue-500 hover:bg-blue-50 transition-all">
                              <div className="flex items-center gap-3 mb-2">
                                <Compass className="w-6 h-6 text-blue-600" />
                                <h3 className="text-base font-bold text-gray-900">Pathways</h3>
                              </div>
                              <p className="text-sm text-gray-600">Compare Do It Yourself (DIY) and Managed Services Provided (MSP)</p>
                            </a>

                            {/* Marketplace */}
                            <a href="/marketplace" className="group block p-4 rounded-lg border border-gray-200 hover:border-green-500 hover:bg-green-50 transition-all">
                              <div className="flex items-center gap-3 mb-2">
                                <ShoppingCart className="w-6 h-6 text-green-600" />
                                <h3 className="text-base font-bold text-gray-900">Marketplace</h3>
                              </div>
                              <p className="text-sm text-gray-600">Browse all plans, add-ons, and services with pricing</p>
                            </a>
                          </div>
                        </div>
                      </NavigationMenuContent>
                    </NavigationMenuItem>

                    {/* Solutions */}
                    <NavigationMenuItem>
                      <NavigationMenuTrigger className="flex items-center space-x-2">
                        <BookOpen className="w-4 h-4" />
                        <span>Solutions</span>
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <div className="grid grid-cols-3 gap-4 p-6 w-[700px]">
                          {/* Learning Column */}
                          <div className="space-y-3">
                            <div className="flex items-center gap-2 mb-2">
                              <GraduationCap className="w-4 h-4 text-blue-600" />
                              <h4 className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wide">Learn</h4>
                            </div>
                            <NavigationMenuLink asChild>
                              <a
                                className="group flex items-start space-x-2 rounded-md p-2 leading-none no-underline outline-none transition-colors hover:bg-accent"
                                href="/journey"
                                data-testid="link-resources-journey"
                              >
                                <Compass className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
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
                                <TrendingUp className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
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
                                <Video className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
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
                              <Globe className="w-4 h-4 text-orange-600" />
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
                              <Code className="w-4 h-4 text-purple-600" />
                              <h4 className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wide">Developers</h4>
                            </div>
                            <NavigationMenuLink asChild>
                              <a
                                className="group flex items-start space-x-2 rounded-md p-2 leading-none no-underline outline-none transition-colors hover:bg-accent"
                                href="/send-api-docs"
                                data-testid="link-resources-api"
                              >
                                <FileText className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
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
                                <FileText className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
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
                                <FileText className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
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
                                <Code className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
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
                                <Globe className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
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
                              <HelpCircle className="w-4 h-4 text-green-600" />
                              <h4 className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wide">Support</h4>
                            </div>
                            <NavigationMenuLink asChild>
                              <a
                                className="group flex items-start space-x-2 rounded-md p-2 leading-none no-underline outline-none transition-colors hover:bg-accent"
                                href="/contact"
                                data-testid="link-resources-help"
                              >
                                <Mail className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
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
                                <MessageCircle className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
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
                                <Users className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
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
                    <X className="w-5 h-5" />
                  ) : (
                    <Menu className="w-5 h-5" />
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
                  className="hidden md:flex items-center space-x-2 bg-[#0080FF] border-[#0080FF] hover:bg-[#0057FF]"
                  style={{ color: '#FF96DD' }}
                  asChild
                  data-testid="button-quick-inbox"
                >
                  <a href="/inbox">
                    <img src={commverseIcon} alt="/inbox" className="w-5 h-5" />
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
                  <a href="/portal">
                    <LogIn className="w-4 h-4" />
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
                    <UserPlus className="w-4 h-4" />
                    <span>Sign Up</span>
                  </a>
                </Button>
              </>
            )}
          </div>
        </div>

        {/* Mobile Menu - Enhanced */}
        {isMobileMenuOpen && showNavigation && (
          <div className="lg:hidden border-t border-gray-200 bg-gray-50 max-h-[calc(100vh-4rem)] overflow-y-auto">
            <nav className="space-y-4 p-4">
              {/* Platforms Section */}
              <div>
                <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2 text-base">
                  <Layers className="w-5 h-5 text-blue-600" />
                  <span>Our Platforms</span>
                </h3>
                <div className="space-y-2">
                  {/* Business Blueprint */}
                  <a href="/" className="block p-3 bg-white rounded-lg border-l-4 border-blue-500 shadow-sm hover:shadow-md transition-shadow" data-testid="link-mobile-businessblueprint">
                    <div className="flex items-center gap-3">
                      <img src={bbIcon} alt="" className="h-10 w-10 object-contain" />
                      <div className="flex-1">
                        <div className="font-semibold text-gray-900">Business Blueprint</div>
                        <div className="text-xs text-gray-600">Digital Intelligence Platform</div>
                      </div>
                    </div>
                  </a>

                  {/* hostsblue.com */}
                  <a href="#hostsblue" className="block p-3 bg-white rounded-lg border-l-4 border-purple-500 shadow-sm hover:shadow-md transition-shadow" data-testid="link-mobile-hostsblue">
                    <div className="flex items-center gap-3">
                      <BrandIcon brand="hostsblue" size="sm" variant="light" />
                      <div className="flex-1">
                        <div className="font-semibold text-gray-900">hostsblue.com</div>
                        <div className="text-xs text-gray-600">Website Hosting & Builder</div>
                      </div>
                    </div>
                  </a>

                  {/* swipesblue.com */}
                  <a href="#swipesblue" className="block p-3 bg-white rounded-lg border-l-4 border-red-500 shadow-sm hover:shadow-md transition-shadow" data-testid="link-mobile-swipesblue">
                    <div className="flex items-center gap-3">
                      <BrandIcon brand="swipesblue" size="sm" variant="light" />
                      <div className="flex-1">
                        <div className="font-semibold text-gray-900">swipesblue.com</div>
                        <div className="text-xs text-gray-600">Payment Gateway</div>
                      </div>
                    </div>
                  </a>
                </div>
              </div>

              {/* Commverse Apps */}
              <div>
                <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2 text-base">
                  <MessageSquare className="w-5 h-5 text-purple-600" />
                  <span>Commverse Apps</span>
                </h3>
                <div className="space-y-2">
                  <a href="/send" className="block p-3 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg border border-yellow-200 shadow-sm hover:shadow-md transition-shadow" data-testid="link-mobile-send">
                    <div className="flex items-center gap-3">
                      <img src={sendIcon} alt="" className="h-9 w-9 object-contain" />
                      <div className="flex-1">
                        <div className="font-semibold text-gray-900">/send</div>
                        <div className="text-xs text-gray-600">Email & SMS Marketing</div>
                      </div>
                    </div>
                  </a>

                  <a href="/inbox" className="block p-3 bg-gradient-to-r from-blue-50 to-pink-50 rounded-lg border border-blue-200 shadow-sm hover:shadow-md transition-shadow" data-testid="link-mobile-inbox">
                    <div className="flex items-center gap-3">
                      <img src={inboxIcon} alt="" className="h-9 w-9 object-contain" />
                      <div className="flex-1">
                        <div className="font-semibold text-gray-900">/inbox</div>
                        <div className="text-xs text-gray-600">Unified Communications Hub</div>
                      </div>
                    </div>
                  </a>

                  <a href="/livechat" className="block p-3 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-lg border border-purple-200 shadow-sm hover:shadow-md transition-shadow" data-testid="link-mobile-livechat">
                    <div className="flex items-center gap-3">
                      <img src={livechatIcon} alt="" className="h-9 w-9 object-contain" />
                      <div className="flex-1">
                        <div className="font-semibold text-gray-900">/livechat</div>
                        <div className="text-xs text-gray-600">Live Chat Widget</div>
                      </div>
                    </div>
                  </a>
                </div>
              </div>

              {/* DIY Pricing */}
              <div>
                <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2 text-base">
                  <Lightbulb className="w-5 h-5 text-blue-600" />
                  <span>DIY Base Plans</span>
                </h3>
                <div className="space-y-2">
                  {/* Start Plan */}
                  <a href="/marketplace" className="block p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xl">💡</span>
                        <span className="font-bold text-white">Start</span>
                      </div>
                      <span className="text-white font-bold">$99/mo</span>
                    </div>
                    <p className="text-xs text-white/90 mb-2">Get Found. Build your foundation.</p>
                    <div className="flex flex-wrap gap-1">
                      <Badge className="bg-white/20 text-white text-xs">5 team members</Badge>
                      <Badge className="bg-white/20 text-white text-xs">25 clients</Badge>
                    </div>
                  </a>

                  {/* Advanced Plan */}
                  <a href="/marketplace" className="block p-3 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg shadow-md hover:shadow-lg transition-shadow border-2 border-white">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xl">⚙️</span>
                        <span className="font-bold text-white">Advanced</span>
                        <Badge className="bg-white text-purple-600 text-xs">Popular</Badge>
                      </div>
                      <span className="text-white font-bold">$299/mo</span>
                    </div>
                    <p className="text-xs text-white/90 mb-2">Get Customers. Convert attention.</p>
                    <div className="flex flex-wrap gap-1">
                      <Badge className="bg-white/20 text-white text-xs">10 team members</Badge>
                      <Badge className="bg-white/20 text-white text-xs">100 clients</Badge>
                    </div>
                  </a>

                  {/* Scale Plan */}
                  <a href="/marketplace" className="block p-3 bg-gradient-to-br from-green-500 to-green-600 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xl">🚀</span>
                        <span className="font-bold text-white">Scale</span>
                      </div>
                      <span className="text-white font-bold">$999/mo</span>
                    </div>
                    <p className="text-xs text-white/90 mb-2">Get Business. Unified system.</p>
                    <div className="flex flex-wrap gap-1">
                      <Badge className="bg-white/20 text-white text-xs">50 team members</Badge>
                      <Badge className="bg-white/20 text-white text-xs">500 clients</Badge>
                    </div>
                  </a>
                </div>
              </div>

              {/* Commverse Apps Add-Ons */}
              <div>
                <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2 text-base">
                  <MessageSquare className="w-5 h-5 text-purple-600" />
                  <span>Add Commverse Apps</span>
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  <a href="/marketplace" className="p-2 bg-white rounded-lg border border-yellow-200 hover:border-yellow-400 hover:shadow-md transition-all">
                    <img src={sendIcon} alt="" className="h-8 w-8 mb-1" />
                    <div className="text-xs font-bold text-gray-900">/send</div>
                    <div className="text-lg font-bold text-gray-900">$35<span className="text-xs">/mo</span></div>
                    <div className="text-xs text-green-600">Save in bundle</div>
                  </a>

                  <a href="/marketplace" className="p-2 bg-white rounded-lg border border-blue-200 hover:border-blue-400 hover:shadow-md transition-all">
                    <img src={inboxIcon} alt="" className="h-8 w-8 mb-1" />
                    <div className="text-xs font-bold text-gray-900">/inbox</div>
                    <div className="text-lg font-bold text-gray-900">$35<span className="text-xs">/mo</span></div>
                    <div className="text-xs text-green-600">Save in bundle</div>
                  </a>

                  <a href="/marketplace" className="p-2 bg-white rounded-lg border border-purple-200 hover:border-purple-400 hover:shadow-md transition-all">
                    <img src={livechatIcon} alt="" className="h-8 w-8 mb-1" />
                    <div className="text-xs font-bold text-gray-900">/livechat</div>
                    <div className="text-lg font-bold text-gray-900">$35<span className="text-xs">/mo</span></div>
                    <div className="text-xs text-green-600">Save in bundle</div>
                  </a>

                  <a href="/marketplace" className="p-2 bg-gradient-to-br from-pink-50 to-purple-50 rounded-lg border-2 border-pink-300 hover:border-pink-500 hover:shadow-lg transition-all col-span-2">
                    <img src={commverseIcon} alt="" className="h-8 w-8 mb-1" />
                    <div className="text-xs font-bold text-gray-900">Bundle</div>
                    <div className="text-lg font-bold text-gray-900">$119<span className="text-xs">/mo</span></div>
                    <div className="text-xs text-pink-600 font-semibold">Save $21</div>
                  </a>

                  <a href="/commverse" className="p-2 bg-gradient-to-br from-gray-50 to-blue-50 rounded-lg border border-gray-300 hover:border-blue-400 hover:shadow-md transition-all col-span-2">
                    <MessageSquare className="h-8 w-8 mb-1 text-blue-600" />
                    <div className="text-xs font-bold text-gray-900">Learn About Commverse</div>
                    <div className="text-xs text-gray-600">Complete communication ecosystem</div>
                  </a>
                </div>
              </div>

              {/* Quick Actions */}
              <div>
                <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2 text-base">
                  <Compass className="w-5 h-5 text-orange-600" />
                  <span>Other Options</span>
                </h3>
                <div className="space-y-2">
                  <a href="/pathways" className="block p-3 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg shadow-md hover:shadow-lg transition-shadow text-white">
                    <div className="flex items-center gap-3">
                      <Wrench className="w-6 h-6" />
                      <div className="flex-1">
                        <div className="font-bold">MSP Services</div>
                        <div className="text-xs text-orange-100">We do it for you</div>
                      </div>
                    </div>
                  </a>

                  <a href="/marketplace" className="block p-3 bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-3">
                      <Wallet className="w-6 h-6 text-blue-600" />
                      <div className="flex-1">
                        <div className="font-semibold text-gray-900">View All Pricing</div>
                        <div className="text-xs text-gray-600">Complete marketplace</div>
                      </div>
                    </div>
                  </a>

                  <a href="/assessment" className="block p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg shadow-md hover:shadow-lg transition-shadow text-white">
                    <div className="flex items-center gap-3">
                      <TrendingUp className="w-6 h-6" />
                      <div className="flex-1">
                        <div className="font-bold">Free Assessment</div>
                        <div className="text-xs text-blue-100">Find your perfect path</div>
                      </div>
                    </div>
                  </a>
                </div>
              </div>

              {/* Resources */}
              <div>
                <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2 text-base">
                  <BookOpen className="w-5 h-5 text-indigo-600" />
                  <span>Resources</span>
                </h3>
                <div className="space-y-2">
                  <a href="/journey" className="flex items-center gap-3 p-2 rounded-lg hover:bg-white transition-colors" data-testid="link-mobile-journey">
                    <Compass className="w-5 h-5 text-blue-600" />
                    <span className="text-sm text-gray-700">Getting Started Guide</span>
                  </a>
                  <a href="/send-api-docs" className="flex items-center gap-3 p-2 rounded-lg hover:bg-white transition-colors" data-testid="link-mobile-api-docs">
                    <Server className="w-5 h-5 text-purple-600" />
                    <span className="text-sm text-gray-700">/send API Documentation</span>
                  </a>
                  <a href="/about" className="flex items-center gap-3 p-2 rounded-lg hover:bg-white transition-colors" data-testid="link-mobile-about">
                    <User className="w-5 h-5 text-gray-600" />
                    <span className="text-sm text-gray-700">About Us</span>
                  </a>
                  <a href="/contact" className="flex items-center gap-3 p-2 rounded-lg hover:bg-white transition-colors" data-testid="link-mobile-contact">
                    <Mail className="w-5 h-5 text-green-600" />
                    <span className="text-sm text-gray-700">Contact Support</span>
                  </a>
                  <a href="/sitemap" className="flex items-center gap-3 p-2 rounded-lg hover:bg-white transition-colors" data-testid="link-mobile-sitemap">
                    <Globe className="w-5 h-5 text-gray-600" />
                    <span className="text-sm text-gray-700">Site Map</span>
                  </a>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-2 pt-4 border-t border-gray-300">
                <Button variant="outline" size="lg" className="w-full justify-start gap-3" asChild>
                  <a href="/portal">
                    <LogIn className="w-5 h-5" />
                    <span className="font-semibold">{isLoggedIn ? "Re-enter Portal" : "Client Login"}</span>
                  </a>
                </Button>
                <Button size="lg" className="w-full justify-start gap-3 bg-blue-600 hover:bg-blue-700 text-white" asChild>
                  <a href="/assessment">
                    <UserPlus className="w-5 h-5" />
                    <span className="font-semibold">Start Free Assessment</span>
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