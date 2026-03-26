import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import {
  LayoutDashboard,
  CheckSquare,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Menu,
  CreditCard,
  Lock,
  Target,
  Megaphone,
  Inbox,
  MessageCircle,
  Mail,
  Share2,
  BookOpen,
  Star,
  Settings
} from "lucide-react";
import { cn } from "@/lib/utils";
import bbIcon from "@assets/images_logos/bb-favicon.png";
import bbLockup from "@assets/images_logos/bb-logo-only.png";
import aiCoachIcon from "@assets/images_logos/coachblue48.png";
import hostsBlueWordmark from "@assets/images_logos/hostsblue-lockup.png";
import swipesBlueWordmark from "@assets/images_logos/swipesblue-lockup.png";

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

  const navItems: NavItem[] = [
    {
      id: "respond",
      label: "respond",
      hoverLabel: "Unified Communications",
      icon: <Inbox className="w-7 h-7" style={{ color: '#001882' }} />,
      external: true,
      href: "/respond",
      featureCode: "RS",
    },
    {
      id: "engage",
      label: "engage",
      hoverLabel: "Live Chat Widget",
      icon: <MessageCircle className="w-7 h-7" style={{ color: '#660099' }} />,
      external: true,
      href: "/engage",
      featureCode: "LC",
    },
    { 
      id: "tasks", 
      label: "Tasks", 
      icon: <CheckSquare className="w-7 h-7" /> 
    },
    { 
      id: "billing", 
      label: "Billing", 
      icon: <CreditCard className="w-7 h-7" /> 
    },
    { 
      id: "divider-1", 
      label: "", 
      icon: null, 
      isDivider: true 
    },
    {
      id: "promote",
      label: "promote",
      hoverLabel: "Email + SMS Marketing",
      icon: <Mail className="w-7 h-7" style={{ color: '#1844A6' }} />,
      external: true,
      href: "/promote",
      featureCode: "SE",
    },
    {
      id: "post",
      label: "post",
      hoverLabel: "Social Media Management",
      icon: <Share2 className="w-7 h-7" style={{ color: '#FF44CC' }} />,
      external: true,
      href: "/post",
      featureCode: "PO",
    },
    { 
      id: "divider-2", 
      label: "", 
      icon: null, 
      isDivider: true 
    },
    { 
      id: "local-seo-heading", 
      label: "Local SEO Mgmt", 
      icon: null,
      isHeading: true
    },
    {
      id: "publish",
      label: "publish",
      hoverLabel: "Directory Sync & Consistency",
      icon: <BookOpen className="w-7 h-7" style={{ color: '#064A6C' }} />,
      external: true,
      href: "/publish",
      featureCode: "LI",
    },
    {
      id: "elevate",
      label: "elevate",
      hoverLabel: "Review Response & Reputation Management",
      icon: <Star className="w-7 h-7" style={{ color: '#E9B307' }} />,
      external: true,
      href: "/elevate",
      featureCode: "RE",
    },
    {
      id: "optimize",
      label: "optimize",
      hoverLabel: "SEO Optimization Suite",
      icon: <Target className="w-7 h-7" style={{ color: '#374151' }} />,
      external: true,
      href: "/optimize",
      featureCode: "OP",
    },
    {
      id: "amplify",
      label: "amplify",
      hoverLabel: "Advertising Platform",
      icon: <Megaphone className="w-7 h-7" style={{ color: '#6EA6FF' }} />,
      external: true,
      href: "/amplify",
      featureCode: "AM",
    },
    {
      id: "divider-3",
      label: "",
      icon: null,
      isDivider: true
    },
    {
      id: "ai-coach",
      label: "Coach Blue",
      icon: <img src={aiCoachIcon} alt="Coach Blue" className="w-7 h-7 object-contain" />,
      external: true,
      href: "/coach-blue",
      featureCode: "AC",
    },
    { 
      id: "settings", 
      label: "Settings", 
      icon: <Settings className="w-7 h-7" /> 
    },
    { 
      id: "divider-4", 
      label: "", 
      icon: null, 
      isDivider: true 
    },
    { 
      id: "hostsblue", 
      label: "hostsblue",
      icon: null,
      logo: hostsBlueWordmark,
      external: true,
      href: "https://hostsblue.com"
    },
    { 
      id: "swipesblue", 
      label: "swipesblue",
      icon: null,
      logo: swipesBlueWordmark,
      external: true,
      href: "https://swipesblue.com"
    },
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
                <span className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wide" data-testid={`heading-${item.id}`}>
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
                    item.id === "hostsblue" || item.id === "swipesblue" ? "h-7" : "h-5",
                    locked ? "grayscale" : ""
                  )}
                  data-testid={`logo-nav-${item.id}`}
                />
              ) : (
                <span className="flex-1 text-base leading-7" data-testid={`text-nav-${item.id}`}>
                  {item.label}
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
