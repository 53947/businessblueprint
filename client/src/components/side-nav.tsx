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
import bbIcon from "@assets/Blueprint Icon_1760810447789.png";
import bbLogo from "@assets/Business Blueprint Logo and-or Icon All Versions_1759854008066.png";
import inboxLogo from "@assets/inbox logo blue_1760788242628.png";
import inboxIcon from "@assets/inbox icon_1760788273855.png";
import livechatLogo from "@assets/livechat logo blue_1760788395985.png";
import livechatIcon from "@assets/livechat icon_1760788412068.png";
import localSeoIcon from "@assets/LOCAL SEO_1760785581174.png";
import sendLogo from "@assets/send logo blue_1760785667220.png";
import sendIcon from "@assets/send1_1760785706637.png";
import socialMediaIcon from "@assets/Social Media Mgmt_1760786453964.png";
import reputationIcon from "@assets/Reputation Management Icon_1760786977607.png";
import settingsIcon from "@assets/settings_1760788009769.png";
import aiCoachIcon from "@assets/AI Business Coach Blue_1760813312010.png";
import hostsBlueIcon from "@assets/Hosts Blue Icon New_1760810493739.png";
import swipesBlueIcon from "@assets/swipesblue icon_1760810511865.png";

interface SideNavProps extends React.HTMLAttributes<HTMLDivElement> {
  activeTab?: string;
  onTabChange?: (tab: string) => void;
  onSignOut?: () => void;
  className?: string;
}

interface NavItem {
  id: string;
  label: string;
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
      icon: <img src={inboxIcon} alt="/inbox" className="w-7 h-7 object-contain" />,
      external: true, 
      href: "/inbox"
    },
    { 
      id: "livechat", 
      label: "livechat",
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
      icon: <img src={sendIcon} alt="/send" className="w-7 h-7 object-contain" />,
      external: true,
      href: "/send"
    },
    { 
      id: "social", 
      label: "Social Media Mgmt", 
      icon: <img src={socialMediaIcon} alt="Social Media" className="w-7 h-7 object-contain" /> 
    },
    { 
      id: "reputation", 
      label: "Reputation Mgmt", 
      icon: <img src={reputationIcon} alt="Reputation" className="w-7 h-7 object-contain" /> 
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
      icon: <img src={settingsIcon} alt="Settings" className="w-7 h-7 object-contain" /> 
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
            data-testid={`nav-item-${item.id}`}
          >
            <span className={cn(
              "transition-transform duration-200",
              activeTab === item.id ? "scale-110" : "group-hover:scale-105"
            )}>
              {item.icon}
            </span>
            {!collapsed && (
              (item.id === "inbox" || item.id === "livechat" || item.id === "send") ? (
                <span className="flex-1 text-base font-['Archivo']" style={{ fontWeight: 600 }} data-testid={`text-nav-${item.id}`}>
                  <span style={{ color: '#84D71A' }}>/</span>
                  <span style={{ color: '#0057FF' }}>{item.label}</span>
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
            <div className="flex items-end gap-1">
              <img src={bbIcon} alt="businessblueprint.io" style={{ width: '36px', height: '36px' }} className="object-contain" data-testid="logo-icon-mobile" />
              <div className="leading-none pb-0.5" style={{ fontSize: '24px', fontWeight: 600 }} data-testid="logo-text-mobile">
                <span style={{ color: '#FFA500', fontFamily: '"Archivo Semi Expanded", sans-serif' }}>business</span>
                <span style={{ color: '#0000FF', fontFamily: 'Archivo, sans-serif' }}>blueprint</span>
                <span style={{ color: '#84D71A', fontFamily: 'Archivo, sans-serif' }}>.io</span>
              </div>
            </div>
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
          <div className="px-4 py-2 flex items-center gap-2 cursor-pointer" onClick={() => { setLocation('/'); }} data-testid="sidebar-logo">
            <img src={bbIcon} alt="businessblueprint.io" style={{ width: '48px', height: '48px' }} className="object-contain flex-shrink-0" data-testid="logo-icon" />
            {!isCollapsed && (
              <div className="leading-none" style={{ fontSize: '18px', fontWeight: 600 }} data-testid="logo-text">
                <div style={{ color: '#FFA500', fontFamily: '"Archivo Semi Expanded", sans-serif', lineHeight: '1.2' }}>business</div>
                <div style={{ color: '#0000FF', fontFamily: 'Archivo, sans-serif', lineHeight: '1.2' }}>blueprint</div>
              </div>
            )}
          </div>
          
          {/* Collapse/Expand Toggle Button */}
          <div className={cn("px-4 pb-2", isCollapsed && "px-2")}>
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => { e.stopPropagation(); setIsCollapsed(!isCollapsed); }}
              className={cn(
                "w-full hover:bg-gray-100 dark:hover:bg-gray-800",
                isCollapsed && "px-2"
              )}
              data-testid="button-toggle-nav"
              aria-label={isCollapsed ? "Expand navigation" : "Collapse navigation"}
              aria-expanded={!isCollapsed}
            >
              {isCollapsed ? (
                <ChevronRight className="w-4 h-4" />
              ) : (
                <>
                  <ChevronLeft className="w-4 h-4 mr-2" />
                  <span className="text-sm">Collapse</span>
                </>
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
