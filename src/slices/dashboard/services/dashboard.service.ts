
import { supabase } from '@/integrations/supabase/client';
import { 
  SupabaseDashboard, 
  SupabaseDashboardMenu, 
  SupabaseMenuItem,
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
  
  // First map raw database items to base items without children
  const baseItems: SidebarItemBase[] = data.map(item => ({
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
  }));
  
  // Build tree using a non-recursive approach
  const itemMap = new Map<string, SidebarItem>();
  const rootItems: SidebarItem[] = [];
  
  // First create all items with empty children arrays
  baseItems.forEach(item => {
    itemMap.set(item.id, {
      ...item,
      children: []
    });
  });
  
  // Then establish parent-child relationships
  baseItems.forEach(item => {
    const itemWithChildren = itemMap.get(item.id)!;
    
    if (!item.parent_id) {
      // Root item
      rootItems.push(itemWithChildren);
    } else {
      // Child item
      const parent = itemMap.get(item.parent_id);
      if (parent) {
        parent.children.push(itemWithChildren);
      } else {
        // If parent not found, treat as root
        rootItems.push(itemWithChildren);
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
