
import React from 'react';
import { motion } from 'framer-motion';
import DocCodeBlock from '../DocCodeBlock/DocCodeBlock';
import { API_REFERENCE_CONTENT } from '../../constants/content';

interface ApiReferenceSectionProps {
  inView: boolean;
  widgetApiCode: string;
}

const ApiReferenceSection: React.FC<ApiReferenceSectionProps> = ({ 
  inView,
  widgetApiCode 
}) => {
  const { title, sections } = API_REFERENCE_CONTENT;
  
  return (
    <section id="api" className="scroll-mt-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.5, delay: 0.7 }}
      >
        <h2 className="text-2xl md:text-3xl font-display font-medium mb-6 pb-2 border-b">
          {title}
        </h2>
        
        <div id="widget-api" className="mb-8 scroll-mt-24">
          <h3 className="text-xl font-medium mb-4">{sections.widgetApi.title}</h3>
          <p className="mb-4 text-muted-foreground">
            {sections.widgetApi.description}
          </p>
          
          <DocCodeBlock 
            code={widgetApiCode}
            className="mb-6"
          />
          
          <div className="space-y-3 text-muted-foreground">
            <p>Key API components include:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Lifecycle Methods:</strong> Initialize, mount, update, and unmount events.</li>
              <li><strong>Data Access:</strong> Methods for accessing and modifying widget data.</li>
              <li><strong>UI Integration:</strong> Tools for integrating with the host application UI.</li>
              <li><strong>Event System:</strong> Subscribe to and publish events within the platform.</li>
              <li><strong>Context Access:</strong> Access information about the current user, theme, and environment.</li>
            </ul>
          </div>
        </div>
        
        <div id="store-api-ref" className="mb-8 scroll-mt-24">
          <h3 className="text-xl font-medium mb-4">{sections.storeApi.title}</h3>
          <p className="mb-4 text-muted-foreground">
            {sections.storeApi.description}
          </p>
          <div className="space-y-3 text-muted-foreground">
            <p>Store API endpoints include:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Widget Discovery:</strong> Search, filter, and browse available widgets.</li>
              <li><strong>Widget Installation:</strong> Install, update, and remove widgets.</li>
              <li><strong>Dependency Management:</strong> Resolve and manage widget dependencies.</li>
              <li><strong>Version Control:</strong> Manage widget versions and updates.</li>
              <li><strong>Authorization:</strong> Manage access and permissions for widgets.</li>
            </ul>
            <div className="p-4 bg-muted rounded-lg my-4">
              <code className="text-sm">
                {`// Example Store API request
const response = await widgetStore.search({
  category: "analytics",
  tags: ["dashboard", "metrics"],
  compatible: true
});`}
              </code>
            </div>
          </div>
        </div>
        
        <div id="dashboard-api" className="scroll-mt-24">
          <h3 className="text-xl font-medium mb-4">{sections.dashboardApi.title}</h3>
          <p className="mb-4 text-muted-foreground">
            {sections.dashboardApi.description}
          </p>
          <div className="space-y-3 text-muted-foreground">
            <p>Dashboard API features include:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Layout Management:</strong> Control widget positioning and sizing.</li>
              <li><strong>Widget Communication:</strong> Enable secure communication between widgets.</li>
              <li><strong>State Persistence:</strong> Save and restore dashboard state.</li>
              <li><strong>User Preferences:</strong> Manage per-user dashboard configurations.</li>
              <li><strong>Export/Import:</strong> Share dashboard configurations across environments.</li>
            </ul>
            <div className="p-4 bg-muted rounded-lg my-4">
              <code className="text-sm">
                {`// Example Dashboard API usage
dashboard.addWidget({
  id: "analytics-chart",
  position: { x: 0, y: 0, w: 2, h: 2 },
  config: {
    dataSource: "sales-metrics",
    refreshInterval: 60000
  }
});`}
              </code>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default ApiReferenceSection;
