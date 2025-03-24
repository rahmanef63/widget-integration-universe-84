
import { supabase } from '@/integrations/supabase/client';
import { 
  SupabaseDashboard, 
  SupabaseDashboardMenu, 
  SupabaseMenuItem,
  SidebarItem
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
export const fetchMenuItems = async (menuId: string): Promise<SidebarItem[]> => {
  const { data, error } = await supabase
    .from('menu_items')
    .select('*')
    .eq('menu_id', menuId)
    .order('id');
  
  if (error) {
    console.error('Error fetching menu items:', error);
    throw error;
  }
  
  // Map the data from the database schema to our sidebar item structure
  // Using explicit type annotation to avoid recursive type instantiation
  const sidebarItems: SidebarItem[] = data.map(item => ({
    id: item.id,
    label: item.name, // Map name to label for sidebar display
    path: item.path || '#', // Default path to # if null
    icon: item.icon || 'Circle', // Default icon if null
    badge: null, // Default badge
    badge_variant: null, // Default badge variant
    isActive: false, // Default active state
    is_label: item.is_label,
    is_switch: item.is_switch,
    parent_id: item.parent_id,
    children: [] // Initialize with empty children array
  }));
  
  return sidebarItems;
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
      
      // Process items to handle parent-child relationships
      const topLevelItems = menuItems.filter(item => !item.parent_id);
      const childItems = menuItems.filter(item => item.parent_id);
      
      // Add children to their parent items - avoid mutating the original items directly
      const processedItems = topLevelItems.map(item => {
        const children = childItems.filter(child => child.parent_id === item.id);
        if (children.length > 0) {
          return { ...item, children };
        }
        return item;
      });
      
      if (processedItems.length > 0) {
        sections.push({
          title: menu.title,
          items: processedItems
        });
      }
    }
    
    return sections;
  } catch (error) {
    console.error('Error organizing menu items by sections:', error);
    return [];
  }
};
