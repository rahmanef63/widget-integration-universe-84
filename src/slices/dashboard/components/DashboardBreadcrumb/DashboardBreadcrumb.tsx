
import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useDashboard } from '../../contexts/dashboard.context';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Home } from 'lucide-react';

export const DashboardBreadcrumb: React.FC = () => {
  const location = useLocation();
  const { currentDashboard, menuSections } = useDashboard();
  
  // Function to find the active menu item based on the current path
  const findActiveMenuItem = () => {
    if (!menuSections || !location.pathname) return null;
    
    // Flatten all items to search through them
    const flattenItems = (items: any[]) => {
      return items.reduce((acc: any[], item) => {
        if (item.children && item.children.length > 0) {
          return [...acc, item, ...flattenItems(item.children)];
        }
        return [...acc, item];
      }, []);
    };

    // Search through all sections
    for (const section of menuSections) {
      const allItems = flattenItems(section.items);
      const activeItem = allItems.find(item => item.path === location.pathname);
      if (activeItem) {
        return { item: activeItem, section };
      }
    }
    
    return null;
  };

  const activeMenuItem = findActiveMenuItem();

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link to="/">
              <Home className="h-4 w-4" />
            </Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />

        {currentDashboard && (
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="/">
                {currentDashboard.name}
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
        )}

        {activeMenuItem && (
          <>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="#">
                  {activeMenuItem.section.title}
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>
                {activeMenuItem.item.label}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </>
        )}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default DashboardBreadcrumb;
