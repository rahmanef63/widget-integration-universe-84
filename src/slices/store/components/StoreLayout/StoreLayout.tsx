
import React from 'react';
import { StoreLayoutProps } from '../../types';
import DashboardLayout from '@/slices/dashboard/components/DashboardLayout/DashboardLayout';
import DashboardHeader from '@/slices/dashboard/components/DashboardHeader/DashboardHeader';

const StoreLayout: React.FC<StoreLayoutProps> = ({ children }) => {
  return (
    <DashboardLayout>
      <DashboardHeader
        title="Widget Store"
        subtitle="Browse and install widgets for your dashboard"
      />
      {children}
    </DashboardLayout>
  );
};

export default StoreLayout;
