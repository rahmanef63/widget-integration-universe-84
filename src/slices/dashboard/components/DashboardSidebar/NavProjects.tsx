
"use client"

import React from 'react';
import { Link } from 'react-router-dom';
import {
  BarChart,
  LayoutDashboard,
  Layers,
  ShoppingBag,
  Puzzle,
  UserCircle,
  Settings,
  HelpCircle,
  Code,
  MoreHorizontal,
  Forward,
  Trash2,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

// Static menu items based on the provided routes
const staticProjects = [
  {
    id: 'dashboard',
    name: 'Dashboard',
    path: '/dashboard',
    icon: <LayoutDashboard size={16} />,
  },
  {
    id: 'analytics',
    name: 'Analytics',
    path: '/dashboard/analytics',
    icon: <BarChart size={16} />,
  },
  {
    id: 'widgets',
    name: 'My Widgets',
    path: '/dashboard/widgets',
    icon: <Layers size={16} />,
  },
  {
    id: 'store',
    name: 'Widget Store',
    path: '/dashboard/store',
    icon: <ShoppingBag size={16} />,
  },
  {
    id: 'integrations',
    name: 'Integrations',
    path: '/dashboard/integrations',
    icon: <Puzzle size={16} />,
  },
  {
    id: 'profile',
    name: 'Profile',
    path: '/dashboard/profile',
    icon: <UserCircle size={16} />,
  },
  {
    id: 'preferences',
    name: 'Preferences',
    path: '/dashboard/preferences',
    icon: <Settings size={16} />,
  },
  {
    id: 'support',
    name: 'Support',
    path: '/dashboard/support',
    icon: <HelpCircle size={16} />,
  },
  {
    id: 'devtools',
    name: 'DevTools',
    path: '/dashboard/devtools',
    icon: <Code size={16} />,
  },
];

export function NavProjects() {
  const { isMobile } = useSidebar();

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden flex-1">
      <SidebarGroupLabel>Navigation</SidebarGroupLabel>
      <SidebarMenu>
        {staticProjects.map((item) => (
          <SidebarMenuItem key={item.id}>
            <SidebarMenuButton asChild>
              <Link to={item.path}>
                {item.icon}
                <span>{item.name}</span>
              </Link>
            </SidebarMenuButton>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuAction showOnHover>
                  <MoreHorizontal size={16} />
                  <span className="sr-only">More</span>
                </SidebarMenuAction>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-48 rounded-lg"
                side={isMobile ? "bottom" : "right"}
                align={isMobile ? "end" : "start"}
              >
                <DropdownMenuItem>
                  <Forward className="text-muted-foreground mr-2 h-4 w-4" />
                  <span>Share Link</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Trash2 className="text-muted-foreground mr-2 h-4 w-4" />
                  <span>Remove from Sidebar</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
};

export default NavProjects;
