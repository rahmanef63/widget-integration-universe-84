
import React from 'react';
import { IntegrationLayoutProps } from '../../types';
import DashboardLayout from '@/slices/dashboard/components/DashboardLayout/DashboardLayout';
import DashboardHeader from '@/slices/dashboard/components/DashboardHeader/DashboardHeader';

const IntegrationLayout: React.FC<IntegrationLayoutProps> = ({ children }) => {
  return (
    <DashboardLayout>
      <DashboardHeader
        title="Integrations"
        subtitle="Connect your widgets with external services and data sources"
      />
      {children}
    </DashboardLayout>
  );
};

export default IntegrationLayout;
