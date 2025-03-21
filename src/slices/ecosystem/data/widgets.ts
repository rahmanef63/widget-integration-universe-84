
import { Widget } from '../types';

// Mock widget data for the ecosystem showcase
export const mockWidgets: Widget[] = [
  {
    id: 'widget-1',
    title: 'Analytics Dashboard',
    description: 'Real-time data visualization with customizable metrics',
    icon: 'BarChart',
    category: 'Analytics',
    author: 'Data Team',
    version: '1.2.0',
  },
  {
    id: 'widget-2',
    title: 'User Management',
    description: 'Complete user administration with role-based access control',
    icon: 'Users',
    category: 'Administration',
    author: 'Admin Team',
    version: '2.0.1',
  },
  {
    id: 'widget-3',
    title: 'Content Editor',
    description: 'WYSIWYG editor with markdown support and media embedding',
    icon: 'Edit',
    category: 'Content',
    author: 'Publishing Team',
    version: '1.1.3',
  },
  {
    id: 'widget-4',
    title: 'Network Monitor',
    description: 'Monitor network performance and detect anomalies',
    icon: 'Activity',
    category: 'Monitoring',
    author: 'Infrastructure Team',
    version: '1.0.2',
  },
  {
    id: 'widget-5',
    title: 'Calendar Integration',
    description: 'Seamless calendar integration with meeting scheduling',
    icon: 'Calendar',
    category: 'Productivity',
    author: 'Collaboration Team',
    version: '2.1.0',
  },
  {
    id: 'widget-6',
    title: 'Notification Center',
    description: 'Centralized notification management with filtering options',
    icon: 'Bell',
    category: 'Communication',
    author: 'UX Team',
    version: '1.3.1',
  },
];

// Categories for filtering
export const categories = [
  'All Categories',
  'Analytics',
  'Administration',
  'Content',
  'Monitoring',
  'Productivity',
  'Communication',
];
