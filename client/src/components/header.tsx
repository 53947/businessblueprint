import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { addToCart, getCartCount, getCartTotal } from "@/lib/cart";
import { ShoppingCart, ClipboardCheck, User, Settings, CreditCard, LogOut, ChevronDown, Menu, X } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Plus, Minus } from "lucide-react";

// Brand
import { BrandLogo } from "@/components/brand-logo";
import { ICON_MAP } from "@/components/app-name";

// Menu config — single source of truth for menu structure
import {
  NAV_ITEMS,
  HOW_IT_WORKS_MENU,
  SOLUTIONS_MENU,
  RESOURCES_MENU,
  APP_REGISTRY,
  BUNDLE_REGISTRY,
  CONNECT_CRM,
  COACH_BLUE,
  DIGITAL_IQ,
  getAppsByBundle,
  blueprintIcon,
  hostsBlueIcon,
  swipesBlueIcon,
  consoleBlueIcon,
  scansBlueIcon,
  settingsIcon,
} from "@/config/menu-config";

// Shared pricing component
import { PricingLayout } from "@/components/pricing-layout";
import { AppName, AppIcon } from "@/components/app-name";
import coachBlueIcon from "@assets/images_logos/coachblue48.png";

interface HeaderProps {
  showNavigation?: boolean;
}

export function Header({ showNavigation = true }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();
  const [hasClientPortalAccess, setHasClientPortalAccess] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  // Check if user has client portal access
  useEffect(() => {
    const checkClientPortal = () => {
      const clientId = sessionStorage.getItem("clientId");
      const authToken = sessionStorage.getItem("authToken");
      if (clientId && authToken) {
        setHasClientPortalAccess(true);
      } else {
        setHasClientPortalAccess(false);
        if (clientId || authToken) {
          sessionStorage.removeItem("clientId");
          sessionStorage.removeItem("authToken");
          localStorage.removeItem("clientId");
        }
      }
    };
    checkClientPortal();
    const interval = setInterval(checkClientPortal, 5000);
    return () => clearInterval(interval);
  }, []);

  // Track cart count
  useEffect(() => {
    setCartCount(getCartCount());
    const handleCartUpdate = () => setCartCount(getCartCount());
    window.addEventListener("cartUpdated", handleCartUpdate);
    return () => window.removeEventListener("cartUpdated", handleCartUpdate);
  }, []);

  const isLoggedIn = isAuthenticated || hasClientPortalAccess;

  const handleSignOut = () => {
    sessionStorage.removeItem("clientId");
    sessionStorage.removeItem("externalId");
    sessionStorage.removeItem("authToken");
    sessionStorage.removeItem("clientName");
    sessionStorage.removeItem("loginRedirect");
    localStorage.removeItem("clientId");
    setHasClientPortalAccess(false);
    if (isAuthenticated) {
      window.location.href = "/api/logout";
    } else {
      window.location.href = "/portal/login";
    }
  };

  return (
    <header className="bg-gray-100 border-b-[0.5px] border-[#09080E]/50 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex items-center justify-between lg:h-20 h-16">
          {/* Logo */}
          <div className="flex items-center w-1/5 min-w-fit mr-4">
            <Link href="/" className="hover:opacity-80 transition-opacity cursor-pointer" data-testid="header-logo">
              <BrandLogo brand="businessblueprint" size="md" />
            </Link>

            {showNavigation && (
              <>
                {/* ═══════ DESKTOP MEGA MENU ═══════ */}
                <NavigationMenu className="hidden lg:flex ml-4">
                  <NavigationMenuList className="-space-x-4">

                    {/* ── How It Works ── */}
                    <NavigationMenuItem>
                      <NavigationMenuTrigger className="flex items-center space-x-1 bg-gray-100" data-testid={NAV_ITEMS[0].testId}>
                        {(() => { const Icon = ICON_MAP[NAV_ITEMS[0].icon]; return Icon ? <Icon className="w-4 h-4" /> : null; })()}
                        <span>{NAV_ITEMS[0].label}</span>
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <div className="p-4 w-[90vw] max-w-[600px]">
                          <div className="mb-4">
                            <h3 className="text-xl font-bold text-gray-900 mb-2">{HOW_IT_WORKS_MENU.title}</h3>
                            <p className="text-xs text-gray-600">{HOW_IT_WORKS_MENU.description}</p>
                          </div>
                          <div className="space-y-3 divide-y divide-[#09080E] [&>*]:border-[0.5px]">
                            {HOW_IT_WORKS_MENU.steps.map((step) => {
                              const inner = (
                                <div
                                  className="flex items-start gap-2 p-2 rounded-lg border-l-4 hover:bg-gray-50 transition-colors cursor-pointer"
                                  style={{ borderColor: step.borderColor }}
                                >
                                  {step.icon === "coachblue-png" ? (
                                    <img src={coachBlueIcon} alt="Coach Blue" className="w-10 h-10 object-contain -mt-2 flex-shrink-0" style={{ borderRadius: 4 }} />
                                  ) : (
                                    <div className="-mt-2 flex-shrink-0"><AppIcon name={step.icon} size={40} color={step.borderColor} /></div>
                                  )}
                                  <div className="text-left">
                                    <div className="font-bold text-sm text-gray-900">{step.title}</div>
                                    <p className="text-xs text-gray-600">{step.description}</p>
                                  </div>
                                </div>
                              );
                              if (step.href === "#") return <div key={step.number}>{inner}</div>;
                              return (
                                <Link key={step.number} href={step.href} className="block" data-testid={step.testId}>
                                  {inner}
                                </Link>
                              );
                            })}
                          </div>
                          <div className="mt-6 pt-4 border-t-[0.5px] border-[#09080E]">
                            <Link href={HOW_IT_WORKS_MENU.ctaHref}>
                              <Button className="w-full text-white" style={{ backgroundColor: "#A00028" }} data-testid="button-start-blueprint">
                                {HOW_IT_WORKS_MENU.ctaText}
                              </Button>
                            </Link>
                          </div>
                        </div>
                      </NavigationMenuContent>
                    </NavigationMenuItem>

                    {/* ── Products (PricingLayout) ── */}
                    <NavigationMenuItem>
                      <NavigationMenuTrigger className="flex items-center space-x-1 bg-gray-100" data-testid={NAV_ITEMS[1].testId}>
                        {(() => { const Icon = ICON_MAP[NAV_ITEMS[1].icon]; return Icon ? <Icon className="w-4 h-4" /> : null; })()}
                        <span>{NAV_ITEMS[1].label}</span>
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <div className="p-3 w-[90vw] max-w-[900px] max-h-[80vh] overflow-y-auto">
                          <PricingLayout variant="menu" />
                        </div>
                      </NavigationMenuContent>
                    </NavigationMenuItem>

                    {/* ── Solutions ── */}
                    <NavigationMenuItem>
                      <NavigationMenuTrigger className="flex items-center space-x-1 bg-gray-100" data-testid={NAV_ITEMS[2].testId}>
                        {(() => { const Icon = ICON_MAP[NAV_ITEMS[2].icon]; return Icon ? <Icon className="w-4 h-4" /> : null; })()}
                        <span>{NAV_ITEMS[2].label}</span>
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <div className="p-4 w-[90vw] max-w-[900px]">
                          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 [&>*]:border-b-[0.5px] [&>*]:border-[#09080E] [&>*]:pb-3">
                            {/* Platforms */}
                            {SOLUTIONS_MENU.platforms.map((p) => (
                              <NavigationMenuLink key={p.id} asChild>
                                <a
                                  href={p.href}
                                  className="flex flex-col items-center justify-center p-3 rounded-lg border-2 hover:shadow-lg transition-all cursor-pointer"
                                  style={{ borderColor: p.borderColor }}
                                  data-testid={p.testId}
                                >
                                  <img
                                    src={p.icon}
                                    alt={p.name}
                                    className="w-full object-contain"
                                    style={{ maxHeight: 36 }}
                                  />
                                  <p className="text-xs text-gray-500 text-center mt-2">{p.description}</p>
                                </a>
                              </NavigationMenuLink>
                            ))}
                            {/* Products (Coach Blue, Digital IQ, Scanner, Connect) */}
                            {SOLUTIONS_MENU.products.map((p) => (
                              <NavigationMenuLink key={p.id} asChild>
                                <a href={p.href} className="flex flex-col items-center p-3 rounded-lg border-2 hover:shadow-lg transition-all cursor-pointer" style={{ borderColor: p.borderColor }} data-testid={p.testId}>
                                  {p.icon.startsWith("/") || p.icon.includes(".") ? (
                                    <img src={p.icon} alt={p.name} className="h-12 w-12 object-contain mb-2" />
                                  ) : (
                                    <div className="mb-2"><AppIcon name={p.icon} size={48} color={p.borderColor} /></div>
                                  )}
                                  {p.id === "connect" ? (
                                    <AppName appId="connect" size="sm" iconSize={0} />
                                  ) : (
                                    <div className="text-sm font-bold text-gray-900 text-center">{p.name}</div>
                                  )}
                                  <p className="text-xs text-gray-600 text-center">{p.description}</p>
                                </a>
                              </NavigationMenuLink>
                            ))}
                            {/* Slash Apps from Registry */}
                            {APP_REGISTRY.map((app) => (
                              <NavigationMenuLink key={app.id} asChild>
                                <a href={app.landingRoute} className="flex flex-col items-center p-3 rounded-lg border-2 hover:shadow-lg transition-all cursor-pointer" style={{ borderColor: app.color }} data-testid={`link-solution-${app.id}`}>
                                  <AppIcon name={app.icon} size={48} color={app.color} />
                                  <div className="mt-2"><AppName appId={app.id} size="sm" iconSize={0} /></div>
                                  <p className="text-xs text-gray-600 text-center">{app.description}</p>
                                </a>
                              </NavigationMenuLink>
                            ))}
                          </div>
                        </div>
                      </NavigationMenuContent>
                    </NavigationMenuItem>

                    {/* ── Resources ── */}
                    <NavigationMenuItem>
                      <NavigationMenuTrigger className="flex items-center space-x-1 bg-gray-100" data-testid={NAV_ITEMS[3].testId}>
                        {(() => { const Icon = ICON_MAP[NAV_ITEMS[3].icon]; return Icon ? <Icon className="w-4 h-4" /> : null; })()}
                        <span>{NAV_ITEMS[3].label}</span>
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <div className="grid gap-0 p-6 w-[90vw] max-w-[950px] grid-cols-1 md:grid-cols-3 md:[&>*+*]:border-l-[0.5px] md:[&>*+*]:border-[#09080E]">

                          {/* ═══ COLUMN 1 — PLATFORMS + LEARN ═══ */}
                          <div className="pr-4 space-y-3">
                            {/* PLATFORMS section */}
                            <div>
                              <div className="flex items-center gap-2 pb-2">
                                {(() => { const Icon = ICON_MAP["LayoutGrid"]; return Icon ? <Icon className="w-4 h-4 text-gray-500" /> : null; })()}
                                <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wide">Platforms</h4>
                              </div>
                              <div className="space-y-1">
                                {SOLUTIONS_MENU.platforms.map((p) => (
                                  <NavigationMenuLink key={p.id} asChild>
                                    <a
                                      className="group flex flex-col rounded-md p-2 leading-none no-underline outline-none transition-colors hover:bg-accent"
                                      href={p.href}
                                      data-testid={`link-resources-${p.id}`}
                                    >
                                      <img
                                        src={p.icon}
                                        alt={p.name}
                                        className="object-contain"
                                        style={{ height: 16 }}
                                      />
                                      <p className="text-[10px] text-gray-500 mt-1">{p.description}</p>
                                    </a>
                                  </NavigationMenuLink>
                                ))}
                              </div>
                            </div>

                            {/* Divider */}
                            <div className="border-t-[0.5px] border-[#09080E]" />

                            {/* LEARN section */}
                            <ResourceColumn column={RESOURCES_MENU.columns[0]} />
                          </div>

                          {/* ═══ COLUMN 2 — PRODUCT CATALOG ═══ */}
                          <div className="md:pl-4 md:pr-4 space-y-3">
                            <div className="flex items-center gap-2 pb-1">
                              {(() => { const Icon = ICON_MAP["ShoppingBasket"]; return Icon ? <Icon className="w-4 h-4 text-gray-500" /> : null; })()}
                              <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wide">Product Catalog</h4>
                            </div>

                            {/* / assess — standalone */}
                            <NavigationMenuLink asChild>
                              <a className="group flex items-start gap-2 rounded-md p-2 leading-none no-underline outline-none transition-colors hover:bg-accent" href="/assessment" data-testid="link-resources-assess">
                                <div className="flex-shrink-0">
                                  <AppIcon name="Lightbulb" size={20} color="#960D71" />
                                </div>
                                <div>
                                  <div className="text-sm font-semibold" style={{ fontFamily: "Archivo Semi Expanded, Archivo, sans-serif" }}>
                                    <span style={{ color: "#09080E" }}>/</span>{" "}
                                    <span style={{ color: "#960D71" }}>assess</span>
                                  </div>
                                  <p className="text-xs text-gray-600">Digital IQ Assessment</p>
                                </div>
                              </a>
                            </NavigationMenuLink>

                            {/* / connect — highlighted card */}
                            <NavigationMenuLink asChild>
                              <a className="group flex items-start gap-2 rounded-md p-2 leading-none no-underline outline-none transition-colors hover:bg-accent border border-gray-200" href="/connect" data-testid="link-resources-connect">
                                <div className="flex-shrink-0">
                                  <AppIcon name={CONNECT_CRM.icon} size={20} color={CONNECT_CRM.color} />
                                </div>
                                <div>
                                  <AppName appId="connect" size="sm" iconSize={0} />
                                  <p className="text-xs text-gray-600">{CONNECT_CRM.description}</p>
                                </div>
                              </a>
                            </NavigationMenuLink>

                            {/* Coach Blue — PNG icon */}
                            <NavigationMenuLink asChild>
                              <a className="group flex items-start gap-2 rounded-md p-2 leading-none no-underline outline-none transition-colors hover:bg-accent" href="/coach-blue" data-testid="link-resources-coachblue">
                                <img src={coachBlueIcon} alt="Coach Blue" className="flex-shrink-0 object-contain" style={{ width: 20, height: 20, borderRadius: 4 }} />
                                <div>
                                  <div className="text-sm font-semibold" style={{ fontFamily: "Archivo Semi Expanded, Archivo, sans-serif", color: "#0000FF" }}>Coach Blue</div>
                                  <p className="text-xs text-gray-600">{COACH_BLUE.description}</p>
                                </div>
                              </a>
                            </NavigationMenuLink>

                            {/* Anchor Suite */}
                            {(() => {
                              const anchorBundle = BUNDLE_REGISTRY.find((b) => b.id === "anchor")!;
                              const anchorApps = getAppsByBundle("anchor");
                              return (
                                <div className="space-y-1">
                                  <div className="text-xs font-bold uppercase tracking-wide px-2 pt-1" style={{ color: anchorBundle.color }}>
                                    {anchorBundle.name}
                                  </div>
                                  {anchorApps.map((app) => (
                                    <NavigationMenuLink key={app.id} asChild>
                                      <a className="group flex items-start gap-2 rounded-md p-2 leading-none no-underline outline-none transition-colors hover:bg-accent" href={app.landingRoute} data-testid={`link-resources-${app.id}`}>
                                        <div className="flex-shrink-0">
                                          <AppIcon name={app.icon} size={18} color={app.color} />
                                        </div>
                                        <div>
                                          <AppName appId={app.id} size="sm" iconSize={0} />
                                          <p className="text-xs text-gray-600">{app.description}</p>
                                        </div>
                                      </a>
                                    </NavigationMenuLink>
                                  ))}
                                </div>
                              );
                            })()}

                            {/* Compass Suite */}
                            {(() => {
                              const compassBundle = BUNDLE_REGISTRY.find((b) => b.id === "compass")!;
                              const compassApps = getAppsByBundle("compass");
                              return (
                                <div className="space-y-1">
                                  <div className="text-xs font-bold uppercase tracking-wide px-2 pt-1" style={{ color: compassBundle.color }}>
                                    {compassBundle.name}
                                  </div>
                                  {compassApps.map((app) => (
                                    <NavigationMenuLink key={app.id} asChild>
                                      <a className="group flex items-start gap-2 rounded-md p-2 leading-none no-underline outline-none transition-colors hover:bg-accent" href={app.landingRoute} data-testid={`link-resources-${app.id}`}>
                                        <div className="flex-shrink-0">
                                          <AppIcon name={app.icon} size={18} color={app.color} />
                                        </div>
                                        <div>
                                          <AppName appId={app.id} size="sm" iconSize={0} />
                                          <p className="text-xs text-gray-600">{app.description}</p>
                                        </div>
                                      </a>
                                    </NavigationMenuLink>
                                  ))}
                                </div>
                              );
                            })()}
                          </div>

                          {/* ═══ COLUMN 3 — DEVELOPERS + SUPPORT ═══ */}
                          <div className="md:pl-4 space-y-3">
                            <ResourceColumn column={RESOURCES_MENU.columns[1]} />
                            <div className="border-t-[0.5px] border-[#09080E] pt-2 mt-2">
                              <ResourceColumn column={RESOURCES_MENU.columns[2]} />
                            </div>
                          </div>

                          {/* CTA — full width */}
                          <div className="col-span-3 border-t-[0.5px] border-[#09080E] pt-3 mt-1">
                            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-3">
                              <div className="flex items-center justify-between">
                                <div>
                                  <div className="text-sm font-bold text-gray-900">{RESOURCES_MENU.cta.label}</div>
                                  <p className="text-xs text-gray-600">{RESOURCES_MENU.cta.description}</p>
                                </div>
                                <a href={RESOURCES_MENU.cta.href} className="px-3 py-1.5 bg-blue-600 text-white text-xs font-semibold rounded-md hover:bg-blue-700 transition-colors">
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

                {/* Mobile Cart */}
                <Link
                  href="/cart"
                  className="lg:hidden absolute top-4 hover:opacity-80 transition-opacity"
                  style={{ right: "16px" }}
                  data-testid="button-cart-mobile-top"
                >
                  <ShoppingCart className="w-7 h-7 text-gray-700" />
                  {cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </Link>
              </>
            )}
          </div>

          {/* ═══════ RIGHT SIDE — Desktop only ═══════ */}
          <div className="hidden lg:flex items-center gap-1">
            {showNavigation && (
              <>
                {isLoggedIn ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="flex items-center gap-1 px-2 py-1.5 border border-gray-900 hover:bg-gray-100 text-gray-900 rounded-md text-xs font-medium transition-colors" data-testid="button-account-dropdown">
                        <div className="w-5 h-5 rounded-full bg-gray-200 border border-gray-300 flex items-center justify-center overflow-hidden">
                          <User className="w-3 h-3 text-gray-500" />
                        </div>
                        <span>Account</span>
                        <ChevronDown className="w-3 h-3" />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                      {isAuthenticated && (
                        <DropdownMenuItem asChild>
                          <a href="/admin" className="flex items-center gap-2 cursor-pointer text-blue-600" data-testid="menu-item-admin">
                            <Settings className="w-4 h-4" />
                            <span>Admin Panel</span>
                          </a>
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuItem asChild>
                        <a href="/portal/dashboard" className="flex items-center gap-2 cursor-pointer" data-testid="menu-item-dashboard">
                          <ClipboardCheck className="w-4 h-4" />
                          <span>Dashboard</span>
                        </a>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <a href="/portal/account" className="flex items-center gap-2 cursor-pointer" data-testid="menu-item-my-account">
                          <User className="w-4 h-4" />
                          <span>My Account</span>
                        </a>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <a href="/portal/profile" className="flex items-center gap-2 cursor-pointer" data-testid="menu-item-my-profile">
                          <User className="w-4 h-4" />
                          <span>My Profile</span>
                        </a>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <a href="/portal/settings" className="flex items-center gap-2 cursor-pointer" data-testid="menu-item-settings">
                          <Settings className="w-4 h-4" />
                          <span>Settings</span>
                        </a>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <a href="/portal/billing" className="flex items-center gap-2 cursor-pointer" data-testid="menu-item-billing">
                          <CreditCard className="w-4 h-4" />
                          <span>Billing & Subscriptions</span>
                        </a>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={handleSignOut} className="flex items-center gap-2 cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-50" data-testid="menu-item-sign-out">
                        <LogOut className="w-4 h-4" />
                        <span>Sign Out</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <a href="/portal/login" className="flex items-center px-2 py-1.5 border border-gray-900 hover:bg-gray-100 text-gray-900 rounded-md text-xs font-medium transition-colors" data-testid="button-login">
                    Login
                  </a>
                )}

                {isLoggedIn && (
                  <a href={isAuthenticated ? "/admin" : "/portal/dashboard"} className="flex items-center px-2 py-1.5 bg-gray-900 hover:bg-gray-800 text-white rounded-md text-xs font-medium transition-colors" data-testid="button-dashboard">
                    Dashboard
                  </a>
                )}

                <a
                  href={isLoggedIn ? "/respond/dashboard" : "/portal/login?redirect=/respond/dashboard"}
                  className="flex items-center px-2 py-1.5 bg-white border border-[#001882] hover:bg-blue-50 text-[#001882] rounded-md font-bold text-xs transition-colors"
                  data-testid="button-quick-respond"
                >
                  <span style={{ color: "#09080E" }}>/</span>&nbsp;respond
                </a>

                <a
                  href={isLoggedIn ? "/assessment" : "/portal/login?redirect=/assessment"}
                  className="flex items-center px-2 py-1.5 border-2 border-[#960D71] text-[#960D71] bg-transparent hover:bg-[#960D71] hover:text-white rounded-md text-xs font-bold transition-all whitespace-nowrap"
                  data-testid="button-digital-iq"
                >
                  Digital IQ
                </a>

                <Link href="/cart" className="relative p-1.5 hover:bg-white rounded-md transition-colors ml-2" data-testid="button-cart">
                  <ShoppingCart className="w-4 h-4 text-gray-700" />
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </Link>
              </>
            )}
          </div>
        </div>

        {/* ═══════ MOBILE SECOND ROW ═══════ */}
        <div className="lg:hidden flex items-center justify-between gap-2 h-16 border-t border-gray-200 flex-wrap p-2">
          {showNavigation && (
            <>
              <a href={isLoggedIn ? "/respond/dashboard" : "/portal/login?redirect=/respond/dashboard"} className="flex-1 px-2 py-2 bg-white border border-[#001882] hover:bg-blue-50 text-[#001882] rounded-md font-bold text-xs text-center transition-colors" data-testid="button-respond-mobile">
                <span style={{ color: "#09080E" }}>/</span>&nbsp;respond
              </a>
              {isLoggedIn ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="flex-1 flex items-center justify-center gap-1 px-2 py-2 border border-gray-900 hover:bg-gray-100 text-gray-900 rounded-md text-xs font-medium transition-colors" data-testid="button-account-dropdown-mobile">
                      <User className="w-3 h-3" />
                      <span>Account</span>
                      <ChevronDown className="w-3 h-3" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="center" className="w-48">
                    <DropdownMenuItem asChild>
                      <a href="/portal/dashboard" className="flex items-center gap-2 cursor-pointer"><User className="w-4 h-4" /><span>My Profile</span></a>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <a href="/portal/settings" className="flex items-center gap-2 cursor-pointer"><Settings className="w-4 h-4" /><span>Settings</span></a>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <a href="/portal/billing" className="flex items-center gap-2 cursor-pointer"><CreditCard className="w-4 h-4" /><span>Billing & Subscriptions</span></a>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleSignOut} className="flex items-center gap-2 cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-50">
                      <LogOut className="w-4 h-4" /><span>Sign Out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <a href="/portal/login" className="flex-1 px-2 py-2 border border-gray-900 hover:bg-gray-100 text-gray-900 rounded-md text-xs font-medium text-center transition-colors" data-testid="button-login-mobile">
                  Login
                </a>
              )}
              <a href={isLoggedIn ? "/assessment" : "/portal/login?redirect=/assessment"} className="flex-1 px-2 py-2 border-2 border-orange-500 text-orange-500 bg-transparent hover:bg-orange-500 hover:text-white rounded-md text-xs font-bold text-center transition-all" data-testid="button-digital-iq-mobile">
                Digital IQ
              </a>
            </>
          )}
        </div>

        {/* ═══════ MOBILE MENU ═══════ */}
        {isMobileMenuOpen && showNavigation && (
          <div className="lg:hidden fixed inset-0 lg:top-20 top-32 z-40 bg-white flex flex-col">
            <div className="flex-1 overflow-y-auto pb-28">
              <nav className="p-4">
                {/* Cart Preview */}
                {cartCount > 0 && (
                  <Link href="/cart" className="block mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg" data-testid="mobile-cart-preview">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <ShoppingCart className="w-5 h-5 text-blue-600" />
                        <div>
                          <div className="font-bold text-gray-900">{cartCount} {cartCount === 1 ? "Item" : "Items"} in Cart</div>
                          <div className="text-sm text-gray-600">Tap to view & checkout</div>
                        </div>
                      </div>
                      <div className="text-lg font-bold text-blue-600">${getCartTotal().toFixed(2)}</div>
                    </div>
                  </Link>
                )}

                {/* Accordion Navigation */}
                <div className="space-y-2">
                  {NAV_ITEMS.map((item) => {
                    const isOpen = openAccordion === item.label;
                    return (
                      <div key={item.label} className="border rounded-lg overflow-hidden">
                        <button
                          onClick={() => setOpenAccordion(isOpen ? null : item.label)}
                          className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition-colors"
                          data-testid={`mobile-accordion-${item.label.toLowerCase().replace(/ /g, "-")}`}
                        >
                          <div className="font-bold text-gray-900">{item.label}</div>
                          {isOpen ? <Minus className="w-5 h-5 text-blue-600 flex-shrink-0" /> : <Plus className="w-5 h-5 text-gray-600 flex-shrink-0" />}
                        </button>

                        {isOpen && (
                          <div className="p-4 border-t space-y-3">

                            {/* How It Works (mobile) */}
                            {item.label === "How It Works" && (
                              <div className="space-y-2">
                                {HOW_IT_WORKS_MENU.steps.map((step) => (
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

                            {/* Products (mobile) — same PricingLayout */}
                            {item.label === "Products" && (
                              <PricingLayout variant="menu" />
                            )}

                            {/* Solutions (mobile) */}
                            {item.label === "Solutions" && (
                              <div className="grid grid-cols-2 gap-2">
                                {SOLUTIONS_MENU.platforms.map((p) => (
                                  <a key={p.id} href={p.href} className="flex flex-col items-center justify-center p-2 rounded-lg border-2 hover:shadow-lg transition-all" style={{ borderColor: p.borderColor }} data-testid={`mobile-${p.testId}`}>
                                    <img
                                      src={p.icon}
                                      alt={p.name}
                                      className="w-full object-contain"
                                      style={{ maxHeight: 28 }}
                                    />
                                    <p className="text-xs text-gray-500 text-center mt-1">{p.description}</p>
                                  </a>
                                ))}
                                {SOLUTIONS_MENU.products.map((p) => (
                                  <a key={p.id} href={p.href} className="flex flex-col items-center p-2 rounded-lg border-2 hover:shadow-lg transition-all" style={{ borderColor: p.borderColor }} data-testid={`mobile-${p.testId}`}>
                                    {p.id === "connect" ? (
                                      <AppName appId="connect" size="sm" iconSize={0} />
                                    ) : (
                                      <p className="text-xs font-bold text-gray-900 text-center">{p.name}</p>
                                    )}
                                    <p className="text-xs text-gray-600 text-center">{p.description}</p>
                                  </a>
                                ))}
                                {APP_REGISTRY.map((app) => (
                                  <a key={app.id} href={app.landingRoute} className="flex flex-col items-center p-2 rounded-lg border-2 hover:shadow-lg transition-all" style={{ borderColor: app.color }} data-testid={`mobile-link-${app.id}-app`}>
                                    <AppName appId={app.id} size="sm" iconSize={0} />
                                    <p className="text-xs text-gray-600 text-center">{app.description}</p>
                                  </a>
                                ))}
                              </div>
                            )}

                            {/* Resources (mobile) */}
                            {item.label === "Resources" && (
                              <div className="space-y-4">
                                {/* PLATFORMS */}
                                <div>
                                  <h4 className="text-xs font-bold text-gray-700 uppercase mb-2 flex items-center gap-2">
                                    {(() => { const Icon = ICON_MAP["LayoutGrid"]; return Icon ? <Icon className="w-4 h-4" /> : null; })()}
                                    Platforms
                                  </h4>
                                  <div className="space-y-2">
                                    {SOLUTIONS_MENU.platforms.map((p) => (
                                      <a key={p.id} href={p.href} className="flex items-center p-2 text-gray-900 hover:bg-gray-50 rounded text-sm" data-testid={`mobile-link-resources-${p.id}`}>
                                        <img src={p.icon} alt={p.name} className="object-contain" style={{ height: 16 }} />
                                        <p className="text-xs text-gray-600 ml-2">{p.description}</p>
                                      </a>
                                    ))}
                                  </div>
                                </div>

                                {/* LEARN */}
                                <div className="border-t pt-3">
                                  <h4 className="text-xs font-bold text-gray-700 uppercase mb-2 flex items-center gap-2">
                                    {(() => { const Icon = ICON_MAP["GraduationCap"]; return Icon ? <Icon className="w-4 h-4" /> : null; })()}
                                    {RESOURCES_MENU.columns[0].title}
                                  </h4>
                                  <div className="space-y-2">
                                    {RESOURCES_MENU.columns[0].items.map((link) => {
                                      const LinkIcon = ICON_MAP[link.icon];
                                      return (
                                        <a key={link.testId} href={link.href} className="flex items-start gap-2 p-2 text-gray-900 hover:bg-gray-50 rounded text-sm" data-testid={`mobile-${link.testId}`}>
                                          {LinkIcon && <LinkIcon className="w-4 h-4 mt-0.5 flex-shrink-0 text-gray-500" />}
                                          <div>
                                            <div className="font-bold">{link.label}</div>
                                            <p className="text-xs text-gray-600">{link.description}</p>
                                          </div>
                                        </a>
                                      );
                                    })}
                                  </div>
                                </div>

                                {/* PRODUCT CATALOG */}
                                <div className="border-t pt-3">
                                  <h4 className="text-xs font-bold text-gray-700 uppercase mb-2">Product Catalog</h4>
                                  <div className="space-y-2">
                                    {/* / assess */}
                                    <a href="/assessment" className="flex items-start gap-2 p-2 text-gray-900 hover:bg-gray-50 rounded text-sm" data-testid="mobile-link-resources-assess">
                                      <div className="flex-shrink-0"><AppIcon name="Lightbulb" size={20} color="#960D71" /></div>
                                      <div>
                                        <div className="text-sm font-semibold" style={{ fontFamily: "Archivo Semi Expanded, Archivo, sans-serif" }}>
                                          <span style={{ color: "#09080E" }}>/</span>{" "}
                                          <span style={{ color: "#960D71" }}>assess</span>
                                        </div>
                                        <p className="text-xs text-gray-600">Digital IQ Assessment</p>
                                      </div>
                                    </a>

                                    {/* / connect — highlighted */}
                                    <a href="/connect" className="flex items-start gap-2 p-2 text-gray-900 hover:bg-gray-50 rounded text-sm border border-gray-200" data-testid="mobile-link-resources-connect">
                                      <div className="flex-shrink-0"><AppIcon name={CONNECT_CRM.icon} size={20} color={CONNECT_CRM.color} /></div>
                                      <div>
                                        <AppName appId="connect" size="sm" iconSize={0} />
                                        <p className="text-xs text-gray-600">{CONNECT_CRM.description}</p>
                                      </div>
                                    </a>

                                    {/* Coach Blue */}
                                    <a href="/coach-blue" className="flex items-start gap-2 p-2 text-gray-900 hover:bg-gray-50 rounded text-sm" data-testid="mobile-link-resources-coachblue">
                                      <img src={coachBlueIcon} alt="Coach Blue" className="flex-shrink-0 object-contain" style={{ width: 20, height: 20, borderRadius: 4 }} />
                                      <div>
                                        <div className="text-sm font-semibold" style={{ fontFamily: "Archivo Semi Expanded, Archivo, sans-serif", color: "#0000FF" }}>Coach Blue</div>
                                        <p className="text-xs text-gray-600">{COACH_BLUE.description}</p>
                                      </div>
                                    </a>

                                    {/* Anchor Suite */}
                                    <div className="pt-1">
                                      <div className="text-xs font-bold uppercase tracking-wide px-2" style={{ color: BUNDLE_REGISTRY.find((b) => b.id === "anchor")!.color }}>
                                        {BUNDLE_REGISTRY.find((b) => b.id === "anchor")!.name}
                                      </div>
                                      {getAppsByBundle("anchor").map((app) => (
                                        <a key={app.id} href={app.landingRoute} className="flex items-start gap-2 p-2 text-gray-900 hover:bg-gray-50 rounded text-sm" data-testid={`mobile-link-resources-${app.id}`}>
                                          <div className="flex-shrink-0"><AppIcon name={app.icon} size={18} color={app.color} /></div>
                                          <div>
                                            <AppName appId={app.id} size="sm" iconSize={0} />
                                            <p className="text-xs text-gray-600">{app.description}</p>
                                          </div>
                                        </a>
                                      ))}
                                    </div>

                                    {/* Compass Suite */}
                                    <div className="pt-1">
                                      <div className="text-xs font-bold uppercase tracking-wide px-2" style={{ color: BUNDLE_REGISTRY.find((b) => b.id === "compass")!.color }}>
                                        {BUNDLE_REGISTRY.find((b) => b.id === "compass")!.name}
                                      </div>
                                      {getAppsByBundle("compass").map((app) => (
                                        <a key={app.id} href={app.landingRoute} className="flex items-start gap-2 p-2 text-gray-900 hover:bg-gray-50 rounded text-sm" data-testid={`mobile-link-resources-${app.id}`}>
                                          <div className="flex-shrink-0"><AppIcon name={app.icon} size={18} color={app.color} /></div>
                                          <div>
                                            <AppName appId={app.id} size="sm" iconSize={0} />
                                            <p className="text-xs text-gray-600">{app.description}</p>
                                          </div>
                                        </a>
                                      ))}
                                    </div>
                                  </div>
                                </div>

                                {/* DEVELOPERS */}
                                <div className="border-t pt-3">
                                  <h4 className="text-xs font-bold text-gray-700 uppercase mb-2 flex items-center gap-2">
                                    {(() => { const Icon = ICON_MAP["Code"]; return Icon ? <Icon className="w-4 h-4" /> : null; })()}
                                    {RESOURCES_MENU.columns[1].title}
                                  </h4>
                                  <div className="space-y-2">
                                    {RESOURCES_MENU.columns[1].items.map((link) => {
                                      const LinkIcon = ICON_MAP[link.icon];
                                      return (
                                        <a key={link.testId} href={link.href} className="flex items-start gap-2 p-2 text-gray-900 hover:bg-gray-50 rounded text-sm" data-testid={`mobile-${link.testId}`}>
                                          {LinkIcon && <LinkIcon className="w-4 h-4 mt-0.5 flex-shrink-0 text-gray-500" />}
                                          <div>
                                            <div className="font-bold">{link.label}</div>
                                            <p className="text-xs text-gray-600">{link.description}</p>
                                          </div>
                                        </a>
                                      );
                                    })}
                                  </div>
                                </div>

                                {/* SUPPORT */}
                                <div className="border-t pt-3">
                                  <h4 className="text-xs font-bold text-gray-700 uppercase mb-2 flex items-center gap-2">
                                    {(() => { const Icon = ICON_MAP["HelpCircle"]; return Icon ? <Icon className="w-4 h-4" /> : null; })()}
                                    {RESOURCES_MENU.columns[2].title}
                                  </h4>
                                  <div className="space-y-2">
                                    {RESOURCES_MENU.columns[2].items.map((link) => {
                                      const LinkIcon = ICON_MAP[link.icon];
                                      return (
                                        <a key={link.testId} href={link.href} className="flex items-start gap-2 p-2 text-gray-900 hover:bg-gray-50 rounded text-sm" data-testid={`mobile-${link.testId}`}>
                                          {LinkIcon && <LinkIcon className="w-4 h-4 mt-0.5 flex-shrink-0 text-gray-500" />}
                                          <div>
                                            <div className="font-bold">{link.label}</div>
                                            <p className="text-xs text-gray-600">{link.description}</p>
                                          </div>
                                        </a>
                                      );
                                    })}
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

            {/* Sticky Footer */}
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200 shadow-lg">
              {isLoggedIn ? (
                <a href={isAuthenticated ? "/admin" : "/portal/dashboard"} className="flex items-center justify-center gap-3 w-full p-4 border-2 border-gray-900 text-gray-900 rounded-lg font-bold text-lg active:bg-gray-50 transition-colors" data-testid="mobile-dashboard-btn">
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

// ─── Helper: Resource Column (desktop) ───

function ResourceColumn({ column }: { column: (typeof RESOURCES_MENU.columns)[number] }) {
  const ColIcon = ICON_MAP[column.icon];
  return (
    <div className="space-y-1 [&>*+*]:border-t-[0.5px] [&>*+*]:border-[#09080E]">
      <div className="flex items-center gap-2 pb-2">
        {ColIcon && <ColIcon className="w-4 h-4 text-gray-500" />}
        <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wide">{column.title}</h4>
      </div>
      {column.items.map((link) => {
        const LinkIcon = ICON_MAP[link.icon];
        return (
          <NavigationMenuLink key={link.testId} asChild>
            <a className="group flex items-start space-x-2 rounded-md p-2 leading-none no-underline outline-none transition-colors hover:bg-accent" href={link.href} data-testid={link.testId}>
              {LinkIcon && <LinkIcon className="w-4 h-4 mt-0.5 flex-shrink-0 text-gray-500" />}
              <div>
                <div className="text-sm font-medium text-gray-900">{link.label}</div>
                <p className="text-xs text-gray-600">{link.description}</p>
              </div>
            </a>
          </NavigationMenuLink>
        );
      })}
    </div>
  );
}
