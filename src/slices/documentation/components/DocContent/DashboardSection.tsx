
import React from 'react';
import { motion } from 'framer-motion';
import DocCodeBlock from '../DocCodeBlock/DocCodeBlock';

interface DashboardSectionProps {
  inView: boolean;
  widgetLoaderCode: string;
}

const DashboardSection: React.FC<DashboardSectionProps> = ({ inView, widgetLoaderCode }) => {
  return (
    <section id="dashboard-integration" className="scroll-mt-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <h2 className="text-2xl md:text-3xl font-display font-medium mb-6 pb-2 border-b">
          Dashboard Integration
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
      </motion.div>
    </section>
  );
};

export default DashboardSection;
