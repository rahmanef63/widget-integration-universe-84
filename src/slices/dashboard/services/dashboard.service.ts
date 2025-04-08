
import { supabase } from '@/integrations/supabase/client';
import { 
  SupabaseDashboard, 
  SupabaseDashboardMenu, 
  SidebarItem,
  SidebarItemBase
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
 * Uses a non-recursive approach to avoid TypeScript depth errors
 */
export const fetchMenuItems = async (menuId: string): Promise<SidebarItem[]> => {
  // Fetch all items for this menu
  const { data, error } = await supabase
    .from('menu_items')
    .select('*')
    .eq('menu_id', menuId)
    .order('id');
  
  if (error) {
    console.error('Error fetching menu items:', error);
    throw error;
  }
  
  // Create a map to store items by ID for quick lookup
  const itemMap = new Map<string, SidebarItem>();
  
  // First pass: Create all items without children relationships
  data.forEach(item => {
    const sidebarItem: SidebarItem = {
      id: item.id,
      label: item.name,
      path: item.path || '#',
      icon: item.icon || 'Circle',
      badge: null,
      badge_variant: null,
      isActive: false,
      is_label: item.is_label,
      is_switch: item.is_switch,
      parent_id: item.parent_id,
      children: [] // Initialize with empty array
    };
    
    itemMap.set(item.id, sidebarItem);
  });
  
  // Second pass: Build the hierarchy
  const rootItems: SidebarItem[] = [];
  
  // Process each item and establish parent-child relationships
  itemMap.forEach(item => {
    if (!item.parent_id) {
      // This is a root item
      rootItems.push(item);
    } else {
      // This is a child item - find its parent and add it as a child
      const parent = itemMap.get(item.parent_id);
      if (parent) {
        parent.children.push(item);
      } else {
        // If parent not found for some reason, add to root
        rootItems.push(item);
      }
    }
  });
  
  return rootItems;
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
          items: menuItems
        });
      }
    }
    
    return sections;
  } catch (error) {
    console.error('Error organizing menu items by sections:', error);
    return [];
  }
};
