
import { useState, useCallback, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { DASHBOARD_SIDEBAR_SECTIONS } from '../constants/sidebar-items';

export const useDashboardNavigation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activePath, setActivePath] = useState(location.pathname);

  // Update active path when location changes
  useEffect(() => {
    setActivePath(location.pathname);
  }, [location.pathname]);

  // Navigate to the specified path
  const handleNavigation = useCallback((path: string) => {
    setActivePath(path);
    navigate(path);
  }, [navigate]);

  // Get the current section title based on the active path
  const getCurrentSectionTitle = useCallback(() => {
    for (const section of DASHBOARD_SIDEBAR_SECTIONS) {
      const item = section.items.find(item => item.path === activePath);
      if (item) {
        return {
          section: section.title,
          item: item.label
        };
      }
    }
    return {
      section: 'Dashboard',
      item: 'Overview'
    };
  }, [activePath]);

  return {
    activePath,
    handleNavigation,
    getCurrentSectionTitle
  };
};
