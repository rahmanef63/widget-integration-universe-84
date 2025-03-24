
import { supabase } from '@/integrations/supabase/client';
import { 
  SupabaseDashboard, 
  SupabaseDashboardMenu, 
  SupabaseMenuItem 
} from '../types/supabase';
import { DashboardSidebarSectionProps } from '../types';

/**
 * Fetch all dashboards from the database
 */
export const fetchDashboards = async (): Promise<SupabaseDashboard[]> => {
  const { data, error } = await supabase
    .from('dashboards')
    .select('*')
    .order('name');
  
  if (error) {
    console.error('Error fetching dashboards:', error);
    throw error;
  }
  
  return data as SupabaseDashboard[];
};

/**
 * Fetch a specific dashboard by ID
 */
export const fetchDashboardById = async (id: string): Promise<SupabaseDashboard | null> => {
  const { data, error } = await supabase
    .from('dashboards')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) {
    if (error.code === 'PGRST116') { // No rows returned
      return null;
    }
    console.error('Error fetching dashboard by ID:', error);
    throw error;
  }
  
  return data as SupabaseDashboard;
};

/**
 * Fetch dashboard menus for a specific dashboard
 */
export const fetchDashboardMenus = async (dashboardId: string): Promise<SupabaseDashboardMenu[]> => {
  const { data, error } = await supabase
    .from('dashboard_menus')
    .select('*')
    .eq('dashboard_id', dashboardId)
    .order('order_position');
  
  if (error) {
    console.error('Error fetching dashboard menus:', error);
    throw error;
  }
  
  return data as SupabaseDashboardMenu[];
};

/**
 * Fetch menu items for a specific menu
 */
export const fetchMenuItems = async (menuId: string): Promise<SupabaseMenuItem[]> => {
  const { data, error } = await supabase
    .from('menu_items')
    .select('*')
    .eq('menu_id', menuId)
    .order('order_position');
  
  if (error) {
    console.error('Error fetching menu items:', error);
    throw error;
  }
  
  // Transform the data to match our expected type structure if needed
  // This maps database fields to our TypeScript interface
  const transformedData = data.map(item => ({
    id: item.id,
    menu_id: item.menu_id,
    label: item.label,
    path: item.path,
    icon: item.icon,
    badge: item.badge,
    badge_variant: item.badge_variant,
    order_position: item.order_position,
    created_at: item.created_at,
    updated_at: item.updated_at
  }));
  
  return transformedData;
};

/**
 * Organize menu items by sections to create sidebar navigation
 */
export const organizeMenuItemsBySections = async (
  dashboardId: string
): Promise<DashboardSidebarSectionProps[]> => {
  try {
    // Fetch all menus for this dashboard
    const menus = await fetchDashboardMenus(dashboardId);
    
    // Build sections array
    const sections: DashboardSidebarSectionProps[] = [];
    
    // For each menu, fetch its items and add to sections
    for (const menu of menus) {
      const menuItems = await fetchMenuItems(menu.id);
      
      if (menuItems.length > 0) {
        sections.push({
          title: menu.title,
          items: menuItems.map(item => ({
            label: item.label,
            path: item.path,
            icon: item.icon,
            badge: item.badge,
            badge_variant: item.badge_variant
          }))
        });
      }
    }
    
    return sections;
  } catch (error) {
    console.error('Error organizing menu items by sections:', error);
    return [];
  }
};
