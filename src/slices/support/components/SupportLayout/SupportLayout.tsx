
import React from 'react';
import { SupportLayoutProps } from '../../types';
import DashboardLayout from '@/slices/dashboard/components/DashboardLayout/DashboardLayout';
import DashboardHeader from '@/slices/dashboard/components/DashboardHeader/DashboardHeader';

const SupportLayout: React.FC<SupportLayoutProps> = ({ children }) => {
  return (
    <DashboardLayout>
      <DashboardHeader
        title="Support"
        subtitle="Get help with the platform and connect with our team"
      />
      {children}
    </DashboardLayout>
  );
};

export default SupportLayout;
