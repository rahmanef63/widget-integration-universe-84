
import { DashboardSidebarSectionProps } from '.';

export interface SupabaseDashboard {
  id: string;
  name: string;
  description: string | null;
  icon: string | null;
  created_at: string | null;
  updated_at: string | null;
  is_default?: boolean;
}

export interface SupabaseDashboardMenu {
  id: string;
  dashboard_id: string;
  title: string;
  order_position: number;
  created_at: string | null;
  updated_at: string | null;
}

// Updated to match the actual database schema for menu items
export interface SupabaseMenuItem {
  id: string;
  dashboard_id: string | null;
  name: string;
  path: string | null;
  icon: string | null;
  is_label: boolean;
  is_switch: boolean;
  parent_id: string | null;
  permissions: string[];
  description: string | null;
  created_at: string | null;
}

export interface DashboardContextState {
  currentDashboard: SupabaseDashboard | null;
  dashboards: SupabaseDashboard[];
  menuSections: DashboardSidebarSectionProps[];
  isLoading: boolean;
  error: string | null;
  switchDashboard: (dashboardId: string) => void;
}
