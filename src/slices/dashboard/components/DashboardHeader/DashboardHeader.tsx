
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
    <div className={cn("mb-6", className)}>
      <div className="flex items-center justify-between mb-2">
        <h1 className="text-2xl font-bold">{title}</h1>
        {actions && (
          <div className="flex items-center space-x-2">
            {actions}
          </div>
        )}
      </div>
      {subtitle && (
        <p className="text-muted-foreground">{subtitle}</p>
      )}
    </div>
  );
};

export default DashboardHeader;
