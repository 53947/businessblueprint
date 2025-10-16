import { Button } from '@/components/ui/button';
import { Home, LucideIcon } from 'lucide-react';
import { useLocation } from 'wouter';

export interface SectionHeaderTab {
  label: string;
  icon?: LucideIcon;
  onClick?: () => void;
  active?: boolean;
  testId?: string;
}

interface SectionHeaderProps {
  title: string;
  tabs?: SectionHeaderTab[];
  actions?: React.ReactNode;
  showHomeButton?: boolean;
  homeRoute?: string;
}

export function SectionHeader({ 
  title, 
  tabs = [], 
  actions, 
  showHomeButton = true,
  homeRoute = '/portal' 
}: SectionHeaderProps) {
  const [, setLocation] = useLocation();

  return (
    <div className="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-[#09080E]">
      <div className="px-6 py-3">
        <div className="flex items-center justify-between mb-3">
          <h1 className="text-xl font-semibold text-[#09080E] dark:text-white" data-testid={`section-header-${title.toLowerCase().replace(/\s+/g, '-')}`}>
            {title}
          </h1>
          <div className="flex items-center gap-2">
            {actions}
            {showHomeButton && (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setLocation(homeRoute)}
                data-testid="button-home"
              >
                <Home className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
        
        {tabs.length > 0 && (
          <div className="flex gap-2 overflow-x-auto pb-1">
            {tabs.map((tab, index) => {
              const Icon = tab.icon;
              return (
                <Button
                  key={index}
                  variant={tab.active ? "default" : "ghost"}
                  size="sm"
                  onClick={tab.onClick}
                  data-testid={tab.testId || `tab-${tab.label.toLowerCase().replace(/\s+/g, '-')}`}
                  className="whitespace-nowrap text-sm"
                >
                  {Icon && <Icon className="h-3 w-3 mr-2" />}
                  {tab.label}
                </Button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
