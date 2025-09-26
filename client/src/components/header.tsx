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
  Bell,
  Menu,
  X,
  BarChart3,
  Users,
  CreditCard,
  BookOpen,
  Zap,
  Package,
  Settings2,
  Route,
  Target,
  TrendingUp,
  Building
} from "lucide-react";
import cloudpleaserLogo from "@assets/cloudpleaser_1758744493180.png";
import aiCoachLogo from "@assets/AI Coach_1758744493179.png";
import digitalJourneyIcon from "@assets/digital journey_1758878816963.png";

interface HeaderProps {
  showNavigation?: boolean;
}

export function Header({ showNavigation = true }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Mobile navigation items
  const mobileNavigationItems = [
    { name: "Products", icon: Package, href: "/assessment" },
    { name: "Solutions", icon: Zap, href: "/subscription" },
    { name: "Software", icon: Settings2, href: "/ai-coach" },
    { name: "Pricing", icon: CreditCard, href: "/subscription" },
    { name: "Resources", icon: BookOpen, href: "/sitemap" },
    { name: "Your Journey", icon: Route, href: "/journey" },
  ];

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <a href="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
              <img src={cloudpleaserLogo} alt="cloudpleaser.io" className="w-8 h-8" />
              <div className="flex items-baseline">
                <span className="text-xl font-bold text-black">cloud</span>
                <span className="text-xl font-bold text-blue-600">pleaser</span>
                <span className="text-lg font-medium text-green-400">.io</span>
              </div>
            </a>
            
            {showNavigation && (
              <>
                {/* Desktop Mega Menu */}
                <NavigationMenu className="hidden md:flex ml-8">
                  <NavigationMenuList>
                    {/* Products */}
                    <NavigationMenuItem>
                      <NavigationMenuTrigger className="flex items-center space-x-2">
                        <Package className="w-4 h-4" />
                        <span>Products</span>
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <div className="grid gap-3 p-6 w-[400px] lg:w-[500px] lg:grid-cols-2">
                          <NavigationMenuLink asChild>
                            <a
                              className="group grid h-auto w-full items-center justify-start gap-1 rounded-md bg-background p-4 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
                              href="/assessment"
                            >
                              <div className="text-sm font-medium leading-none group-hover:underline">
                                Digital Assessment
                              </div>
                              <div className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                AI-powered analysis of your online presence
                              </div>
                            </a>
                          </NavigationMenuLink>
                          <NavigationMenuLink asChild>
                            <a
                              className="group grid h-auto w-full items-center justify-start gap-1 rounded-md bg-background p-4 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
                              href="/ai-coach"
                            >
                              <div className="text-sm font-medium leading-none group-hover:underline">
                                AI Business Coach
                              </div>
                              <div className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                24/7 AI guidance and optimization
                              </div>
                            </a>
                          </NavigationMenuLink>
                          <NavigationMenuLink asChild>
                            <a
                              className="group grid h-auto w-full items-center justify-start gap-1 rounded-md bg-background p-4 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
                              href="/portal"
                            >
                              <div className="text-sm font-medium leading-none group-hover:underline">
                                Client Portal
                              </div>
                              <div className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                Manage your digital growth journey
                              </div>
                            </a>
                          </NavigationMenuLink>
                          <NavigationMenuLink asChild>
                            <a
                              className="group grid h-auto w-full items-center justify-start gap-1 rounded-md bg-background p-4 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
                              href="/subscription"
                            >
                              <div className="text-sm font-medium leading-none group-hover:underline">
                                Managed Services
                              </div>
                              <div className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                Full-service digital marketing
                              </div>
                            </a>
                          </NavigationMenuLink>
                        </div>
                      </NavigationMenuContent>
                    </NavigationMenuItem>

                    {/* Solutions */}
                    <NavigationMenuItem>
                      <NavigationMenuTrigger className="flex items-center space-x-2">
                        <Zap className="w-4 h-4" />
                        <span>Solutions</span>
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <div className="grid gap-3 p-6 w-[400px] lg:w-[600px] lg:grid-cols-3">
                          <div className="space-y-3">
                            <h4 className="text-sm font-medium leading-none">By Business Type</h4>
                            <NavigationMenuLink asChild>
                              <a
                                className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                                href="/subscription"
                              >
                                <div className="text-sm font-medium leading-none">Local Services</div>
                                <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                  Restaurants, salons, contractors
                                </p>
                              </a>
                            </NavigationMenuLink>
                            <NavigationMenuLink asChild>
                              <a
                                className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                                href="/subscription"
                              >
                                <div className="text-sm font-medium leading-none">Professional Services</div>
                                <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                  Lawyers, accountants, consultants
                                </p>
                              </a>
                            </NavigationMenuLink>
                          </div>
                          <div className="space-y-3">
                            <h4 className="text-sm font-medium leading-none">By Approach</h4>
                            <NavigationMenuLink asChild>
                              <a
                                className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                                href="/subscription"
                              >
                                <div className="text-sm font-medium leading-none">DIY Tools</div>
                                <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                  Self-service with AI guidance
                                </p>
                              </a>
                            </NavigationMenuLink>
                            <NavigationMenuLink asChild>
                              <a
                                className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                                href="/subscription"
                              >
                                <div className="text-sm font-medium leading-none">Full Management</div>
                                <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                  Expert team handles everything
                                </p>
                              </a>
                            </NavigationMenuLink>
                          </div>
                          <div className="space-y-3">
                            <h4 className="text-sm font-medium leading-none">Success Stories</h4>
                            <NavigationMenuLink asChild>
                              <a
                                className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                                href="/about"
                              >
                                <div className="text-sm font-medium leading-none">Case Studies</div>
                                <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                  Real results from real businesses
                                </p>
                              </a>
                            </NavigationMenuLink>
                          </div>
                        </div>
                      </NavigationMenuContent>
                    </NavigationMenuItem>

                    {/* Software */}
                    <NavigationMenuItem>
                      <NavigationMenuTrigger className="flex items-center space-x-2">
                        <Settings2 className="w-4 h-4" />
                        <span>Software</span>
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <div className="grid gap-3 p-6 w-[400px] lg:w-[500px] lg:grid-cols-2">
                          <NavigationMenuLink asChild>
                            <a
                              className="group grid h-auto w-full items-center justify-start gap-1 rounded-md bg-background p-4 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
                              href="/ai-coach"
                            >
                              <div className="text-sm font-medium leading-none group-hover:underline">
                                AI Coach Platform
                              </div>
                              <div className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                Intelligent business guidance system
                              </div>
                            </a>
                          </NavigationMenuLink>
                          <NavigationMenuLink asChild>
                            <a
                              className="group grid h-auto w-full items-center justify-start gap-1 rounded-md bg-background p-4 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
                              href="/portal"
                            >
                              <div className="text-sm font-medium leading-none group-hover:underline">
                                Dashboard Suite
                              </div>
                              <div className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                Analytics and campaign management
                              </div>
                            </a>
                          </NavigationMenuLink>
                        </div>
                      </NavigationMenuContent>
                    </NavigationMenuItem>

                    {/* Pricing */}
                    <NavigationMenuItem>
                      <NavigationMenuLink
                        className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
                        href="/subscription"
                      >
                        <CreditCard className="w-4 h-4 mr-2" />
                        Pricing
                      </NavigationMenuLink>
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
                              className="group grid h-auto w-full items-center justify-start gap-1 rounded-md bg-background p-4 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
                              href="/sitemap"
                            >
                              <div className="text-sm font-medium leading-none group-hover:underline">
                                Site Map
                              </div>
                              <div className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                Complete navigation guide
                              </div>
                            </a>
                          </NavigationMenuLink>
                          <NavigationMenuLink asChild>
                            <a
                              className="group grid h-auto w-full items-center justify-start gap-1 rounded-md bg-background p-4 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
                              href="/contact"
                            >
                              <div className="text-sm font-medium leading-none group-hover:underline">
                                Support Center
                              </div>
                              <div className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                Get help and guidance
                              </div>
                            </a>
                          </NavigationMenuLink>
                        </div>
                      </NavigationMenuContent>
                    </NavigationMenuItem>

                    {/* Your Journey */}
                    <NavigationMenuItem>
                      <NavigationMenuLink
                        className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
                        href="/journey"
                      >
                        <img src={digitalJourneyIcon} alt="Your Journey" className="w-4 h-4 mr-2" />
                        Your Journey
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  </NavigationMenuList>
                </NavigationMenu>

                {/* Mobile menu button */}
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="md:hidden ml-4 p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
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

          {/* Right side */}
          <div className="flex items-center space-x-4">
            {showNavigation && (
              <>
                {/* Notifications */}
                <Button variant="ghost" size="sm" className="relative">
                  <Bell className="w-5 h-5" />
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full text-xs"></span>
                </Button>

                {/* User Menu */}
                <Button variant="ghost" size="sm" className="flex items-center space-x-2">
                  <User className="w-5 h-5" />
                  <span className="hidden sm:inline">Account</span>
                </Button>
              </>
            )}
            
            {!showNavigation && (
              <div className="flex items-center space-x-3">
                <Button variant="ghost" size="sm">
                  Sign In
                </Button>
                <Button size="sm">
                  Get Started
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {showNavigation && isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 bg-white">
            <nav className="py-2">
              {mobileNavigationItems.map((item) => {
                const IconComponent = item.icon;
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    className="flex items-center space-x-3 px-4 py-3 text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.name === "Your Journey" ? (
                      <img src={digitalJourneyIcon} alt="Your Journey" className="w-5 h-5" />
                    ) : (
                      <IconComponent className="w-5 h-5" />
                    )}
                    <span>{item.name}</span>
                  </a>
                );
              })}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}