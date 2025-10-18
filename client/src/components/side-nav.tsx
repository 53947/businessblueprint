import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { 
  LayoutDashboard, 
  MapPin, 
  Star, 
  Megaphone, 
  CheckSquare,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  User,
  MessageSquare,
  Share2,
  MessageCircle,
  Menu,
  X
} from "lucide-react";
import { cn } from "@/lib/utils";
import bbIcon from "@assets/businessblueprintio icon all version_1759854019511.png";
import bbLogo from "@assets/Business Blueprint Logo and-or Icon All Versions_1759854008066.png";

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
  badge?: number;
  external?: boolean;
  href?: string;
}

export function SideNav({ activeTab = "overview", onTabChange, onSignOut, className, ...props }: SideNavProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [, setLocation] = useLocation();

  const navItems: NavItem[] = [
    { id: "overview", label: "Overview", icon: <LayoutDashboard className="w-5 h-5" /> },
    { id: "campaigns", label: "Campaigns", icon: <Megaphone className="w-5 h-5" /> },
    { id: "listings", label: "Listings", icon: <MapPin className="w-5 h-5" /> },
    { id: "social", label: "Social Media", icon: <Share2 className="w-5 h-5" /> },
    { id: "reviews", label: "Reviews", icon: <Star className="w-5 h-5" /> },
    { id: "inbox", label: "Inbox", icon: <MessageSquare className="w-5 h-5" />, external: true, href: "/inbox-app" },
    { id: "livechat", label: "Live Chat", icon: <MessageCircle className="w-5 h-5" />, external: true, href: "/livechat-demo" },
    { id: "tasks", label: "Tasks", icon: <CheckSquare className="w-5 h-5" /> },
  ];

  const settingsItems: NavItem[] = [
    { id: "settings", label: "Settings", icon: <Settings className="w-5 h-5" /> },
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
      {items.map((item) => (
        <button
          key={item.id}
          onClick={() => handleNavClick(item, isMobile)}
          className={cn(
            "w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 text-left group",
            activeTab === item.id 
              ? "bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/20 text-blue-600 dark:text-blue-400 font-semibold shadow-sm" 
              : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:shadow-sm",
            isMobile ? "py-4" : ""
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
            <span className="flex-1 text-base" data-testid={`text-nav-${item.id}`}>
              {item.label}
            </span>
          )}
          {!collapsed && item.badge && (
            <span className="bg-red-500 text-white text-xs font-semibold rounded-full px-2.5 py-1 shadow-sm" data-testid={`badge-${item.id}`}>
              {item.badge}
            </span>
          )}
        </button>
      ))}
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
            <div className="flex items-center gap-3">
              <img src={bbIcon} alt="businessblueprint.io" className="h-12 w-12 object-contain" data-testid="logo-icon-mobile" />
              <img src={bbLogo} alt="businessblueprint.io" className="h-8 object-contain" data-testid="logo-text-mobile" />
            </div>
          </SheetHeader>

          {/* Mobile Navigation Items */}
          <nav className="flex-1 p-4 space-y-2 overflow-y-auto" data-testid="nav-items-mobile">
            {renderNavItems(navItems, false, true)}
            
            {/* Divider */}
            <div className="py-2">
              <div className="border-t border-gray-200 dark:border-gray-700"></div>
            </div>
            
            {/* Settings Section */}
            {renderNavItems(settingsItems, false, true)}
          </nav>

          {/* Mobile Bottom Section */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-700 space-y-2 bg-gray-50 dark:bg-gray-800/50">
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
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setLocation('/portal')}>
            <img src={bbIcon} alt="businessblueprint.io" className="h-10 w-10 object-contain" data-testid="logo-icon" />
            {!isCollapsed && (
              <img src={bbLogo} alt="businessblueprint.io" className="h-7 object-contain" data-testid="logo-text" />
            )}
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="ml-auto hover:bg-gray-100 dark:hover:bg-gray-800"
            data-testid="button-toggle-nav"
            aria-label={isCollapsed ? "Expand navigation" : "Collapse navigation"}
            aria-expanded={!isCollapsed}
          >
            {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </Button>
        </div>

        {/* Desktop Navigation Items */}
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto" data-testid="nav-items">
          {renderNavItems(navItems, isCollapsed)}
          
          {/* Divider */}
          <div className="py-2">
            <div className="border-t border-gray-200 dark:border-gray-700"></div>
          </div>
          
          {/* Settings Section */}
          {renderNavItems(settingsItems, isCollapsed)}
        </nav>

        {/* Desktop Bottom Section */}
        <div className="p-3 border-t border-gray-200 dark:border-gray-700 space-y-1">
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
