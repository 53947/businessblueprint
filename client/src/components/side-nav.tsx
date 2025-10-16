import { useState } from "react";
import { Button } from "@/components/ui/button";
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
  MessageCircle
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

  const navItems: NavItem[] = [
    { id: "inbox", label: "Inbox", icon: <MessageSquare className="w-5 h-5" />, external: true, href: "/inbox-app" },
    { id: "tasks", label: "Tasks", icon: <CheckSquare className="w-5 h-5" /> },
    { id: "overview", label: "Overview", icon: <LayoutDashboard className="w-5 h-5" /> },
    { id: "listings", label: "Listings", icon: <MapPin className="w-5 h-5" /> },
    { id: "reviews", label: "Reviews", icon: <Star className="w-5 h-5" /> },
    { id: "campaigns", label: "Campaigns", icon: <Megaphone className="w-5 h-5" /> },
    { id: "social", label: "Social Media", icon: <Share2 className="w-5 h-5" /> },
    { id: "livechat", label: "Live Chat", icon: <MessageCircle className="w-5 h-5" />, external: true, href: "/livechat-demo" },
  ];

  const handleNavClick = (item: NavItem) => {
    if (item.external && item.href) {
      // Navigate to external page
      window.location.href = item.href;
    } else if (onTabChange) {
      onTabChange(item.id);
    }
  };

  return (
    <div 
      className={cn(
        "bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 h-screen flex flex-col transition-all duration-300",
        isCollapsed ? "w-20" : "w-64",
        className
      )}
      {...props}
    >
      {/* Logo Header */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
        <a href="/" className="flex items-center gap-3">
          <img src={bbIcon} alt="businessblueprint.io" className="h-10 w-10 object-contain" data-testid="logo-icon" />
          {!isCollapsed && (
            <img src={bbLogo} alt="businessblueprint.io" className="h-7 object-contain" data-testid="logo-text" />
          )}
        </a>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="ml-auto"
          data-testid="button-toggle-nav"
          aria-label={isCollapsed ? "Expand navigation" : "Collapse navigation"}
          aria-expanded={!isCollapsed}
        >
          {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </Button>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto" data-testid="nav-items">
        {navItems.map((item, index) => (
          <div key={item.id}>
            <button
              onClick={() => handleNavClick(item)}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-left",
                activeTab === item.id 
                  ? "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-medium" 
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
              )}
              data-testid={`nav-item-${item.id}`}
            >
              {item.icon}
              {!isCollapsed && (
                <span className="flex-1" data-testid={`text-nav-${item.id}`}>{item.label}</span>
              )}
              {!isCollapsed && item.badge && (
                <span className="bg-red-500 text-white text-xs rounded-full px-2 py-0.5" data-testid={`badge-${item.id}`}>
                  {item.badge}
                </span>
              )}
            </button>
            {/* Add double spacing after Tasks (index 1) */}
            {item.id === "tasks" && <div className="h-4"></div>}
          </div>
        ))}
      </nav>

      {/* Bottom Section */}
      <div className="p-3 border-t border-gray-200 dark:border-gray-700 space-y-1">
        {/* Settings button removed until Settings tab content is implemented */}
        
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
  );
}
