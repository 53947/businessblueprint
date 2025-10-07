import { useState } from "react";
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
  Wallet
} from "lucide-react";
import { BrandLogo } from "@/components/brand-logo";
import bbLogo from "@assets/Business Blueprint Logo and-or Icon All Versions_1759854008066.png";
import bbIcon from "@assets/businessblueprintio icon all version_1759854019511.png";
import webhostedLogo from "@assets/Web Hosted all Version Logo_1759857389704.png";
import webhostedIcon from "@assets/webhostedio icon all versions_1759857279422.png";
import airswipedLogo from "@assets/airswipedcom icon light version_1759341905088.png";
import sendLogo from "@assets/send logo_1759873220203.png";
import sendIcon from "@assets/send icon_1759873220203.png";

interface HeaderProps {
  showNavigation?: boolean;
}

export function Header({ showNavigation = true }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <a href="/" className="hover:opacity-80 transition-opacity flex items-center gap-3">
              <img src={bbIcon} alt="businessblueprint.io" className="h-10 w-10 object-contain" />
              <img src={bbLogo} alt="businessblueprint.io" className="h-8 object-contain" />
            </a>
            
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
                                  <div className="flex items-center gap-2">
                                    <img src={bbIcon} alt="businessblueprint.io" className="h-10 w-10 object-contain" />
                                    <img src={bbLogo} alt="businessblueprint.io" className="h-8 object-contain" />
                                  </div>
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
                                    <div className="font-archivo font-bold text-lg leading-none">
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
                                href="#send"
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
                                <div className="text-sm font-bold text-gray-900 dark:text-white" data-testid="text-app-send-title">Email + SMS Marketing</div>
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
                                <div className="text-lg font-semibold text-blue-600" data-testid="text-pathway-diy-price">$99/mo</div>
                                <div className="text-sm font-medium" data-testid="text-pathway-diy-title">Do It Yourself (DIY)</div>
                                <p className="text-xs leading-relaxed text-muted-foreground" data-testid="text-pathway-diy-description">
                                  Self-service tools with AI guidance
                                </p>
                                <div className="mt-3 pt-3 border-t border-gray-200">
                                  <div className="text-xs font-medium text-gray-700 mb-2">Add-ons Available:</div>
                                  <div className="space-y-1 text-xs text-muted-foreground" data-testid="list-pathway-diy-addons">
                                    <div>+ AI Business Coach ($99/mo)</div>
                                    <div>+ Captain Your Journey ($249/mo)</div>
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
                                <div className="text-lg font-semibold text-orange-600" data-testid="text-pathway-msp-price">$299/mo</div>
                                <div className="text-sm font-medium" data-testid="text-pathway-msp-title">Managed Services Provided (MSP)</div>
                                <p className="text-xs leading-relaxed text-muted-foreground" data-testid="text-pathway-msp-description">
                                  Expert team handles everything
                                </p>
                                <div className="mt-3 pt-3 border-t border-gray-200">
                                  <div className="text-xs font-medium text-gray-700 mb-2">Add-ons Available:</div>
                                  <div className="space-y-1 text-xs text-muted-foreground" data-testid="list-pathway-msp-addons">
                                    <div>+ AI Business Coach ($59/mo)</div>
                                    <div>+ Captain Your Journey ($249/mo)</div>
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
                              href="/subscription"
                            >
                              <div className="text-sm font-medium leading-none">Platform Subscriptions</div>
                              <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                Do It Yourself (DIY) and Managed Services Provided (MSP) pricing
                              </p>
                            </a>
                          </NavigationMenuLink>
                          <NavigationMenuLink asChild>
                            <a
                              className="group block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground"
                              href="/subscription#addons"
                            >
                              <div className="text-sm font-medium leading-none">Add-on Services</div>
                              <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                AI Coach and Captain Your Journey
                              </p>
                            </a>
                          </NavigationMenuLink>
                          <NavigationMenuLink asChild>
                            <a
                              className="group block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground"
                              href="/subscription#alacarte"
                            >
                              <div className="text-sm font-medium leading-none">À La Carte Options</div>
                              <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                Individual apps and services
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

          {/* Right side - Login/Signup Buttons */}
          <div className="flex items-center space-x-3">
            {showNavigation && (
              <>
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

        {/* Mobile Menu */}
        {isMobileMenuOpen && showNavigation && (
          <div className="lg:hidden border-t border-gray-200 py-4">
            <nav className="space-y-1">
              <a href="/" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">
                Apps
              </a>
              <a href="/subscription" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">
                Pathways
              </a>
              <a href="/subscription" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">
                Pricing
              </a>
              <a href="/journey" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">
                Resources
              </a>
              <div className="flex space-x-2 px-3 pt-4 border-t border-gray-200 mt-4">
                <Button variant="outline" size="sm" className="flex-1" asChild>
                  <a href="/portal">Login</a>
                </Button>
                <Button size="sm" className="flex-1 bg-blue-600 hover:bg-blue-700" asChild>
                  <a href="/assessment">Sign Up</a>
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
