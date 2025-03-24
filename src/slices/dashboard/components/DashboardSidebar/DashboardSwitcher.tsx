
"use client"

import React, { useState } from 'react';
import { ChevronsUpDown, Plus } from "lucide-react";
import { SupabaseDashboard } from '../../types/supabase';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { renderIcon } from '@/shared/icon-picker/utils';

interface DashboardSwitcherProps {
  dashboards: SupabaseDashboard[];
  currentDashboard: SupabaseDashboard | null;
  onSwitchDashboard: (dashboardId: string) => void;
}

const DashboardSwitcher: React.FC<DashboardSwitcherProps> = ({
  dashboards,
  currentDashboard,
  onSwitchDashboard
}) => {
  const { isMobile } = useSidebar();

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                {currentDashboard?.icon ? (
                  renderIcon(currentDashboard.icon, { className: "size-4" })
                ) : (
                  renderIcon("Layout", { className: "size-4" })
                )}
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">
                  {currentDashboard?.name || "Dashboard"}
                </span>
                <span className="truncate text-xs">
                  {currentDashboard?.description || "Select a dashboard"}
                </span>
              </div>
              <ChevronsUpDown className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            align="start"
            side={isMobile ? "bottom" : "right"}
            sideOffset={4}
          >
            <DropdownMenuLabel className="text-xs text-muted-foreground">
              Dashboards
            </DropdownMenuLabel>
            {dashboards.map((dashboard, index) => (
              <DropdownMenuItem
                key={dashboard.id}
                onClick={() => onSwitchDashboard(dashboard.id)}
                className="gap-2 p-2"
              >
                <div className="flex size-6 items-center justify-center rounded-sm border">
                  {dashboard.icon ? (
                    renderIcon(dashboard.icon, { className: "size-4 shrink-0" })
                  ) : (
                    renderIcon("Layout", { className: "size-4 shrink-0" })
                  )}
                </div>
                {dashboard.name}
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem className="gap-2 p-2">
              <div className="flex size-6 items-center justify-center rounded-md border bg-background">
                <Plus className="size-4" />
              </div>
              <div className="font-medium text-muted-foreground">Add dashboard</div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};

export default DashboardSwitcher;
