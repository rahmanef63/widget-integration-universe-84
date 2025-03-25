
// SupabaseDashboard represents a dashboard from Supabase
export interface SupabaseDashboard {
  id: string;
  name: string;
  description: string;
  icon?: string; // Optional icon name
  created_at: string;
  updated_at: string;
  user_id: string;
}

// SupabaseMenuItem represents a menu item from Supabase
export interface SupabaseMenuItem {
  id: string;
  label: string;
  icon?: string;
  path?: string;
  parent_id?: string | null;
  section_id?: string;
  dashboard_id?: string;
  order?: number;
}

// SupabaseMenuSection represents a menu section from Supabase
export interface SupabaseMenuSection {
  id: string;
  label: string;
  dashboard_id: string;
  order?: number;
}
