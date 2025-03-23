
import React from 'react';
import DashboardLayout from '../components/DashboardLayout/DashboardLayout';
import DashboardContent from '../components/DashboardContent/DashboardContent';
import DashboardHeader from '../components/DashboardHeader/DashboardHeader';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useDashboard } from '../contexts/dashboard.context';
import { renderIcon } from '@/shared/icon-picker/utils';

const Dashboard: React.FC = () => {
  const { currentDashboard } = useDashboard();
  
  return (
    <DashboardLayout>
      <DashboardHeader
        title={currentDashboard?.name || "Dashboard"}
        subtitle={currentDashboard?.description || "Manage your widgets and monitor your dashboard."}
        actions={
          <Button size="sm">
            <Plus className="mr-1 h-4 w-4" />
            Add Widget
          </Button>
        }
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Dashboard content will go here */}
        <div className="border rounded-lg p-4 h-40 flex items-center justify-center bg-card">
          <div className="flex flex-col items-center gap-2">
            {currentDashboard?.icon && renderIcon(currentDashboard.icon, { size: 24 })}
            <span>Dashboard ID: {currentDashboard?.id}</span>
          </div>
        </div>
        <div className="border rounded-lg p-4 h-40 flex items-center justify-center bg-card">
          Sample Widget
        </div>
        <div className="border rounded-lg p-4 h-40 flex items-center justify-center bg-card">
          Sample Widget
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
