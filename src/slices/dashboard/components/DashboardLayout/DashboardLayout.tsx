
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { DashboardLayoutProps } from '../../types';
import { DashboardSidebar } from '../';
import { DASHBOARD_SIDEBAR_SECTIONS } from '../../constants/sidebar-items';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { UserCircle } from 'lucide-react';
import { DashboardContent } from '../';
import { DashboardHeader } from '../';

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
        
        <SidebarInset className="p-0">
          <DashboardContent className="p-6">
            <DashboardHeader 
              title="Dashboard" 
              subtitle="Welcome to your dashboard"
            />
            {children}
          </DashboardContent>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;
