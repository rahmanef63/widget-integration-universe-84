
// Supabase Dashboard Type
export interface SupabaseDashboard {
  id: string;
  name: string;
  description?: string;
  icon?: string;
  is_default: boolean;
  created_at: string;
  updated_at?: string;
}

// Supabase Dashboard Menu Type
export interface SupabaseDashboardMenu {
  id: string;
  dashboard_id: string;
  title: string;
  order_position: number;
  created_at: string;
  updated_at?: string;
}

// Supabase Menu Item Type
export interface SupabaseMenuItem {
  id: string;
  menu_id: string;
  name: string;
  path?: string;
  icon?: string;
  parent_id: string | null;
  is_label: boolean;
  is_switch: boolean;
  created_at: string;
  updated_at?: string;
}

// Base interface without recursive children reference
export interface SidebarItemBase {
  id: string;
  label: string;
  path?: string;
  icon?: string;
  badge?: string | number | null;
  badge_variant?: string | null;
  isActive?: boolean;
  is_label: boolean;
  is_switch: boolean;
  parent_id: string | null;
}

// Extended interface with children property
export interface SidebarItem extends SidebarItemBase {
  children: SidebarItem[];
}

// Dashboard Context State Type
export interface DashboardContextState {
  currentDashboard: SupabaseDashboard | null;
  dashboards: SupabaseDashboard[];
  menuSections: any[];
  isLoading: boolean;
  error: string | null;
  switchDashboard: (dashboardId: string) => void;
}
