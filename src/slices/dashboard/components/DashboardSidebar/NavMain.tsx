
"use client"

import React from 'react';
import { ChevronRight } from "lucide-react";
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
  // Function to render different types of menu items
  const renderMenuItem = (item: any) => {
    // Check if it's a menu label (collapsible group)
    if (item.is_label) {
      return renderMenuLabel(item);
    }
    
    // Check if it's a menu switch
    if (item.is_switch) {
      return renderMenuSwitch(item);
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
  const renderMenuSwitch = (item: any) => (
    <SidebarMenuItem key={item.id}>
      <SidebarMenuButton tooltip={item.label}>
        {item.icon && renderIcon(item.icon)}
        <span>{item.label}</span>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );

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
                  <a href={subItem.path || '#'}>
                    <span>{subItem.label}</span>
                  </a>
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
        <a href={item.path || '#'}>
          {item.icon && renderIcon(item.icon)}
          <span>{item.label}</span>
          {item.badge && (
            <span className="ml-auto bg-primary/10 text-primary text-xs px-2 py-0.5 rounded-full">
              {item.badge}
            </span>
          )}
        </a>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );

  return (
    <>
      {sections.map((section) => (
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
