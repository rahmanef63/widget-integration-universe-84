
import { DashboardSidebarSectionProps } from '.';

export interface SupabaseDashboard {
  id: string;
  name: string;
  description: string;
  icon: string;
  created_at: string;
  updated_at: string;
  is_default?: boolean;
}

export interface SupabaseDashboardMenu {
  id: string;
  dashboard_id: string;
  title: string;
  order: number;
  created_at: string;
  updated_at: string;
}

export interface SupabaseMenuItem {
  id: string;
  menu_id: string;
  label: string;
  path: string;
  icon: string;
  badge?: string;
  badge_variant?: string;
  order: number;
  created_at: string;
  updated_at: string;
}

export interface DashboardContextState {
  currentDashboard: SupabaseDashboard | null;
  dashboards: SupabaseDashboard[];
  menuSections: DashboardSidebarSectionProps[];
  isLoading: boolean;
  error: string | null;
  switchDashboard: (dashboardId: string) => void;
}
