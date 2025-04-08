
import { Workshop } from '../types';

export const WORKSHOPS: Workshop[] = [
  {
    id: 'marketing',
    name: 'Marketing',
    description: 'For super dashboard',
    icon: 'Megaphone',
    progress: 0, // 0% complete
    path: '/workshop/marketing',
    type: 'marketing'
  },
  {
    id: 'developer',
    name: 'Developer',
    description: 'Widget universe',
    icon: 'Code',
    progress: 80, // 80% complete
    path: '/workshop/developer',
    type: 'developer'
  },
  {
    id: 'dashboard',
    name: 'Dashboard',
    description: 'Dashboard workshop',
    icon: 'LayoutDashboard',
    progress: 30, // 30% complete
    path: '/workshop/dashboard',
    type: 'dashboard'
  }
];
