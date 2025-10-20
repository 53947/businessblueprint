import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
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
  Inbox
} from "lucide-react";
import { BrandLogo } from "@/components/brand-logo";
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

interface HeaderProps {
  showNavigation?: boolean;
}

export function Header({ showNavigation = true }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check if user is logged in - re-check on every render
  useEffect(() => {
    const checkLoginStatus = () => {
      const clientId = sessionStorage.getItem("clientId");
      setIsLoggedIn(!!clientId);
    };
    
    checkLoginStatus();
    
    // Also check periodically in case session changes
    const interval = setInterval(checkLoginStatus, 1000);
    return () => clearInterval(interval);
  });

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
                    {/* Apps - Cross-Platform Ecosystem */}
                    <NavigationMenuItem>
                      <NavigationMenuTrigger className="flex items-center space-x-2" data-testid="menu-trigger-apps">
                        <Layers className="w-4 h-4" />
                        <span>Apps</span>
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <div className="grid gap-4 p-6 w-[600px] lg:w-[700px]">
                          <div className="grid grid-cols-2 gap-4">
                            {/* businessblueprint.io */}
                            <NavigationMenuLink asChild>
                              <a
                                className="group block select-none space-y-2 rounded-lg border border-gray-200 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 dark:border-gray-700 p-4 leading-none no-underline outline-none transition-all hover:border-blue-500 hover:shadow-xl hover:from-blue-50 hover:to-blue-100 dark:hover:from-blue-950 dark:hover:to-blue-900 hover:scale-[1.02]"
                                href="/"
                                data-testid="link-app-businessblueprint"
                              >
                                <div className="flex items-center justify-between mb-3">
                                  <BrandLogo brand="businessblueprint" size="sm" showIcon={true} />
                                  <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                                    <span className="text-xs font-semibold text-blue-600 dark:text-blue-400">Visit Platform →</span>
                                  </div>
                                </div>
                                <div className="text-sm font-bold text-gray-900 dark:text-white" data-testid="text-app-businessblueprint-title">Digital Intelligence Platform</div>
                                <p className="text-xs leading-relaxed text-gray-600 dark:text-gray-400" data-testid="text-app-businessblueprint-description">
                                  AI-powered assessment, business coaching, and growth strategies
                                </p>
                                <ul className="mt-3 space-y-1.5 text-xs text-gray-700 dark:text-gray-300" data-testid="list-app-businessblueprint-features">
                                  <li className="flex items-center"><span className="text-blue-500 dark:text-blue-400 mr-1.5">✓</span> Digital IQ Assessment</li>
                                  <li className="flex items-center"><span className="text-blue-500 dark:text-blue-400 mr-1.5">✓</span> AI Business Coach</li>
                                  <li className="flex items-center"><span className="text-blue-500 dark:text-blue-400 mr-1.5">✓</span> Client Portal & Dashboard</li>
                                </ul>
                              </a>
                            </NavigationMenuLink>

                            {/* webhosted.io */}
                            <NavigationMenuLink asChild>
                              <a
                                className="group block select-none space-y-2 rounded-lg border border-gray-200 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 dark:border-gray-700 p-4 leading-none no-underline outline-none transition-all hover:border-purple-500 hover:shadow-xl hover:from-purple-50 hover:to-purple-100 dark:hover:from-purple-950 dark:hover:to-purple-900 hover:scale-[1.02]"
                                href="#webhosted"
                                data-testid="link-app-webhosted"
                              >
                                <div className="flex items-center justify-between mb-3">
                                  <div className="flex items-center gap-3">
                                    <img src={webhostedIcon} alt="webhosted.io" className="h-10 w-10 object-contain" />
                                    <img src={webhostedLogo} alt="webhosted.io" className="h-7 object-contain" />
                                  </div>
                                  <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                                    <span className="text-xs font-semibold text-purple-600 dark:text-purple-400">Visit Platform →</span>
                                  </div>
                                </div>
                                <div className="text-sm font-bold text-gray-900 dark:text-white" data-testid="text-app-webhosted-title">Website Hosting & Builder</div>
                                <p className="text-xs leading-relaxed text-gray-600 dark:text-gray-400" data-testid="text-app-webhosted-description">
                                  WordPress hosting, site builder, and expert services
                                </p>
                                <ul className="mt-3 space-y-1.5 text-xs text-gray-700 dark:text-gray-300" data-testid="list-app-webhosted-features">
                                  <li className="flex items-center"><span className="text-purple-500 dark:text-purple-400 mr-1.5">✓</span> Managed WordPress Hosting</li>
                                  <li className="flex items-center"><span className="text-purple-500 dark:text-purple-400 mr-1.5">✓</span> Premium Plugin Suite</li>
                                  <li className="flex items-center"><span className="text-purple-500 dark:text-purple-400 mr-1.5">✓</span> 24/7 Expert Support</li>
                                </ul>
                              </a>
                            </NavigationMenuLink>

                            {/* airswiped.com */}
                            <NavigationMenuLink asChild>
                              <a
                                className="group block select-none space-y-2 rounded-lg border border-gray-200 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 dark:border-gray-700 p-4 leading-none no-underline outline-none transition-all hover:border-red-500 hover:shadow-xl hover:from-red-50 hover:to-red-100 dark:hover:from-red-950 dark:hover:to-red-900 hover:scale-[1.02]"
                                href="#airswiped"
                                data-testid="link-app-airswiped"
                              >
                                <div className="flex items-center justify-between mb-3">
                                  <div className="flex items-center gap-3">
                                    <img src={airswipedLogo} alt="airswiped.com" className="h-10 w-10 object-contain" />
                                    <div className="font-archivo font-bold text-base leading-none">
                                      <span className="text-[#09080E] dark:text-white">air</span>
                                      <span className="text-[#FF0040]">swiped</span>
                                      <span className="text-[#84D71A]">.com</span>
                                    </div>
                                  </div>
                                  <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                                    <span className="text-xs font-semibold text-red-600 dark:text-red-400">Visit Platform →</span>
                                  </div>
                                </div>
                                <div className="text-sm font-bold text-gray-900 dark:text-white" data-testid="text-app-airswiped-title">Payment Gateway</div>
                                <p className="text-xs leading-relaxed text-gray-600 dark:text-gray-400" data-testid="text-app-airswiped-description">
                                  Accept payments online with enterprise-grade security
                                </p>
                                <ul className="mt-3 space-y-1.5 text-xs text-gray-700 dark:text-gray-300" data-testid="list-app-airswiped-features">
                                  <li className="flex items-center"><span className="text-red-500 dark:text-red-400 mr-1.5">✓</span> Credit Card Processing</li>
                                  <li className="flex items-center"><span className="text-red-500 dark:text-red-400 mr-1.5">✓</span> Subscription Billing</li>
                                  <li className="flex items-center"><span className="text-red-500 dark:text-red-400 mr-1.5">✓</span> Fraud Protection</li>
                                </ul>
                              </a>
                            </NavigationMenuLink>

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
                          </div>
                        </div>
                      </NavigationMenuContent>
                    </NavigationMenuItem>

                    {/* Pathways - How to Work With Us */}
                    <NavigationMenuItem>
                      <NavigationMenuTrigger className="flex items-center space-x-2" data-testid="menu-trigger-pathways">
                        <Compass className="w-4 h-4" />
                        <span>Pathways</span>
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <div className="grid gap-4 p-6 w-[500px] lg:w-[600px]">
                          <div className="grid grid-cols-2 gap-4">
                            {/* DIY Pathway */}
                            <NavigationMenuLink asChild>
                              <a
                                className="group block select-none space-y-2 rounded-lg border border-gray-200 bg-white p-4 leading-none no-underline outline-none transition-all hover:border-blue-500 hover:shadow-md"
                                href="/subscription?pathway=diy"
                                data-testid="link-pathway-diy"
                              >
                                <div className="text-lg font-semibold text-blue-600" data-testid="text-pathway-diy-price">From $250/mo</div>
                                <div className="text-sm font-medium" data-testid="text-pathway-diy-title">Do It Yourself (DIY)</div>
                                <p className="text-xs leading-relaxed text-muted-foreground" data-testid="text-pathway-diy-description">
                                  Self-service platform access with full automation suite. Includes all proprietary apps: /send, /inbox, /livechat, plus digital presence management.
                                </p>
                                <div className="mt-3 pt-3 border-t border-gray-200">
                                  <div className="text-xs font-medium text-gray-700 mb-2">Starting Tiers:</div>
                                  <div className="space-y-1 text-xs text-muted-foreground" data-testid="list-pathway-diy-addons">
                                    <div>• STARTER ($250/mo)</div>
                                    <div>• GROWTH ($316/mo)</div>
                                  </div>
                                </div>
                              </a>
                            </NavigationMenuLink>

                            {/* MSP Pathway */}
                            <NavigationMenuLink asChild>
                              <a
                                className="group block select-none space-y-2 rounded-lg border border-gray-200 bg-white p-4 leading-none no-underline outline-none transition-all hover:border-orange-500 hover:shadow-md"
                                href="/subscription?pathway=msp"
                                data-testid="link-pathway-msp"
                              >
                                <div className="text-lg font-semibold text-orange-600" data-testid="text-pathway-msp-price">From $399/mo</div>
                                <div className="text-sm font-medium" data-testid="text-pathway-msp-title">Managed Services Provided (MSP)</div>
                                <p className="text-xs leading-relaxed text-muted-foreground" data-testid="text-pathway-msp-description">
                                  Full platform access plus dedicated expert support team. We handle the execution while you focus on running your business.
                                </p>
                                <div className="mt-3 pt-3 border-t border-gray-200">
                                  <div className="text-xs font-medium text-gray-700 mb-2">Starting Tiers:</div>
                                  <div className="space-y-1 text-xs text-muted-foreground" data-testid="list-pathway-msp-addons">
                                    <div>• EXPANSION Essential ($399/mo)</div>
                                    <div>• EXPANSION Pro ($649/mo)</div>
                                    <div>• LEADERSHIP Essential ($999/mo)</div>
                                    <div>• LEADERSHIP Pro ($1,249/mo)</div>
                                  </div>
                                </div>
                              </a>
                            </NavigationMenuLink>
                          </div>
                          <NavigationMenuLink asChild>
                            <a
                              className="block text-center text-sm text-blue-600 hover:text-blue-800 hover:underline"
                              href="/subscription"
                              data-testid="link-compare-pathways"
                            >
                              Compare Pathways →
                            </a>
                          </NavigationMenuLink>
                        </div>
                      </NavigationMenuContent>
                    </NavigationMenuItem>

                    {/* Commverse - Communication Apps */}
                    <NavigationMenuItem>
                      <NavigationMenuTrigger className="flex items-center space-x-2" data-testid="menu-trigger-commverse">
                        <MessageSquare className="w-4 h-4" />
                        <span>Commverse</span>
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <div className="grid gap-4 p-6 w-[500px]">
                          <div className="mb-2">
                            <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Communication Ecosystem</h3>
                            <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                              Three powerful apps that work autonomously but shine together
                            </p>
                          </div>
                          <div className="grid gap-3">
                            {/* /send */}
                            <NavigationMenuLink asChild>
                              <a
                                className="group flex items-center space-x-3 rounded-lg border border-gray-200 bg-white dark:bg-gray-800 dark:border-gray-700 p-3 leading-none no-underline outline-none transition-all hover:border-[#E6B747] hover:shadow-md hover:bg-gradient-to-r hover:from-[#E6B747]/5 hover:to-transparent"
                                href="/send"
                                data-testid="link-commverse-send"
                              >
                                <img src={sendIcon} alt="/send" className="h-10 w-10 object-contain flex-shrink-0" />
                                <div className="flex-1">
                                  <div className="text-sm font-semibold text-gray-900 dark:text-white">/send</div>
                                  <p className="text-xs text-gray-600 dark:text-gray-400">Email & SMS Marketing Platform</p>
                                </div>
                                <span className="text-xs font-semibold text-[#E6B747] opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                              </a>
                            </NavigationMenuLink>

                            {/* /livechat */}
                            <NavigationMenuLink asChild>
                              <a
                                className="group flex items-center space-x-3 rounded-lg border border-gray-200 bg-white dark:bg-gray-800 dark:border-gray-700 p-3 leading-none no-underline outline-none transition-all hover:border-[#8000FF] hover:shadow-md hover:bg-gradient-to-r hover:from-[#8000FF]/5 hover:to-transparent"
                                href="/livechat"
                                data-testid="link-commverse-livechat"
                              >
                                <img src={livechatIcon} alt="/livechat" className="h-10 w-10 object-contain flex-shrink-0" />
                                <div className="flex-1">
                                  <div className="text-sm font-semibold text-gray-900 dark:text-white">/livechat</div>
                                  <p className="text-xs text-gray-600 dark:text-gray-400">Website Live Chat Widget</p>
                                </div>
                                <span className="text-xs font-semibold text-[#8000FF] opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                              </a>
                            </NavigationMenuLink>

                            {/* /inbox */}
                            <NavigationMenuLink asChild>
                              <a
                                className="group flex items-center space-x-3 rounded-lg border border-gray-200 bg-white dark:bg-gray-800 dark:border-gray-700 p-3 leading-none no-underline outline-none transition-all hover:border-[#0080FF] hover:shadow-md hover:bg-gradient-to-r hover:from-[#0080FF]/5 hover:to-transparent"
                                href="/inbox"
                                data-testid="link-commverse-inbox"
                              >
                                <img src={inboxIcon} alt="/inbox" className="h-10 w-10 object-contain flex-shrink-0" />
                                <div className="flex-1">
                                  <div className="text-sm font-semibold text-gray-900 dark:text-white">/inbox</div>
                                  <p className="text-xs text-gray-600 dark:text-gray-400">Unified Communications Hub</p>
                                </div>
                                <span className="text-xs font-semibold text-[#0080FF] opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                              </a>
                            </NavigationMenuLink>
                          </div>
                          <NavigationMenuLink asChild>
                            <a
                              className="block text-center text-sm text-blue-600 hover:text-blue-800 hover:underline mt-2"
                              href="/commverse"
                              data-testid="link-commverse-about"
                            >
                              About Commverse Ecosystem →
                            </a>
                          </NavigationMenuLink>
                        </div>
                      </NavigationMenuContent>
                    </NavigationMenuItem>

                    {/* Pricing */}
                    <NavigationMenuItem>
                      <NavigationMenuTrigger className="flex items-center space-x-2" data-testid="menu-trigger-pricing">
                        <CreditCard className="w-4 h-4" />
                        <span>Pricing</span>
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <div className="grid gap-3 p-6 w-[400px]">
                          <NavigationMenuLink asChild>
                            <a
                              className="group block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground"
                              href="/pricing"
                              data-testid="link-pricing-tiers"
                            >
                              <div className="text-sm font-medium leading-none">6-Tier Structure</div>
                              <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                STARTER ($250) to LEADERSHIP Pro ($1,249) with Essential/Pro tiers
                              </p>
                            </a>
                          </NavigationMenuLink>
                          <NavigationMenuLink asChild>
                            <a
                              className="group block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground"
                              href="/pricing"
                              data-testid="link-pricing-included"
                            >
                              <div className="text-sm font-medium leading-none">What's Included</div>
                              <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                All tiers include /send, /inbox, /livechat, and digital presence management
                              </p>
                            </a>
                          </NavigationMenuLink>
                          <NavigationMenuLink asChild>
                            <a
                              className="group block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground"
                              href="/marketplace"
                              data-testid="link-marketplace"
                            >
                              <div className="text-sm font-medium leading-none">À La Carte Marketplace</div>
                              <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                Order individual apps and services separately
                              </p>
                            </a>
                          </NavigationMenuLink>
                        </div>
                      </NavigationMenuContent>
                    </NavigationMenuItem>

                    {/* Resources */}
                    <NavigationMenuItem>
                      <NavigationMenuTrigger className="flex items-center space-x-2">
                        <BookOpen className="w-4 h-4" />
                        <span>Resources</span>
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <div className="grid gap-3 p-6 w-[400px]">
                          <NavigationMenuLink asChild>
                            <a
                              className="group block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground"
                              href="/journey"
                            >
                              <div className="text-sm font-medium leading-none">Getting Started Guide</div>
                              <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                Your digital growth journey explained
                              </p>
                            </a>
                          </NavigationMenuLink>
                          <NavigationMenuLink asChild>
                            <a
                              className="group block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground"
                              href="/send-api-docs"
                            >
                              <div className="text-sm font-medium leading-none">/send API Documentation</div>
                              <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                Integration guide for developers
                              </p>
                            </a>
                          </NavigationMenuLink>
                          <NavigationMenuLink asChild>
                            <a
                              className="group block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground"
                              href="/contact"
                            >
                              <div className="text-sm font-medium leading-none">Help Center</div>
                              <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                Get support and answers
                              </p>
                            </a>
                          </NavigationMenuLink>
                          <NavigationMenuLink asChild>
                            <a
                              className="group block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground"
                              href="/about"
                            >
                              <div className="text-sm font-medium leading-none">Success Stories</div>
                              <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                Real results from real businesses
                              </p>
                            </a>
                          </NavigationMenuLink>
                          <NavigationMenuLink asChild>
                            <a
                              className="group block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground"
                              href="/sitemap"
                            >
                              <div className="text-sm font-medium leading-none">Site Map</div>
                              <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                Complete navigation guide
                              </p>
                            </a>
                          </NavigationMenuLink>
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
                  
                  {/* webhosted.io */}
                  <a href="#webhosted" className="block p-3 bg-white rounded-lg border-l-4 border-purple-500 shadow-sm hover:shadow-md transition-shadow" data-testid="link-mobile-webhosted">
                    <div className="flex items-center gap-3">
                      <img src={webhostedIcon} alt="" className="h-10 w-10 object-contain" />
                      <div className="flex-1">
                        <div className="font-semibold text-gray-900">webhosted.io</div>
                        <div className="text-xs text-gray-600">Website Hosting & Builder</div>
                      </div>
                    </div>
                  </a>
                  
                  {/* airswiped.com */}
                  <a href="#airswiped" className="block p-3 bg-white rounded-lg border-l-4 border-red-500 shadow-sm hover:shadow-md transition-shadow" data-testid="link-mobile-airswiped">
                    <div className="flex items-center gap-3">
                      <img src={airswipedLogo} alt="" className="h-10 w-10 object-contain" />
                      <div className="flex-1">
                        <div className="font-semibold text-gray-900">airswiped.com</div>
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

              {/* Pricing & Plans */}
              <div>
                <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2 text-base">
                  <DollarSign className="w-5 h-5 text-green-600" />
                  <span>Pricing & Plans</span>
                </h3>
                <div className="space-y-2">
                  <a href="/assessment" className="block p-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg shadow-md hover:shadow-lg transition-shadow text-white" data-testid="link-mobile-assessment">
                    <div className="flex items-center gap-3">
                      <TrendingUp className="w-8 h-8" />
                      <div className="flex-1">
                        <div className="font-bold">Free Digital Assessment</div>
                        <div className="text-xs text-blue-100">Get personalized recommendations</div>
                      </div>
                    </div>
                  </a>
                  
                  <a href="/pricing" className="block p-3 bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow" data-testid="link-mobile-pricing">
                    <div className="flex items-center gap-3">
                      <DollarSign className="w-8 h-8 text-green-600" />
                      <div className="flex-1">
                        <div className="font-semibold text-gray-900">6-Tier Pricing Plans</div>
                        <div className="text-xs text-gray-600">From $49/mo - Full ecosystem access</div>
                      </div>
                    </div>
                  </a>
                  
                  <a href="/marketplace" className="block p-3 bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow" data-testid="link-mobile-marketplace">
                    <div className="flex items-center gap-3">
                      <Wallet className="w-8 h-8 text-orange-600" />
                      <div className="flex-1">
                        <div className="font-semibold text-gray-900">À La Carte Marketplace</div>
                        <div className="text-xs text-gray-600">Buy individual apps & services</div>
                      </div>
                    </div>
                  </a>
                  
                  <a href="/commverse-pricing" className="block p-3 bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow" data-testid="link-mobile-commverse-pricing">
                    <div className="flex items-center gap-3">
                      <MessageCircle className="w-8 h-8 text-purple-600" />
                      <div className="flex-1">
                        <div className="font-semibold text-gray-900">Commverse Pricing</div>
                        <div className="text-xs text-gray-600">Communication suite plans</div>
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
