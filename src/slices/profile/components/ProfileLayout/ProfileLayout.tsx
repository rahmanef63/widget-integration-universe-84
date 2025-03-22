
import React from 'react';
import { ProfileLayoutProps } from '../../types';
import DashboardLayout from '@/slices/dashboard/components/DashboardLayout/DashboardLayout';
import DashboardHeader from '@/slices/dashboard/components/DashboardHeader/DashboardHeader';

const ProfileLayout: React.FC<ProfileLayoutProps> = ({ children }) => {
  return (
    <DashboardLayout>
      <DashboardHeader
        title="Profile"
        subtitle="Manage your account settings and preferences"
      />
      {children}
    </DashboardLayout>
  );
};

export default ProfileLayout;
