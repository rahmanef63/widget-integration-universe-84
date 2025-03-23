
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ihzedshfshpgxzatlbpm.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImloemVkc2hmc2hwZ3h6YXRsYnBtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE2MjA2NjQsImV4cCI6MjA1NzE5NjY2NH0.P6a_WA_IOauwRGlAVdekQBAKjbzb8WWESIWnyDmoIfs';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Helper functions for common database operations
export const fetchDashboards = async () => {
  const { data, error } = await supabase.from('dashboards').select('*');
  if (error) {
    console.error('Error fetching dashboards:', error);
    return [];
  }
  return data;
};

export const fetchDashboardMenus = async (dashboardId: string) => {
  const { data, error } = await supabase
    .from('dashboard_menus')
    .select('*')
    .eq('dashboard_id', dashboardId);
  
  if (error) {
    console.error('Error fetching dashboard menus:', error);
    return [];
  }
  return data;
};

export const fetchAllMenuItems = async () => {
  const { data, error } = await supabase
    .from('menu_items')
    .select('*')
    .order('order');
  
  if (error) {
    console.error('Error fetching menu items:', error);
    return [];
  }
  return data;
};
