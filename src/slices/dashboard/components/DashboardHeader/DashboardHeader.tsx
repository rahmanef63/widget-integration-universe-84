
import React from 'react';
import { DashboardHeaderProps } from '../../types';
import { cn } from '@/lib/utils';

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ 
  title, 
  subtitle, 
  actions, 
  className 
}) => {
  return (
    <header className={cn("flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6", className)}>
      <div>
        <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
        {subtitle && <p className="text-muted-foreground">{subtitle}</p>}
      </div>
      
      {actions && (
        <div className="flex items-center gap-2">
          {actions}
        </div>
      )}
    </header>
  );
};

export default DashboardHeader;
