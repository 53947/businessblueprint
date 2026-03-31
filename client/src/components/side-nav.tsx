import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import {
  LogOut,
  ChevronLeft,
  ChevronRight,
  Menu,
  Lock,
  Settings,
  BarChart3,
  ClipboardList,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { APP_REGISTRY, BUNDLE_REGISTRY } from "@/config/app-registry";
import { ICON_MAP } from "@/components/app-name";
import bbIcon from "@assets/images_logos/bb-favicon.png";
import bbLockup from "@assets/images_logos/bb-logo-only.png";
import aiCoachIcon from "@assets/images_logos/coachblue48.png";
import hostsBlueWordmark from "@assets/images_logos/hostsblue_logo_image_and_text_as_url.png";
import swipesBlueWordmark from "@assets/images_logos/swipesblue_logo_image_and_text_as_url.png";
import builderBlueWordmark from "@assets/images_logos/builderblue2-logo-image-and-text-as-url-for-header.png";
import scansBlueWordmark from "@assets/images_logos/scansblue_logo_image_and_text_as_url.png";
import { CONNECT_CRM } from "@/config/app-registry";

interface SideNavProps extends React.HTMLAttributes<HTMLDivElement> {
  activeTab?: string;
  onTabChange?: (tab: string) => void;
  onSignOut?: () => void;
  className?: string;
  enabledFeatures?: string; // Comma-separated feature codes: "RS,LC,SE,PO,LI,RE,AC"
}

interface NavItem {
  id: string;
  label: string;
  hoverLabel?: string; // Full industry name shown on hover for Compass apps
  icon: React.ReactNode;
  logo?: string; // For branded app logos
  badge?: number;
  external?: boolean;
  href?: string;
  isDivider?: boolean;
  isHeading?: boolean; // Non-clickable section heading
  hasSpaceBefore?: boolean;
  featureCode?: string; // Maps to enabledFeatures codes: RS, LC, SE, PO, LI, RE, AC
  isSlashApp?: boolean; // Renders with "/ appname" protocol
  appColor?: string; // App brand color for label
  headingColor?: string; // Brand color for section headings
}

export function SideNav({ activeTab = "list", onTabChange, onSignOut, className, enabledFeatures, ...props }: SideNavProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [, setLocation] = useLocation();

  // Parse enabled features into a set for quick lookup
  const enabledSet = new Set(
    enabledFeatures ? enabledFeatures.split(",").map((f) => f.trim()) : []
  );
  const hasFeatureGating = enabledFeatures !== undefined && enabledFeatures !== "";

  // Feature code mapping (app id → enabledFeatures code)
  const FEATURE_CODES: Record<string, string> = {
    respond: "RS", engage: "LC", promote: "SE", post: "PO",
    publish: "LI", elevate: "RE", optimize: "OP", amplify: "AM",
  };

  // Build app nav items from registry
  const buildAppNavItem = (appId: string): NavItem => {
    const app = APP_REGISTRY.find(a => a.id === appId)!;
    const Icon = ICON_MAP[app.icon];
    return {
      id: app.id,
      label: app.name,
      hoverLabel: app.description,
      icon: Icon ? <Icon className="w-7 h-7" style={{ color: app.color }} /> : null,
      external: true,
      href: app.dashboardRoute,
      featureCode: FEATURE_CODES[app.id],
      isSlashApp: true,
      appColor: app.color,
    };
  };

  const compassBundle = BUNDLE_REGISTRY.find(b => b.id === "compass")!;
  const anchorBundle = BUNDLE_REGISTRY.find(b => b.id === "anchor")!;

  // / connect nav item from registry
  const ConnectIcon = ICON_MAP[CONNECT_CRM.icon];
  const connectNavItem: NavItem = {
    id: CONNECT_CRM.id,
    label: CONNECT_CRM.name,
    hoverLabel: CONNECT_CRM.description,
    icon: ConnectIcon ? <ConnectIcon className="w-7 h-7" style={{ color: CONNECT_CRM.color }} /> : null,
    external: true,
    href: "/connect/dashboard",
    featureCode: "CO",
    isSlashApp: true,
    appColor: CONNECT_CRM.color,
  };

  const navItems: NavItem[] = [
    // / connect CRM at the top
    connectNavItem,
    { id: "divider-0", label: "", icon: null, isDivider: true },
    // Anchor Suite
    { id: "anchor-heading", label: "Anchor Suite", icon: null, isHeading: true, headingColor: anchorBundle.color },
    ...anchorBundle.appIds.map(buildAppNavItem),
    { id: "divider-1", label: "", icon: null, isDivider: true },
    // Compass Suite
    { id: "compass-heading", label: "Compass Suite", icon: null, isHeading: true, headingColor: compassBundle.color },
    ...compassBundle.appIds.map(buildAppNavItem),
    { id: "divider-2", label: "", icon: null, isDivider: true },
    // Your Guide zone
    {
      id: "ai-coach",
      label: "Coach Blue",
      icon: <img src={aiCoachIcon} alt="Coach Blue" className="w-7 h-7 object-contain" />,
      external: true,
      href: "/coach-blue",
      featureCode: "AC",
    },
    {
      id: "digital-iq",
      label: "Digital IQ",
      icon: <BarChart3 className="w-7 h-7" style={{ color: "#960D71" }} />,
      external: true,
      href: "/portal/prescriptions",
    },
    {
      id: "directions-for-use",
      label: "Directions for Use",
      icon: <ClipboardList className="w-7 h-7" style={{ color: "#09080E" }} />,
      external: true,
      href: "/portal/directions",
    },
    { id: "divider-3", label: "", icon: null, isDivider: true },
    // Admin zone
    { id: "settings", label: "Settings", icon: <Settings className="w-7 h-7" /> },
    { id: "divider-4", label: "", icon: null, isDivider: true },
    // Platform links
    { id: "hostsblue", label: "hostsblue.com", icon: null, logo: hostsBlueWordmark, external: true, href: "https://hostsblue.com" },
    { id: "swipesblue", label: "swipesblue.com", icon: null, logo: swipesBlueWordmark, external: true, href: "https://swipesblue.com" },
    { id: "builderblue2", label: "builderblue2.com", icon: null, logo: builderBlueWordmark, external: true, href: "https://builderblue2.com" },
    { id: "scansblue", label: "scansblue.com", icon: null, logo: scansBlueWordmark, external: true, href: "https://scansblue.com" },
  ];

  const isFeatureEnabled = (item: NavItem) => {
    // If no feature gating, all features are accessible
    if (!hasFeatureGating) return true;
    // Items without a feature code are always accessible (dividers, headings, settings, billing, etc.)
    if (!item.featureCode) return true;
    return enabledSet.has(item.featureCode);
  };

  const handleNavClick = (item: NavItem, closeMobile: boolean = false) => {
    if (closeMobile) {
      setIsMobileOpen(false);
    }

    // Block navigation for locked features
    if (!isFeatureEnabled(item)) {
      setLocation('/subscription');
      return;
    }

    if (item.external && item.href) {
      // Check if it's an absolute URL (external site)
      if (item.href.startsWith('http://') || item.href.startsWith('https://')) {
        window.open(item.href, '_blank', 'noopener,noreferrer');
      } else {
        // Internal route
        setLocation(item.href);
      }
    } else if (onTabChange) {
      onTabChange(item.id);
    }
  };

  const renderNavItems = (items: NavItem[], collapsed: boolean, isMobile: boolean = false) => (
    <>
      {items.map((item) => {
        // Render divider
        if (item.isDivider) {
          return (
            <div key={item.id} className="py-2">
              <div className="border-t border-gray-200 dark:border-gray-700"></div>
            </div>
          );
        }
        
        // Render heading (non-clickable section label)
        if (item.isHeading) {
          return (
            <div key={item.id} className="px-4 py-2 mt-2">
              {!collapsed && (
                <span className="text-sm font-bold uppercase tracking-wide" style={{ color: item.headingColor || '#6B7280' }} data-testid={`heading-${item.id}`}>
                  {item.label}
                </span>
              )}
            </div>
          );
        }
        
        // Render regular nav item
        const locked = !isFeatureEnabled(item);
        return (
          <button
            key={item.id}
            onClick={() => handleNavClick(item, isMobile)}
            className={cn(
              "w-full flex items-center gap-3 px-4 rounded-lg transition-all duration-200 text-left group",
              isMobile ? "h-12" : "h-9",
              locked
                ? "text-gray-400 dark:text-gray-600 opacity-60"
                : activeTab === item.id
                  ? "bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/20 text-blue-600 dark:text-blue-400 font-semibold shadow-sm"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:shadow-sm",
              item.hasSpaceBefore ? "mt-4" : ""
            )}
            title={locked ? `Upgrade to unlock ${item.hoverLabel || item.label}` : item.hoverLabel || undefined}
            data-testid={`nav-item-${item.id}`}
          >
            {item.icon && (
              <span className={cn(
                "flex-shrink-0 transition-transform duration-200",
                locked ? "" : activeTab === item.id ? "scale-110" : "group-hover:scale-105"
              )}>
                {item.icon}
              </span>
            )}
            {!collapsed && (
              item.logo ? (
                <img
                  src={item.logo}
                  alt={item.label}
                  className={cn(
                    "flex-1 object-contain object-left",
                    ["hostsblue", "swipesblue", "builderblue2", "scansblue"].includes(item.id) ? "h-7" : "h-5",
                    locked ? "grayscale" : ""
                  )}
                  data-testid={`logo-nav-${item.id}`}
                />
              ) : (
                <span className="flex-1 text-base leading-7" style={{ fontFamily: item.isSlashApp ? 'Archivo Semi Expanded, Archivo, sans-serif' : undefined, fontWeight: item.isSlashApp ? 600 : undefined }} data-testid={`text-nav-${item.id}`}>
                  {item.isSlashApp && <span style={{ color: '#09080E' }}>/ </span>}
                  {item.isSlashApp ? <span style={{ color: item.appColor }}>{item.label}</span> : item.label}
                </span>
              )
            )}
            {!collapsed && locked && (
              <Lock className="flex-shrink-0 w-3.5 h-3.5 text-gray-400" />
            )}
            {!collapsed && !locked && item.badge && (
              <span className="flex-shrink-0 bg-red-500 text-white text-xs font-semibold rounded-full px-2.5 py-1 shadow-sm" data-testid={`badge-${item.id}`}>
                {item.badge}
              </span>
            )}
          </button>
        );
      })}
    </>
  );

  // Mobile Menu Button (shown on mobile, triggers slide-in drawer)
  const MobileMenuButton = () => (
    <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden fixed top-4 left-4 z-40 bg-white dark:bg-gray-900 shadow-lg hover:shadow-xl transition-shadow"
          data-testid="button-mobile-menu"
          aria-label="Open navigation menu"
        >
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[280px] p-0 bg-white dark:bg-gray-900">
        <div className="h-full flex flex-col">
          {/* Mobile Header */}
          <SheetHeader className="p-6 border-b border-gray-200 dark:border-gray-700">
            <img 
              src={bbLockup} 
              alt="businessblueprint.io" 
              style={{ height: '32px', width: 'auto' }}
              className="object-contain" 
              data-testid="logo-mobile" 
            />
          </SheetHeader>

          {/* Mobile Navigation Items */}
          <nav className="flex-1 p-4 space-y-2 overflow-y-auto" data-testid="nav-items-mobile">
            {renderNavItems(navItems, false, true)}
          </nav>

          {/* Mobile Bottom Section */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
            {/* Sign Out */}
            {onSignOut && (
              <button
                onClick={() => {
                  setIsMobileOpen(false);
                  onSignOut();
                }}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 text-left text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 font-medium"
                data-testid="button-sign-out-mobile"
              >
                <LogOut className="w-5 h-5" />
                <span data-testid="text-sign-out-mobile">Sign Out</span>
              </button>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );

  return (
    <>
      {/* Mobile Menu Button - Only visible on mobile */}
      <MobileMenuButton />

      {/* Desktop Sidebar - Hidden on mobile, visible on large screens */}
      <div 
        className={cn(
          "hidden lg:flex bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 h-screen flex-col transition-all duration-300",
          isCollapsed ? "w-20" : "w-64",
          className
        )}
        {...props}
      >
        {/* Desktop Logo Header */}
        <div className="border-b border-gray-200 dark:border-gray-700">
          <div className="px-4 py-3 flex items-center justify-between" data-testid="sidebar-logo">
            <div className="cursor-pointer" onClick={() => { setLocation('/'); }}>
              {!isCollapsed ? (
                <img 
                  src={bbLockup} 
                  alt="businessblueprint.io" 
                  style={{ height: '36px', width: 'auto' }}
                  className="object-contain" 
                  data-testid="logo-desktop" 
                />
              ) : (
                <img 
                  src={bbIcon} 
                  alt="businessblueprint.io" 
                  style={{ height: '36px', width: 'auto' }}
                  className="object-contain" 
                  data-testid="logo-icon" 
                />
              )}
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => { e.stopPropagation(); setIsCollapsed(!isCollapsed); }}
              className="p-1 h-auto text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
              data-testid="button-toggle-nav"
              aria-label={isCollapsed ? "Expand navigation" : "Collapse navigation"}
              aria-expanded={!isCollapsed}
            >
              {isCollapsed ? (
                <ChevronRight className="h-4 w-4" />
              ) : (
                <ChevronLeft className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>

        {/* Desktop Navigation Items */}
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto" data-testid="nav-items">
          {renderNavItems(navItems, isCollapsed)}
        </nav>

        {/* Desktop Bottom Section */}
        <div className="p-3 border-t border-gray-200 dark:border-gray-700">
          {/* Sign Out */}
          {onSignOut && (
            <button
              onClick={onSignOut}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-left text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
              data-testid="button-sign-out"
            >
              <LogOut className="w-5 h-5" />
              {!isCollapsed && <span data-testid="text-sign-out">Sign Out</span>}
            </button>
          )}
        </div>
      </div>
    </>
  );
}
