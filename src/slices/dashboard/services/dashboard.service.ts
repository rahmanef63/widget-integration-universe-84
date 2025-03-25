
import { MenuSection, MenuItem, SubMenuItem } from '../types';
import { SupabaseDashboard } from '../types/supabase';

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
  },
  {
    id: '2',
    name: 'Analytics Dashboard',
    description: 'Detailed analytics and reporting',
    icon: 'BarChart',
    created_at: '2023-01-02T00:00:00.000Z',
    updated_at: '2023-01-02T00:00:00.000Z',
    user_id: 'user-1',
  },
  {
    id: '3',
    name: 'Project Dashboard',
    description: 'Manage your projects and tasks',
    icon: 'FolderKanban',
    created_at: '2023-01-03T00:00:00.000Z',
    updated_at: '2023-01-03T00:00:00.000Z',
    user_id: 'user-1',
  }
];

// Mock menu sections data - this would come from your database
const mockMenuSections: MenuSection[] = [
  {
    id: '1',
    label: 'Main',
    items: [
      {
        id: '1-1',
        label: 'Overview',
        icon: 'Home',
        path: '/dashboard',
      },
      {
        id: '1-2',
        label: 'Analytics',
        icon: 'BarChart2',
        path: '/dashboard/analytics',
      },
      {
        id: '1-3',
        label: 'Widgets',
        icon: 'Grid',
        path: '/dashboard/widgets',
      }
    ]
  },
  {
    id: '2',
    label: 'Content',
    items: [
      {
        id: '2-1',
        label: 'Widget Store',
        icon: 'ShoppingBag',
        path: '/dashboard/store',
      },
      {
        id: '2-2',
        label: 'Integrations',
        icon: 'Plug',
        path: '/dashboard/integrations',
      }
    ]
  },
  {
    id: '3',
    label: 'Settings',
    items: [
      {
        id: '3-1',
        label: 'Profile',
        icon: 'User',
        path: '/dashboard/profile',
      },
      {
        id: '3-2',
        label: 'Preferences',
        icon: 'Settings',
        path: '/dashboard/preferences',
      },
      {
        id: '3-3',
        label: 'Support',
        icon: 'LifeBuoy',
        path: '/dashboard/support',
      },
      {
        id: '3-4',
        label: 'Developer Tools',
        icon: 'Terminal',
        path: '/dashboard/devtools',
      }
    ]
  }
];

// Breaking the recursive type by simplifying the buildMenuTree function
export const fetchDashboards = async (): Promise<SupabaseDashboard[]> => {
  // This would be a real API call to Supabase
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockDashboards), 800);
  });
};

export const fetchMenuSections = async (): Promise<MenuSection[]> => {
  // This would be a real API call to Supabase
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockMenuSections), 800);
  });
};

// Simplified function to avoid recursive type issues
export const buildMenuTree = (menuSections: MenuSection[]): MenuSection[] => {
  // Just return the sections as they are for now to avoid the infinite type error
  return menuSections;
};
