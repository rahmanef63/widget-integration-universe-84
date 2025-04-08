
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  SidebarGroup, 
  SidebarGroupLabel, 
  SidebarMenu, 
  SidebarMenuItem, 
  SidebarMenuButton 
} from '@/components/ui/sidebar';
import { renderIcon } from '@/shared/icon-picker/utils';
import { fetchWorkshops } from '@/slices/workshops/services/workshop.service';
import { Workshop } from '@/slices/workshops/types';
import { Progress } from '@/components/ui/progress';

const WorkshopsNav: React.FC = () => {
  const [workshops, setWorkshops] = useState<Workshop[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadWorkshops = async () => {
      try {
        const data = await fetchWorkshops();
        setWorkshops(data);
      } catch (error) {
        console.error('Error loading workshops:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadWorkshops();
  }, []);

  // Get progress color based on percentage
  const getProgressColor = (progress: number): string => {
    if (progress < 30) return 'bg-red-500';
    if (progress < 70) return 'bg-yellow-500';
    return 'bg-emerald-500';
  };

  if (isLoading) {
    return (
      <SidebarGroup>
        <SidebarGroupLabel>Workshops</SidebarGroupLabel>
        <div className="px-2 py-1">
          <div className="animate-pulse space-y-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-8 bg-muted rounded"></div>
            ))}
          </div>
        </div>
      </SidebarGroup>
    );
  }

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Workshops</SidebarGroupLabel>
      <SidebarMenu>
        {workshops.map((workshop) => (
          <SidebarMenuItem key={workshop.id}>
            <SidebarMenuButton asChild tooltip={`${workshop.name} (${workshop.progress}%)`}>
              <Link to={workshop.path} className="flex flex-col gap-1.5">
                <div className="flex items-center gap-2">
                  {workshop.icon && renderIcon(workshop.icon, { className: "size-4" })}
                  <span>{workshop.name}</span>
                </div>
                <Progress 
                  value={workshop.progress} 
                  className="h-1.5" 
                  indicatorClassName={getProgressColor(workshop.progress)}
                />
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
};

export default WorkshopsNav;
