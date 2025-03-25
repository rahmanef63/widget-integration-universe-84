"use client"

import React, { useState } from 'react';
import { ChevronRight } from "lucide-react";
import { Link } from 'react-router-dom';
import { DashboardSidebarSectionProps } from '../../types';

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { renderIcon } from '@/shared/icon-picker/utils';

interface NavMainProps {
  sections: DashboardSidebarSectionProps[];
}

const NavMain: React.FC<NavMainProps> = ({ sections }) => {
  const [activeMenuSwitchId, setActiveMenuSwitchId] = useState<string | null>(null);

  // Function to handle menu switch toggle
  const handleMenuSwitchToggle = (switchId: string) => {
    setActiveMenuSwitchId(prevId => prevId === switchId ? null : switchId);
  };

  // Function to render different types of menu items
  const renderMenuItem = (item: any) => {
    // Check if it's a menu switch
    if (item.is_switch) {
      return renderMenuSwitch(item);
    }
    
    // Check if it's a menu label (collapsible group)
    if (item.is_label) {
      return renderMenuLabel(item);
    }
    
    // Check if it has children (sub-menu items)
    if (item.children && item.children.length > 0) {
      return renderMenuWithSubitems(item);
    }
    
    // Regular menu item
    return renderRegularMenuItem(item);
  };

  // Render a menu label (group header)
  const renderMenuLabel = (item: any) => (
    <SidebarMenuItem key={item.id}>
      <SidebarMenuButton className="font-medium text-sidebar-foreground/70">
        {item.icon && renderIcon(item.icon, { className: "text-sidebar-foreground/70" })}
        <span>{item.label}</span>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );

  // Render a menu switch (for filtering like company-a to company-b)
  const renderMenuSwitch = (item: any) => {
    const isActive = activeMenuSwitchId === item.id;
    
    return (
      <SidebarMenuItem key={item.id}>
        <SidebarMenuButton 
          tooltip={item.label}
          onClick={() => handleMenuSwitchToggle(item.id)}
          className={isActive ? "bg-sidebar-accent text-sidebar-accent-foreground" : ""}
        >
          {item.icon && renderIcon(item.icon)}
          <span>{item.label}</span>
          {isActive && <span className="ml-auto text-xs bg-primary text-primary-foreground px-1.5 py-0.5 rounded-full">Active</span>}
        </SidebarMenuButton>
      </SidebarMenuItem>
    );
  };

  // Render a menu item with subitems (collapsible)
  const renderMenuWithSubitems = (item: any) => (
    <Collapsible
      key={item.id}
      asChild
      defaultOpen={item.isActive}
      className="group/collapsible"
    >
      <SidebarMenuItem>
        <CollapsibleTrigger asChild>
          <SidebarMenuButton tooltip={item.label}>
            {item.icon && renderIcon(item.icon)}
            <span>{item.label}</span>
            <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
          </SidebarMenuButton>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <SidebarMenuSub>
            {item.children?.map((subItem: any) => (
              <SidebarMenuSubItem key={subItem.id}>
                <SidebarMenuSubButton asChild>
                  <Link to={subItem.path || '#'}>
                    <span>{subItem.label}</span>
                  </Link>
                </SidebarMenuSubButton>
              </SidebarMenuSubItem>
            ))}
          </SidebarMenuSub>
        </CollapsibleContent>
      </SidebarMenuItem>
    </Collapsible>
  );

  // Render a regular menu item
  const renderRegularMenuItem = (item: any) => (
    <SidebarMenuItem key={item.id}>
      <SidebarMenuButton asChild tooltip={item.label}>
        <Link to={item.path || '#'}>
          {item.icon && renderIcon(item.icon)}
          <span>{item.label}</span>
          {item.badge && (
            <span className="ml-auto bg-primary/10 text-primary text-xs px-2 py-0.5 rounded-full">
              {item.badge}
            </span>
          )}
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );

  // Filter menu items based on active menu switch
  const filteredSections = React.useMemo(() => {
    if (!activeMenuSwitchId) {
      return sections;
    }

    return sections.map(section => {
      // Find if this section contains the active switch
      const hasActiveSwitch = section.items.some(item => item.id === activeMenuSwitchId);
      
      if (hasActiveSwitch) {
        // If this section has the active switch, keep only that item
        return {
          ...section,
          items: section.items.filter(item => item.id === activeMenuSwitchId)
        };
      } else {
        // Otherwise, filter out any other switches, but keep non-switch items
        return {
          ...section,
          items: section.items.filter(item => !item.is_switch)
        };
      }
    }).filter(section => section.items.length > 0);
  }, [sections, activeMenuSwitchId]);

  return (
    <>
      {filteredSections.map((section) => (
        <SidebarGroup key={section.title}>
          <SidebarGroupLabel>{section.title}</SidebarGroupLabel>
          <SidebarMenu>
            {section.items.map((item) => renderMenuItem(item))}
          </SidebarMenu>
        </SidebarGroup>
      ))}
    </>
  );
};

export default NavMain;
