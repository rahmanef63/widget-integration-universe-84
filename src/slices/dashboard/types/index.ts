
import { ReactNode } from 'react';
import { SupabaseDashboard, SidebarItem } from './supabase';

export interface DashboardSidebarItemProps extends SidebarItem {
  isActive?: boolean;
}

export interface DashboardSidebarSectionProps {
  title: string;
  items: DashboardSidebarItemProps[];
}

export interface DashboardSidebarProps {
  sections?: DashboardSidebarSectionProps[];
  activePath?: string;
  onNavigate?: (path: string) => void;
  children?: ReactNode;
  dashboards?: SupabaseDashboard[];
  currentDashboard?: SupabaseDashboard | null;
  onDashboardSwitch?: (dashboardId: string) => void;
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
