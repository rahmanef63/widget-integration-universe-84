
import { ReactNode } from 'react';

export interface DashboardSidebarItemProps {
  icon: string;
  label: string;
  path: string;
  isActive?: boolean;
  badge?: string | number;
}

export interface DashboardSidebarSectionProps {
  title: string;
  items: DashboardSidebarItemProps[];
}

export interface DashboardSidebarProps {
  sections: DashboardSidebarSectionProps[];
  activePath?: string;
  onNavigate?: (path: string) => void;
  children?: ReactNode;
}

export interface DashboardLayoutProps {
  children: ReactNode;
}

export interface DashboardContentProps {
  children: ReactNode;
  className?: string;
}

export interface DashboardHeaderProps {
  title: string;
  subtitle?: string;
  actions?: ReactNode;
  className?: string;
}
