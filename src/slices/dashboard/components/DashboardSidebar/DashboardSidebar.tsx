
import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { renderIcon } from '@/shared/icon-picker/utils';
import { DashboardSidebarProps } from '../../types';
import { DashboardSwitcher } from '../';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuItem,
  SidebarMenuButton,
  useSidebar,
} from '@/components/ui/sidebar';

const DashboardSidebar: React.FC<DashboardSidebarProps> = ({
  sections,
  activePath = '',
  onNavigate,
  children,
  dashboards = [],
  currentDashboard = null,
  onDashboardSwitch,
}) => {
  const { state } = useSidebar();
  const isCollapsed = state === 'collapsed';
  
  const handleNavigation = (path: string) => {
    if (onNavigate) {
      onNavigate(path);
    }
  };

  return (
    <Sidebar>
      <SidebarHeader className="flex items-center justify-center py-4">
        <h1 className={cn(
          "transition-all duration-200 font-bold",
          isCollapsed ? "text-md" : "text-xl"
        )}>
          {isCollapsed ? "WU" : "Widget Universe"}
        </h1>
      </SidebarHeader>
      
      <SidebarContent>
        {/* Dashboard Switcher */}
        {dashboards.length > 0 && currentDashboard && onDashboardSwitch && (
          <div className="px-3 py-2">
            <DashboardSwitcher
              currentDashboard={currentDashboard}
              dashboards={dashboards}
              onDashboardSwitch={onDashboardSwitch}
            />
          </div>
        )}
        
        {sections.map((section, index) => (
          <SidebarGroup key={`section-${index}`}>
            <SidebarGroupLabel>{section.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {section.items.map((item, itemIndex) => (
                  <SidebarMenuItem key={`item-${itemIndex}`}>
                    <SidebarMenuButton 
                      asChild 
                      isActive={activePath === item.path}
                      tooltip={item.label}
                    >
                      <Link 
                        to={item.path} 
                        onClick={() => handleNavigation(item.path)}
                        className="flex items-center gap-2"
                      >
                        {renderIcon(item.icon, { size: 20 })}
                        <span>{item.label}</span>
                      </Link>
                    </SidebarMenuButton>
                    
                    {item.badge && (
                      <SidebarMenuBadge className={item.badge_variant ? `bg-${item.badge_variant}-500` : undefined}>
                        {item.badge}
                      </SidebarMenuBadge>
                    )}
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      
      <SidebarFooter className="p-4">
        {children}
      </SidebarFooter>
    </Sidebar>
  );
};

export default DashboardSidebar;
