
import React from 'react';
import { DashboardLayout } from '@/slices/dashboard/components';
import { WorkshopLayoutProps } from '../../types';

const WorkshopLayout: React.FC<WorkshopLayoutProps> = ({ children }) => {
  return (
    <DashboardLayout>
      <div className="container mx-auto py-6">
        {children}
      </div>
    </DashboardLayout>
  );
};

export default WorkshopLayout;
