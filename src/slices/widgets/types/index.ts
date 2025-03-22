
import { ReactNode } from 'react';

export interface WidgetLayoutProps {
  children: ReactNode;
}

export interface Widget {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: string;
  author: string;
  version: string;
  createdAt: string;
  updatedAt: string;
  status: 'active' | 'inactive' | 'draft';
}

export interface WidgetCardProps {
  widget: Widget;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  onActivate?: (id: string) => void;
}

export interface WidgetGridProps {
  widgets: Widget[];
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  onActivate?: (id: string) => void;
}
