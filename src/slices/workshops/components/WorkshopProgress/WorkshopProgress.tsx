
import React from 'react';
import { Progress } from '@/components/ui/progress';
import { WorkshopProgressProps } from '../../types';
import { cn } from '@/lib/utils';

const WorkshopProgress: React.FC<WorkshopProgressProps> = ({ progress, className }) => {
  // Determine color based on progress
  const getProgressColor = () => {
    if (progress < 30) return 'bg-red-500';
    if (progress < 70) return 'bg-yellow-500';
    return 'bg-emerald-500';
  };

  return (
    <div className={cn("flex flex-col gap-1", className)}>
      <div className="flex justify-between items-center text-xs text-muted-foreground">
        <span>Progress</span>
        <span className="font-medium">{progress}%</span>
      </div>
      <Progress 
        value={progress} 
        className="h-2"
        indicatorClassName={cn(getProgressColor())} 
      />
    </div>
  );
};

export default WorkshopProgress;
