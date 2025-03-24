
"use client"

import React, { useContext } from 'react';
import { DashboardContext } from '../../contexts/dashboard.context';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

import DashboardSwitcher from './DashboardSwitcher';
import NavMain from './NavMain';
import NavProjects from './NavProjects';
import NavUser from './NavUser';

const DashboardSidebar: React.FC = () => {
  const { currentDashboard, dashboards, menuSections, switchDashboard, isLoading } = useContext(DashboardContext)!;

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <DashboardSwitcher 
          dashboards={dashboards}
          currentDashboard={currentDashboard}
          onSwitchDashboard={switchDashboard}
        />
      </SidebarHeader>
      <SidebarContent>
        {isLoading ? (
          // Show skeleton items when loading
          Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="animate-pulse p-2">
              <div className="h-4 w-24 bg-muted rounded mb-3"></div>
              <div className="space-y-2">
                {Array.from({ length: 3 }).map((_, idx) => (
                  <div key={idx} className="h-8 bg-muted rounded"></div>
                ))}
              </div>
            </div>
          ))
        ) : (
          <>
            <NavMain sections={menuSections} />
            <NavProjects />
          </>
        )}
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
};

export default DashboardSidebar;
