
import { ReactNode } from 'react';

export interface Workshop {
  id: string;
  name: string;
  description?: string;
  icon?: string;
  progress: number;
  path: string;
  type: 'marketing' | 'developer' | 'dashboard';
}

export interface WorkshopCardProps {
  workshop: Workshop;
  className?: string;
}

export interface WorkshopListProps {
  workshops: Workshop[];
  className?: string;
}

export interface WorkshopProgressProps {
  progress: number;
  className?: string;
}

export interface WorkshopLayoutProps {
  children: ReactNode;
}
