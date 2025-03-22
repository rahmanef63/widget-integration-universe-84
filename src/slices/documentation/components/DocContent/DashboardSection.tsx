
import React from 'react';
import DocCodeBlock from '../DocCodeBlock/DocCodeBlock';
import { Badge } from '@/components/ui/badge';

interface DashboardSectionProps {
  inView: boolean;
  widgetLoaderCode: string;
}

const DashboardSection: React.FC<DashboardSectionProps> = ({ inView, widgetLoaderCode }) => {
  return (
    <section id="dashboard-integration" className="scroll-mt-24">
      <div>
        <h2 className="text-2xl md:text-3xl font-display font-medium mb-6 pb-2 border-b">
          Dashboard Integration
          <Badge variant="outline" className="ml-3 text-xs">Updated</Badge>
        </h2>
        
        <div id="dashboard-integration-widget-loader" className="mb-8 scroll-mt-24">
          <h3 className="text-xl font-medium mb-4">Widget Loader</h3>
          <p className="mb-4 text-muted-foreground">
            The Widget Loader is a React component that dynamically loads widgets from the store and renders them in the dashboard. It handles metadata fetching, error boundaries, and loading states.
          </p>
          
          <DocCodeBlock code={widgetLoaderCode} />
          
          <p className="text-muted-foreground">
            The loader provides a consistent loading experience while fetching widget assets and ensures that errors in one widget don't crash the entire application.
          </p>
        </div>

        <div id="dashboard-integration-sidebar" className="mb-8 scroll-mt-24">
          <h3 className="text-xl font-medium mb-4">Dashboard Sidebar</h3>
          <p className="mb-4 text-muted-foreground">
            The Dashboard Sidebar is implemented using shadcn components and provides navigation between different dashboard sections. It's fully responsive and collapsible, improving the user experience on different devices.
          </p>
          
          <p className="text-muted-foreground">
            The sidebar is designed following the vertical slice architecture, with all components, hooks, and utilities properly organized into their respective directories.
          </p>
        </div>

        <div id="dashboard-integration-sandboxing" className="mb-8 scroll-mt-24">
          <h3 className="text-xl font-medium mb-4">Sandboxing</h3>
          <p className="mb-4 text-muted-foreground">
            Each widget runs in an isolated environment to prevent widgets from interfering with each other or with the main application. This is implemented using iframe sandboxing and Web Workers.
          </p>
        </div>
      </div>
    </section>
  );
};

export default DashboardSection;
