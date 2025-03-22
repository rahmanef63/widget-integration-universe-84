
import React from 'react';
import { AnalyticsLayoutProps } from '../../types';
import DashboardLayout from '@/slices/dashboard/components/DashboardLayout/DashboardLayout';
import DashboardHeader from '@/slices/dashboard/components/DashboardHeader/DashboardHeader';

const AnalyticsLayout: React.FC<AnalyticsLayoutProps> = ({ children }) => {
  return (
    <DashboardLayout>
      <DashboardHeader
        title="Analytics"
        subtitle="Track your widget performance and user engagement"
      />
      {children}
    </DashboardLayout>
  );
};

export default AnalyticsLayout;
