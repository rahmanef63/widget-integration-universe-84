
import { ReactNode } from 'react';
import { SupabaseDashboard } from './supabase';

// Base interface without recursive children reference
export interface SidebarItemBase {
  id: string;
  icon?: string;
  label: string;
  path?: string;
  badge?: string | number;
  is_label: boolean;
  is_switch: boolean;
  parent_id: string | null;
}

// Extended interface with children property
export interface DashboardSidebarItemProps extends SidebarItemBase {
  children: DashboardSidebarItemProps[];
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
