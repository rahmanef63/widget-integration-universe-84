
import React from 'react';
import { WidgetLayoutProps } from '../../types';
import DashboardLayout from '@/slices/dashboard/components/DashboardLayout/DashboardLayout';
import DashboardHeader from '@/slices/dashboard/components/DashboardHeader/DashboardHeader';

const WidgetLayout: React.FC<WidgetLayoutProps> = ({ children }) => {
  return (
    <DashboardLayout>
      <DashboardHeader
        title="My Widgets"
        subtitle="Manage your installed widgets and configurations"
      />
      {children}
    </DashboardLayout>
  );
};

export default WidgetLayout;
