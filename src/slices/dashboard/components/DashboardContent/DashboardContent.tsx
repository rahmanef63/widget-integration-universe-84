
import React from 'react';
import { DashboardContentProps } from '../../types';
import { cn } from '@/lib/utils';

const DashboardContent: React.FC<DashboardContentProps> = ({ children, className }) => {
  return (
    <main className={cn("p-4 space-y-6", className)}>
      {children}
    </main>
  );
};

export default DashboardContent;
