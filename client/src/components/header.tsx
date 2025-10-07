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
import webhostedLogo from "@assets/webhostedio icon light version_1759341946145.png";
import airswipedLogo from "@assets/airswipedcom icon light version_1759341905088.png";

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
            <a href="/" className="hover:opacity-80 transition-opacity">
              <BrandLogo brand="businessblueprint" variant="light" size="sm" />
            </a>
            
            {showNavigation && (
              <>
                {/* Desktop Mega Menu */}
                <NavigationMenu className="hidden lg:flex ml-8">
                  <NavigationMenuList>
                    {/* Apps - Cross-Platform Ecosystem */}
                    <NavigationMenuItem>
                      <NavigationMenuTrigger className="flex items-center space-x-2">
                        <Layers className="w-4 h-4" />
                        <span>Apps</span>
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <div className="grid gap-4 p-6 w-[600px] lg:w-[700px]">
                          <div className="grid grid-cols-2 gap-4">
                            {/* businessblueprint.io */}
                            <NavigationMenuLink asChild>
                              <a
                                className="group block select-none space-y-2 rounded-lg border border-gray-200 bg-white p-4 leading-none no-underline outline-none transition-all hover:border-blue-500 hover:shadow-md"
                                href="/"
                              >
                                <div className="flex items-center space-x-2 mb-2">
                                  <BrandLogo brand="businessblueprint" variant="light" size="sm" />
                                </div>
                                <div className="text-sm font-medium">Digital Intelligence Platform</div>
                                <p className="text-xs leading-relaxed text-muted-foreground">
                                  AI-powered assessment, business coaching, and growth strategies
                                </p>
                                <ul className="mt-2 space-y-1 text-xs text-muted-foreground">
                                  <li>✓ Digital IQ Assessment</li>
                                  <li>✓ AI Business Coach</li>
                                  <li>✓ Client Portal & Dashboard</li>
                                </ul>
                              </a>
                            </NavigationMenuLink>

                            {/* webhosted.io */}
                            <NavigationMenuLink asChild>
                              <a
                                className="group block select-none space-y-2 rounded-lg border border-gray-200 bg-white p-4 leading-none no-underline outline-none transition-all hover:border-purple-500 hover:shadow-md"
                                href="#webhosted"
                              >
                                <div className="flex items-center space-x-2 mb-2">
                                  <img src={webhostedLogo} alt="webhosted.io" className="h-5" />
                                  <span className="text-sm font-semibold">webhosted.io</span>
                                </div>
                                <div className="text-sm font-medium">Website Hosting & Builder</div>
                                <p className="text-xs leading-relaxed text-muted-foreground">
                                  WordPress hosting, site builder, and expert services
                                </p>
                                <ul className="mt-2 space-y-1 text-xs text-muted-foreground">
                                  <li>✓ Managed WordPress Hosting</li>
                                  <li>✓ Premium Plugin Suite</li>
                                  <li>✓ 24/7 Expert Support</li>
                                </ul>
                              </a>
                            </NavigationMenuLink>

                            {/* airswiped.com */}
                            <NavigationMenuLink asChild>
                              <a
                                className="group block select-none space-y-2 rounded-lg border border-gray-200 bg-white p-4 leading-none no-underline outline-none transition-all hover:border-red-500 hover:shadow-md"
                                href="#airswiped"
                              >
                                <div className="flex items-center space-x-2 mb-2">
                                  <img src={airswipedLogo} alt="airswiped.com" className="h-5" />
                                  <span className="text-sm font-semibold">airswiped.com</span>
                                </div>
                                <div className="text-sm font-medium">Payment Gateway</div>
                                <p className="text-xs leading-relaxed text-muted-foreground">
                                  Accept payments online with enterprise-grade security
                                </p>
                                <ul className="mt-2 space-y-1 text-xs text-muted-foreground">
                                  <li>✓ Credit Card Processing</li>
                                  <li>✓ Subscription Billing</li>
                                  <li>✓ Fraud Protection</li>
                                </ul>
                              </a>
                            </NavigationMenuLink>

                            {/* /send */}
                            <NavigationMenuLink asChild>
                              <a
                                className="group block select-none space-y-2 rounded-lg border border-gray-200 bg-white p-4 leading-none no-underline outline-none transition-all hover:border-green-500 hover:shadow-md"
                                href="#send"
                              >
                                <div className="flex items-center space-x-2 mb-2">
                                  <Mail className="w-6 h-6 text-green-600" />
                                  <span className="text-sm font-semibold">/send</span>
                                </div>
                                <div className="text-sm font-medium">Email + SMS Marketing</div>
                                <p className="text-xs leading-relaxed text-muted-foreground">
                                  Unified marketing campaigns with full compliance
                                </p>
                                <ul className="mt-2 space-y-1 text-xs text-muted-foreground">
                                  <li>✓ Email & SMS Campaigns</li>
                                  <li>✓ Contact Management</li>
                                  <li>✓ GDPR/CAN-SPAM Compliant</li>
                                </ul>
                              </a>
                            </NavigationMenuLink>
                          </div>
                        </div>
                      </NavigationMenuContent>
                    </NavigationMenuItem>

                    {/* Pathways - How to Work With Us */}
                    <NavigationMenuItem>
                      <NavigationMenuTrigger className="flex items-center space-x-2">
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
                              >
                                <div className="text-lg font-semibold text-blue-600">$99/mo</div>
                                <div className="text-sm font-medium">Do It Yourself (DIY)</div>
                                <p className="text-xs leading-relaxed text-muted-foreground">
                                  Self-service tools with AI guidance
                                </p>
                                <div className="mt-3 pt-3 border-t border-gray-200">
                                  <div className="text-xs font-medium text-gray-700 mb-2">Add-ons Available:</div>
                                  <div className="space-y-1 text-xs text-muted-foreground">
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
                              >
                                <div className="text-lg font-semibold text-orange-600">$299/mo</div>
                                <div className="text-sm font-medium">Managed Services (MSP)</div>
                                <p className="text-xs leading-relaxed text-muted-foreground">
                                  Expert team handles everything
                                </p>
                                <div className="mt-3 pt-3 border-t border-gray-200">
                                  <div className="text-xs font-medium text-gray-700 mb-2">Add-ons Available:</div>
                                  <div className="space-y-1 text-xs text-muted-foreground">
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
                            >
                              Compare Pathways →
                            </a>
                          </NavigationMenuLink>
                        </div>
                      </NavigationMenuContent>
                    </NavigationMenuItem>

                    {/* Pricing */}
                    <NavigationMenuItem>
                      <NavigationMenuTrigger className="flex items-center space-x-2">
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
                                DIY and Managed Services pricing
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
