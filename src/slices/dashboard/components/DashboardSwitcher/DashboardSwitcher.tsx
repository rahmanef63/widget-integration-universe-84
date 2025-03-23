
import React from 'react';
import { Check, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { renderIcon } from '@/shared/icon-picker/utils';
import { SupabaseDashboard } from '../../types/supabase';

interface DashboardSwitcherProps {
  currentDashboard: SupabaseDashboard | null;
  dashboards: SupabaseDashboard[];
  onDashboardSwitch: (dashboardId: string) => void;
  className?: string;
}

const DashboardSwitcher: React.FC<DashboardSwitcherProps> = ({
  currentDashboard,
  dashboards,
  onDashboardSwitch,
  className,
}) => {
  if (!currentDashboard) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className={cn(
            "w-full justify-between",
            className
          )}
        >
          <div className="flex items-center gap-2">
            {renderIcon(currentDashboard.icon, { size: 16 })}
            <span className="truncate">{currentDashboard.name}</span>
          </div>
          <ChevronDown className="h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-[200px]">
        {dashboards.map((dashboard) => (
          <DropdownMenuItem
            key={dashboard.id}
            onClick={() => onDashboardSwitch(dashboard.id)}
            className="flex items-center justify-between"
          >
            <div className="flex items-center gap-2">
              {renderIcon(dashboard.icon, { size: 16 })}
              <span>{dashboard.name}</span>
            </div>
            {currentDashboard.id === dashboard.id && (
              <Check className="h-4 w-4" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DashboardSwitcher;
