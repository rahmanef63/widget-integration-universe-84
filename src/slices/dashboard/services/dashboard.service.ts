
import { DashboardSidebarSectionProps, DashboardSidebarItemProps } from '../types';
import { SupabaseDashboard, SupabaseMenuItem, SupabaseMenuSection } from '../types/supabase';

// Mock dashboards data
const mockDashboards: SupabaseDashboard[] = [
  {
    id: '1',
    name: 'Main Dashboard',
    description: 'Primary dashboard with overview of all systems',
    icon: 'Layout',
    created_at: '2023-01-01T00:00:00.000Z',
    updated_at: '2023-01-01T00:00:00.000Z',
    user_id: 'user-1',
    is_default: true,
  },
  {
    id: '2',
    name: 'Analytics Dashboard',
    description: 'Detailed analytics and reporting',
    icon: 'BarChart',
    created_at: '2023-01-02T00:00:00.000Z',
    updated_at: '2023-01-02T00:00:00.000Z',
    user_id: 'user-1',
    is_default: false,
  },
  {
    id: '3',
    name: 'Project Dashboard',
    description: 'Manage your projects and tasks',
    icon: 'FolderKanban',
    created_at: '2023-01-03T00:00:00.000Z',
    updated_at: '2023-01-03T00:00:00.000Z',
    user_id: 'user-1',
    is_default: false,
  }
];

// Mock menu sections data - this would come from your database
const mockMenuSections: DashboardSidebarSectionProps[] = [
  {
    title: 'Main',
    items: [
      {
        id: '1-1',
        label: 'Overview',
        icon: 'Home',
        path: '/dashboard',
        is_label: false,
        is_switch: false,
        parent_id: null,
        children: [],
      },
      {
        id: '1-2',
        label: 'Analytics',
        icon: 'BarChart2',
        path: '/dashboard/analytics',
        is_label: false,
        is_switch: false,
        parent_id: null,
        children: [],
      },
      {
        id: '1-3',
        label: 'Widgets',
        icon: 'Grid',
        path: '/dashboard/widgets',
        is_label: false,
        is_switch: false,
        parent_id: null,
        children: [],
      }
    ]
  },
  {
    title: 'Content',
    items: [
      {
        id: '2-1',
        label: 'Widget Store',
        icon: 'ShoppingBag',
        path: '/dashboard/store',
        is_label: false,
        is_switch: false,
        parent_id: null,
        children: [],
      },
      {
        id: '2-2',
        label: 'Integrations',
        icon: 'Plug',
        path: '/dashboard/integrations',
        is_label: false,
        is_switch: false,
        parent_id: null,
        children: [],
      }
    ]
  },
  {
    title: 'Settings',
    items: [
      {
        id: '3-1',
        label: 'Profile',
        icon: 'User',
        path: '/dashboard/profile',
        is_label: false,
        is_switch: false,
        parent_id: null,
        children: [],
      },
      {
        id: '3-2',
        label: 'Preferences',
        icon: 'Settings',
        path: '/dashboard/preferences',
        is_label: false,
        is_switch: false,
        parent_id: null,
        children: [],
      },
      {
        id: '3-3',
        label: 'Support',
        icon: 'LifeBuoy',
        path: '/dashboard/support',
        is_label: false,
        is_switch: false,
        parent_id: null,
        children: [],
      },
      {
        id: '3-4',
        label: 'Developer Tools',
        icon: 'Terminal',
        path: '/dashboard/devtools',
        is_label: false,
        is_switch: false,
        parent_id: null,
        children: [],
      }
    ]
  }
];

// Fetch dashboards from the API
export const fetchDashboards = async (): Promise<SupabaseDashboard[]> => {
  // This would be a real API call to Supabase
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockDashboards), 800);
  });
};

// Fetch a specific dashboard by ID
export const fetchDashboardById = async (dashboardId: string): Promise<SupabaseDashboard | null> => {
  // This would be a real API call to Supabase
  return new Promise((resolve) => {
    setTimeout(() => {
      const dashboard = mockDashboards.find(d => d.id === dashboardId);
      resolve(dashboard || null);
    }, 500);
  });
};

// Organize menu items by sections
export const organizeMenuItemsBySections = async (dashboardId: string): Promise<DashboardSidebarSectionProps[]> => {
  // In a real application, this would fetch from Supabase
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockMenuSections), 600);
  });
};

// Build menu tree - avoiding recursive type issues
export const buildMenuTree = (menuSections: DashboardSidebarSectionProps[]): DashboardSidebarSectionProps[] => {
  // Just return the sections as they are
  return menuSections;
};
