
import { DashboardSidebarSectionProps } from '../types';

export const DASHBOARD_SIDEBAR_SECTIONS: DashboardSidebarSectionProps[] = [
  {
    title: 'Overview',
    items: [
      {
        icon: 'LayoutDashboard',
        label: 'Dashboard',
        path: '/dashboard',
      },
      {
        icon: 'BarChart',
        label: 'Analytics',
        path: '/dashboard/analytics',
        badge: 'New',
      },
    ],
  },
  {
    title: 'Widget Management',
    items: [
      {
        icon: 'Layers',
        label: 'My Widgets',
        path: '/dashboard/widgets',
      },
      {
        icon: 'ShoppingBag',
        label: 'Widget Store',
        path: '/dashboard/store',
      },
      {
        icon: 'PuzzlePiece',
        label: 'Integrations',
        path: '/dashboard/integrations',
        badge: 3,
      },
    ],
  },
  {
    title: 'Settings',
    items: [
      {
        icon: 'UserCircle',
        label: 'Profile',
        path: '/dashboard/profile',
      },
      {
        icon: 'Settings',
        label: 'Preferences',
        path: '/dashboard/preferences',
      },
      {
        icon: 'HelpCircle',
        label: 'Support',
        path: '/dashboard/support',
      },
    ],
  },
];
