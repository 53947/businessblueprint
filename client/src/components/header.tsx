import { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  User, 
  Settings, 
  LogOut, 
  Menu,
  X,
  BarChart3,
  Users,
  FileText,
  Star,
  Bell
} from "lucide-react";
import cloudpleaserLogo from "@assets/cloudpleaser_1758744493180.png";
import aiCoachLogo from "@assets/AI Coach_1758744493179.png";

interface HeaderProps {
  showNavigation?: boolean;
}

export function Header({ showNavigation = false }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigationItems = [
    { name: "Dashboard", icon: BarChart3, href: "/dashboard" },
    { name: "Reports", icon: FileText, href: "/reports" },
    { name: "Reviews", icon: Star, href: "/reviews" },
    { name: "Campaigns", icon: Users, href: "/campaigns" },
    { name: "AI Coach", icon: () => <img src={aiCoachLogo} alt="AI Coach" className="w-4 h-4" />, href: "/ai-coach" },
  ];

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <img src={cloudpleaserLogo} alt="cloudpleaser.io" className="w-8 h-8" />
              <div className="flex items-baseline">
                <span className="text-xl font-bold text-black">cloud</span>
                <span className="text-xl font-bold text-blue-600">pleaser</span>
                <span className="text-lg font-medium text-green-400">.io</span>
              </div>
            </div>
            
            {showNavigation && (
              <>
                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center space-x-6 ml-8">
                  {navigationItems.map((item) => {
                    const IconComponent = item.icon;
                    return (
                      <a
                        key={item.name}
                        href={item.href}
                        className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                      >
                        <IconComponent className="w-4 h-4" />
                        <span>{item.name}</span>
                      </a>
                    );
                  })}
                </nav>

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
              {navigationItems.map((item) => {
                const IconComponent = item.icon;
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    className="flex items-center space-x-3 px-4 py-3 text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <IconComponent className="w-5 h-5" />
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