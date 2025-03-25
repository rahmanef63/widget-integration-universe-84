
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { DashboardLayoutProps } from '../../types';
import { DashboardSidebar } from '../';
import { SidebarProvider, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { UserCircle } from 'lucide-react';
import { DashboardContent } from '../';
import { useDashboard } from '../../contexts/dashboard.context';
import { Skeleton } from '@/components/ui/skeleton';
import { DashboardHeader } from '../DashboardHeader/DashboardHeader';
import { DashboardBreadcrumb } from '../DashboardBreadcrumb/DashboardBreadcrumb';

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const location = useLocation();
  const [activePath, setActivePath] = useState(location.pathname);
  const { currentDashboard, dashboards, menuSections, isLoading, switchDashboard } = useDashboard();

  const handleNavigation = (path: string) => {
    setActivePath(path);
  };

  // Show loading state while dashboard data is being fetched
  if (isLoading) {
    return (
      <div className="min-h-screen flex w-full">
        <div className="w-64 bg-background border-r">
          <Skeleton className="h-10 w-40 mx-auto my-4" />
          <div className="p-4 space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="space-y-2">
                <Skeleton className="h-5 w-20" />
                <div className="space-y-1">
                  {[1, 2, 3].map((j) => (
                    <Skeleton key={j} className="h-8 w-full" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex-1 p-6">
          <Skeleton className="h-12 w-full max-w-lg" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-40 w-full" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="min-h-screen flex w-full">
        {/* The DashboardSidebar has been updated to get props from context */}
        <DashboardSidebar />
        
        <SidebarInset className="p-0">
          <div className="sticky top-0 z-10 bg-background border-b p-4 flex items-center gap-2">
            <SidebarTrigger />
            <DashboardBreadcrumb />
          </div>
          <DashboardContent className="p-6">
            {children}
          </DashboardContent>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;
