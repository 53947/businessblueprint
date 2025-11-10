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
  Menu
} from "lucide-react";
import { cn } from "@/lib/utils";
import bbIcon from "@assets/Blueprint_Favicon_1762489845363.png";
import bbLockup from "@assets/BBlueprint Main Header Logo_1762489845362.png";
import inboxIcon from "@assets/native icons and favicons/: inbox app icon.png";
import inboxLogo from "@assets/logos and wordmarks/: inbox app logo.png";
import livechatIcon from "@assets/native icons and favicons/: livechat app icon.png";
import livechatLogo from "@assets/logos and wordmarks/: livechat app logo.png";
import localSeoIcon from "@assets/native icons and favicons/LOCAL SEO_1762239599463.png";
import sendIcon from "@assets/native icons and favicons/: send app icon.png";
import sendLogo from "@assets/logos and wordmarks/: send app logo.png";
import socialMediaIcon from "@assets/native icons and favicons/: content app icon.png";
import contentLogo from "@assets/logos and wordmarks/: content app logo.png";
import listingsIcon from "@assets/listings app_1762804610311.png";
import listingsLogo from "@assets/: listings color triad black and FF0040_1762806224294.png";
import reputationIcon from "@assets/reputation app triad blue and repoutation gold_1762804622669.png";
import reputationLogo from "@assets/: reputation color triad black and D59600_1762806224295.png";
import settingsIcon from "@assets/native icons and favicons/settings.png";
import aiCoachIcon from "@assets/Coach Blue as Blue_1762721690836.png";
import hostsBlueIcon from "@assets/hostsblue assets/Hosts Blue Brandmark.png";
import hostsBlueWordmark from "@assets/hostsblue assets/hostsblue Brand and Wordmark.png";
import swipesBlueIcon from "@assets/swipesblue/swipesblue brandmark.png";
import swipesBlueWordmark from "@assets/swipesblue/swipesblue Brand and Wordmark.png";

interface SideNavProps extends React.HTMLAttributes<HTMLDivElement> {
  activeTab?: string;
  onTabChange?: (tab: string) => void;
  onSignOut?: () => void;
  className?: string;
}

interface NavItem {
  id: string;
  label: string;
  hoverLabel?: string; // Full industry name shown on hover for Commverse apps
  icon: React.ReactNode;
  logo?: string; // For branded app logos
  badge?: number;
  external?: boolean;
  href?: string;
  isDivider?: boolean;
  isHeading?: boolean; // Non-clickable section heading
  hasSpaceBefore?: boolean;
}

export function SideNav({ activeTab = "listings", onTabChange, onSignOut, className, ...props }: SideNavProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [, setLocation] = useLocation();

  const navItems: NavItem[] = [
    { 
      id: "inbox", 
      label: "inbox",
      hoverLabel: "Unified Communications",
      icon: <img src={inboxIcon} alt="/inbox" className="w-7 h-7 object-contain" />,
      logo: inboxLogo,
      external: true, 
      href: "/inbox"
    },
    { 
      id: "livechat", 
      label: "livechat",
      hoverLabel: "Live Chat Widget",
      icon: <img src={livechatIcon} alt="/livechat" className="w-7 h-7 object-contain" />,
      logo: livechatLogo,
      external: true, 
      href: "/livechat" 
    },
    { 
      id: "tasks", 
      label: "Tasks", 
      icon: <CheckSquare className="w-7 h-7" /> 
    },
    { 
      id: "divider-1", 
      label: "", 
      icon: null, 
      isDivider: true 
    },
    { 
      id: "send", 
      label: "send",
      hoverLabel: "Email + SMS Marketing",
      icon: <img src={sendIcon} alt="/send" className="w-7 h-7 object-contain" />,
      logo: sendLogo,
      external: true,
      href: "/send"
    },
    { 
      id: "content", 
      label: "content",
      hoverLabel: "Social Media Management",
      icon: <img src={socialMediaIcon} alt="/content" className="w-7 h-7 object-contain" />,
      logo: contentLogo,
      external: true,
      href: "/content"
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
      id: "listings", 
      label: "listings",
      hoverLabel: "Directory Sync & Consistency",
      icon: <img src={listingsIcon} alt="/listings" className="w-7 h-7 object-contain" />,
      logo: listingsLogo,
      external: true,
      href: "/listings"
    },
    { 
      id: "reputation", 
      label: "reputation",
      hoverLabel: "Review Response & Reputation Management",
      icon: <img src={reputationIcon} alt="/reputation" className="w-7 h-7 object-contain" />,
      logo: reputationLogo,
      external: true,
      href: "/reputation"
    },
    { 
      id: "divider-3", 
      label: "", 
      icon: null, 
      isDivider: true 
    },
    { 
      id: "ai-coach", 
      label: "AI Coach Blue",
      icon: <img src={aiCoachIcon} alt="AI Coach Blue" className="w-7 h-7 object-contain" />,
      external: true,
      href: "/ai-coach"
    },
    { 
      id: "settings", 
      label: "Settings", 
      icon: <img src={settingsIcon} alt="Settings" className="w-7 h-7 object-contain" /> 
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
      icon: <img src={hostsBlueIcon} alt="HostsBlue" className="w-7 h-7 object-contain" />,
      logo: hostsBlueWordmark,
      external: true,
      href: "https://hostsblue.com"
    },
    { 
      id: "swipesblue", 
      label: "swipesblue",
      icon: <img src={swipesBlueIcon} alt="SwipesBlue" className="w-7 h-7 object-contain" />,
      logo: swipesBlueWordmark,
      external: true,
      href: "https://swipesblue.com"
    },
  ];

  const handleNavClick = (item: NavItem, closeMobile: boolean = false) => {
    if (closeMobile) {
      setIsMobileOpen(false);
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
            <div key={item.id} className="py-4">
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
        return (
          <button
            key={item.id}
            onClick={() => handleNavClick(item, isMobile)}
            className={cn(
              "w-full flex items-center gap-3 px-4 rounded-lg transition-all duration-200 text-left group",
              isMobile ? "h-14" : "h-11",
              activeTab === item.id 
                ? "bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/20 text-blue-600 dark:text-blue-400 font-semibold shadow-sm" 
                : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:shadow-sm",
              item.hasSpaceBefore ? "mt-4" : ""
            )}
            title={item.hoverLabel || undefined}
            data-testid={`nav-item-${item.id}`}
          >
            <span className={cn(
              "flex-shrink-0 transition-transform duration-200",
              activeTab === item.id ? "scale-110" : "group-hover:scale-105"
            )}>
              {item.icon}
            </span>
            {!collapsed && (
              item.logo ? (
                <img src={item.logo} alt={item.label} className="flex-1 h-7 object-contain object-left" data-testid={`logo-nav-${item.id}`} />
              ) : (
                <span className="flex-1 text-base leading-7" data-testid={`text-nav-${item.id}`}>
                  {item.label}
                </span>
              )
            )}
            {!collapsed && item.badge && (
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
