
import { useMemo } from 'react';
import { DashboardSidebarSectionProps } from '../types';

interface DashboardTitle {
  title: string;
  subtitle: string;
}

/**
 * Hook to get the dashboard title and subtitle based on the active path
 */
export const useDashboardTitle = (
  activePath: string,
  sections: DashboardSidebarSectionProps[]
): DashboardTitle => {
  return useMemo(() => {
    // Default values
    let title = 'Dashboard';
    let subtitle = 'Welcome to your dashboard';

    // Find the active item
    for (const section of sections) {
      for (const item of section.items) {
        if (item.path === activePath) {
          title = item.label;
          subtitle = `${section.title} - ${item.label}`;
          return { title, subtitle };
        }
      }
    }

    return { title, subtitle };
  }, [activePath, sections]);
};
