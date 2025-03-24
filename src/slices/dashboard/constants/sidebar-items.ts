
import { DashboardSidebarSectionProps } from '../types';

export const DASHBOARD_SIDEBAR_SECTIONS: DashboardSidebarSectionProps[] = [
  {
    title: 'Overview',
    items: [
      {
        id: 'dashboard-overview',
        icon: 'LayoutDashboard',
        label: 'Dashboard',
        path: '/dashboard',
        is_label: false,
        is_switch: false,
        parent_id: null
      },
      {
        id: 'dashboard-analytics',
        icon: 'BarChart',
        label: 'Analytics',
        path: '/dashboard/analytics',
        badge: 'New',
        is_label: false,
        is_switch: false,
        parent_id: null
      },
    ],
  },
  {
    title: 'Widget Management',
    items: [
      {
        id: 'dashboard-widgets',
        icon: 'Layers',
        label: 'My Widgets',
        path: '/dashboard/widgets',
        is_label: false,
        is_switch: false,
        parent_id: null
      },
      {
        id: 'dashboard-store',
        icon: 'ShoppingBag',
        label: 'Widget Store',
        path: '/dashboard/store',
        is_label: false,
        is_switch: false,
        parent_id: null
      },
      {
        id: 'dashboard-integrations',
        icon: 'PuzzlePiece',
        label: 'Integrations',
        path: '/dashboard/integrations',
        badge: 3,
        is_label: false,
        is_switch: false,
        parent_id: null
      },
    ],
  },
  {
    title: 'Settings',
    items: [
      {
        id: 'dashboard-profile',
        icon: 'UserCircle',
        label: 'Profile',
        path: '/dashboard/profile',
        is_label: false,
        is_switch: false,
        parent_id: null
      },
      {
        id: 'dashboard-preferences',
        icon: 'Settings',
        label: 'Preferences',
        path: '/dashboard/preferences',
        is_label: false,
        is_switch: false,
        parent_id: null
      },
      {
        id: 'dashboard-support',
        icon: 'HelpCircle',
        label: 'Support',
        path: '/dashboard/support',
        is_label: false,
        is_switch: false,
        parent_id: null
      },
    ],
  },
];
