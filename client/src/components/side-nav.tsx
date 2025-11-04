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
  Star,
  Settings
} from "lucide-react";
import { cn } from "@/lib/utils";
import bbIcon from "@assets/Blueprint_Avatar.png";
import inboxIcon from "@assets/Inbox_1762239599463.png";
import livechatIcon from "@assets/livechat icon_1762239599463.png";
import localSeoIcon from "@assets/LOCAL SEO_1762239599463.png";
import sendIcon from "@assets/send app_1762239599464.png";
import socialMediaIcon from "@assets/content_1762239599461.png";
import aiCoachIcon from "@assets/AI Business Coach Blue_1762239599460.png";
import hostsBlueIcon from "@assets/Hosts Blue Brandmark.png";
import swipesBlueIcon from "@assets/swipesblue brandmark.png";

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
      external: true, 
      href: "/inbox"
    },
    { 
      id: "livechat", 
      label: "livechat",
      hoverLabel: "Live Chat Widget",
      icon: <img src={livechatIcon} alt="/livechat" className="w-7 h-7 object-contain" />,
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
      id: "listings", 
      label: "Local SEO Mgmt", 
      icon: <img src={localSeoIcon} alt="Local SEO" className="w-7 h-7 object-contain" /> 
    },
    { 
      id: "send", 
      label: "send",
      hoverLabel: "Email + SMS Marketing",
      icon: <img src={sendIcon} alt="/send" className="w-7 h-7 object-contain" />,
      external: true,
      href: "/send"
    },
    { 
      id: "content", 
      label: "content",
      hoverLabel: "Social Media Management",
      icon: <img src={socialMediaIcon} alt="/content" className="w-7 h-7 object-contain" />,
      external: true,
      href: "/content"
    },
    { 
      id: "reputation", 
      label: "Reputation Mgmt", 
      icon: <Star className="w-7 h-7" /> 
    },
    { 
      id: "divider-2", 
      label: "", 
      icon: null, 
      isDivider: true 
    },
    { 
      id: "ai-coach", 
      label: "AI Business Coach",
      icon: <img src={aiCoachIcon} alt="AI Business Coach" className="w-7 h-7 object-contain" />,
      external: true,
      href: "/ai-coach"
    },
    { 
      id: "settings", 
      label: "Settings", 
      icon: <Settings className="w-7 h-7" /> 
    },
  ];

  const handleNavClick = (item: NavItem, closeMobile: boolean = false) => {
    if (closeMobile) {
      setIsMobileOpen(false);
    }
    
    if (item.external && item.href) {
      setLocation(item.href);
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
        
        // Render regular nav item
        return (
          <button
            key={item.id}
            onClick={() => handleNavClick(item, isMobile)}
            className={cn(
              "w-full flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-200 text-left group",
              activeTab === item.id 
                ? "bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/20 text-blue-600 dark:text-blue-400 font-semibold shadow-sm" 
                : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:shadow-sm",
              isMobile ? "py-4" : "",
              item.hasSpaceBefore ? "mt-4" : ""
            )}
            title={item.hoverLabel || undefined}
            data-testid={`nav-item-${item.id}`}
          >
            <span className={cn(
              "transition-transform duration-200",
              activeTab === item.id ? "scale-110" : "group-hover:scale-105"
            )}>
              {item.icon}
            </span>
            {!collapsed && (
              (item.id === "inbox" || item.id === "livechat" || item.id === "send" || item.id === "content") ? (
                <span className="flex-1 text-base font-['Archivo']" style={{ fontWeight: 600 }} data-testid={`text-nav-${item.id}`}>
                  <span style={{ color: '#09080E' }}>/</span>
                  <span style={{ color: item.id === 'send' ? '#FFD700' : item.id === 'inbox' ? '#0080FF' : item.id === 'content' ? '#E91EBC' : '#8000FF' }}>{item.label}</span>
                </span>
              ) : (
                <span className="flex-1 text-base" data-testid={`text-nav-${item.id}`}>
                  {item.label}
                </span>
              )
            )}
            {!collapsed && item.badge && (
              <span className="bg-red-500 text-white text-xs font-semibold rounded-full px-2.5 py-1 shadow-sm" data-testid={`badge-${item.id}`}>
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
              src={bbIcon} 
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
          <div className="p-4 border-t border-gray-200 dark:border-gray-700 space-y-2 bg-gray-50 dark:bg-gray-800/50">
            {/* Platform Links */}
            <div className="space-y-2 pb-3 border-b border-gray-200 dark:border-gray-700">
              <a
                href="https://hostsblue.com"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsMobileOpen(false)}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 text-left hover:bg-purple-50 dark:hover:bg-purple-900/20"
                data-testid="link-hostsblue-mobile"
              >
                <img src={hostsBlueIcon} alt="Hosts Blue" className="w-7 h-7 object-contain" />
                <span className="text-base" style={{ fontFamily: 'Archivo', fontWeight: 600 }} data-testid="text-hostsblue-mobile">
                  <span style={{ color: '#660099', fontFamily: '"Archivo Semi Expanded", sans-serif' }}>hosts</span>
                  <span style={{ color: '#0000FF' }}>blue</span>
                  <span style={{ color: '#84D71A' }}>.com</span>
                </span>
              </a>
              <a
                href="https://swipesblue.com"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsMobileOpen(false)}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 text-left hover:bg-red-50 dark:hover:bg-red-900/20"
                data-testid="link-swipesblue-mobile"
              >
                <img src={swipesBlueIcon} alt="Swipes Blue" className="w-7 h-7 object-contain" />
                <span className="text-base" style={{ fontFamily: 'Archivo', fontWeight: 600 }} data-testid="text-swipesblue-mobile">
                  <span style={{ color: '#FF0040', fontFamily: '"Archivo Semi Expanded", sans-serif' }}>swipes</span>
                  <span style={{ color: '#0000FF' }}>blue</span>
                  <span style={{ color: '#84D71A' }}>.com</span>
                </span>
              </a>
            </div>

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
              <img 
                src={bbIcon} 
                alt="businessblueprint.io" 
                style={{ height: '36px', width: 'auto' }}
                className="object-contain" 
                data-testid={isCollapsed ? "logo-icon" : "logo-desktop"} 
              />
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
        <div className="p-3 border-t border-gray-200 dark:border-gray-700 space-y-2">
          {/* Platform Links */}
          <div className="space-y-1 pb-2 border-b border-gray-200 dark:border-gray-700">
            <a
              href="https://hostsblue.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center gap-1 px-3 py-3 rounded-lg transition-colors text-left hover:bg-purple-50 dark:hover:bg-purple-900/20"
              data-testid="link-hostsblue"
            >
              <img src={hostsBlueIcon} alt="Hosts Blue" className="w-7 h-7 object-contain" />
              {!isCollapsed && (
                <span className="text-base" style={{ fontFamily: 'Archivo', fontWeight: 600 }} data-testid="text-hostsblue">
                  <span style={{ color: '#660099', fontFamily: '"Archivo Semi Expanded", sans-serif' }}>hosts</span>
                  <span style={{ color: '#0000FF' }}>blue</span>
                  <span style={{ color: '#84D71A' }}>.com</span>
                </span>
              )}
            </a>
            <a
              href="https://swipesblue.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center gap-1 px-3 py-3 rounded-lg transition-colors text-left hover:bg-red-50 dark:hover:bg-red-900/20"
              data-testid="link-swipesblue"
            >
              <img src={swipesBlueIcon} alt="Swipes Blue" className="w-7 h-7 object-contain" />
              {!isCollapsed && (
                <span className="text-base" style={{ fontFamily: 'Archivo', fontWeight: 600 }} data-testid="text-swipesblue">
                  <span style={{ color: '#FF0040', fontFamily: '"Archivo Semi Expanded", sans-serif' }}>swipes</span>
                  <span style={{ color: '#0000FF' }}>blue</span>
                  <span style={{ color: '#84D71A' }}>.com</span>
                </span>
              )}
            </a>
          </div>

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
