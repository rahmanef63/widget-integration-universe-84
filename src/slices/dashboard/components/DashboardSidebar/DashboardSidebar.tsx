
import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { renderIcon } from '@/shared/icon-picker/utils';
import { DashboardSidebarProps } from '../../types';
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
} from '@/components/ui/sidebar';

const DashboardSidebar: React.FC<DashboardSidebarProps> = ({
  sections,
  activePath = '',
  onNavigate,
  children,
}) => {
  const handleNavigation = (path: string) => {
    if (onNavigate) {
      onNavigate(path);
    }
  };

  return (
    <Sidebar>
      <SidebarHeader className="flex items-center justify-center py-4">
        <h1 className="text-xl font-bold">Widget Universe</h1>
      </SidebarHeader>
      
      <SidebarContent>
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
                        className={cn(
                          "flex items-center gap-2",
                          activePath === item.path && "font-medium"
                        )}
                      >
                        {renderIcon(item.icon, { size: 20 })}
                        <span>{item.label}</span>
                      </Link>
                    </SidebarMenuButton>
                    
                    {item.badge && (
                      <SidebarMenuBadge>
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
