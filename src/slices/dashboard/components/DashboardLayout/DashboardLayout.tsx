
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { DashboardLayoutProps } from '../../types';
import DashboardSidebar from '../DashboardSidebar/DashboardSidebar';
import { DASHBOARD_SIDEBAR_SECTIONS } from '../../constants/sidebar-items';
import { SidebarProvider, SidebarTrigger, SidebarInset } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { UserCircle } from 'lucide-react';

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const location = useLocation();
  const [activePath, setActivePath] = useState(location.pathname);

  const handleNavigation = (path: string) => {
    setActivePath(path);
  };

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="min-h-screen flex w-full">
        <DashboardSidebar 
          sections={DASHBOARD_SIDEBAR_SECTIONS} 
          activePath={activePath}
          onNavigate={handleNavigation}
        >
          <Button variant="outline" size="sm" className="w-full">
            <UserCircle className="mr-2 h-4 w-4" />
            <span>Account</span>
          </Button>
        </DashboardSidebar>
        
        <SidebarInset className="px-4 py-6">
          <div className="container mx-auto">
            <div className="flex items-center mb-4">
              <SidebarTrigger className="mr-4" />
              <h1 className="text-2xl font-bold">Dashboard</h1>
            </div>
            {children}
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;
