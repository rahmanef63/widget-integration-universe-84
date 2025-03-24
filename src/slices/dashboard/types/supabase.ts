
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

export interface SupabaseMenuItem {
  id: string;
  menu_id: string;
  label: string;
  path: string;
  icon: string;
  badge?: string | null;
  badge_variant?: string | null;
  order_position: number;
  created_at: string | null;
  updated_at: string | null;
}

export interface DashboardContextState {
  currentDashboard: SupabaseDashboard | null;
  dashboards: SupabaseDashboard[];
  menuSections: DashboardSidebarSectionProps[];
  isLoading: boolean;
  error: string | null;
  switchDashboard: (dashboardId: string) => void;
}
