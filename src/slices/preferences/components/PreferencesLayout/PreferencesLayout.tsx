
import React from 'react';
import { PreferencesLayoutProps } from '../../types';
import DashboardLayout from '@/slices/dashboard/components/DashboardLayout/DashboardLayout';
import DashboardHeader from '@/slices/dashboard/components/DashboardHeader/DashboardHeader';

const PreferencesLayout: React.FC<PreferencesLayoutProps> = ({ children }) => {
  return (
    <DashboardLayout>
      <DashboardHeader
        title="Preferences"
        subtitle="Customize your dashboard experience"
      />
      {children}
    </DashboardLayout>
  );
};

export default PreferencesLayout;
