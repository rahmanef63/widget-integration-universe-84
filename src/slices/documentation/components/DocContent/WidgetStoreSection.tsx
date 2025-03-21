
import React from 'react';
import { motion } from 'framer-motion';
import DocCodeBlock from '../DocCodeBlock/DocCodeBlock';

interface WidgetStoreSectionProps {
  inView: boolean;
  metadataCode: string;
}

const WidgetStoreSection: React.FC<WidgetStoreSectionProps> = ({ 
  inView,
  metadataCode 
}) => {
  return (
    <section id="widget-store" className="scroll-mt-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <h2 className="text-2xl md:text-3xl font-display font-medium mb-6 pb-2 border-b">
          Widget Store
        </h2>
        
        <div id="publishing-widgets" className="mb-8 scroll-mt-24">
          <h3 className="text-xl font-medium mb-4">Publishing Widgets</h3>
          <p className="mb-4 text-muted-foreground">
            Once you've developed and tested your widget, you can publish it to the Widget Store
            to make it available to all platform users.
          </p>
          <div className="space-y-3 text-muted-foreground">
            <p>The publishing process involves several steps:</p>
            <ol className="list-decimal pl-6 space-y-2">
              <li><strong>Prepare Metadata:</strong> Create comprehensive metadata describing your widget.</li>
              <li><strong>Build for Production:</strong> Optimize and bundle your widget for production.</li>
              <li><strong>Submit for Review:</strong> Submit your widget for security and quality review.</li>
              <li><strong>Publish:</strong> Once approved, your widget becomes available in the store.</li>
            </ol>
          </div>
          <div className="p-4 bg-muted rounded-lg my-4">
            <code className="text-sm">widget-cli publish --production</code>
          </div>
        </div>
        
        <div id="store-api" className="mb-8 scroll-mt-24">
          <h3 className="text-xl font-medium mb-4">Store API</h3>
          <p className="mb-4 text-muted-foreground">
            The Widget Store API allows programmatic access to widget discovery, installation, and management.
          </p>
          <div className="space-y-3 text-muted-foreground">
            <p>Key API features include:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Widget Discovery:</strong> Search and filter widgets based on various criteria.</li>
              <li><strong>Widget Installation:</strong> Install widgets and manage dependencies.</li>
              <li><strong>Version Management:</strong> Upgrade, downgrade, or roll back widget versions.</li>
              <li><strong>User Reviews:</strong> Access and publish widget reviews and ratings.</li>
            </ul>
          </div>
        </div>
        
        <div id="metadata-management" className="scroll-mt-24">
          <h3 className="text-xl font-medium mb-4">Metadata Management</h3>
          <p className="mb-4 text-muted-foreground">
            Widget metadata provides essential information about your widget and determines how it appears in the store.
          </p>
          <DocCodeBlock
            language="json"
            code={metadataCode}
            className="mb-6"
          />
          <div className="space-y-3 text-muted-foreground">
            <p>Important metadata fields include:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Basic Information:</strong> Name, description, version, and author.</li>
              <li><strong>Categories and Tags:</strong> Help users discover your widget.</li>
              <li><strong>Dependencies:</strong> Other widgets or libraries that your widget requires.</li>
              <li><strong>Permissions:</strong> The resources and capabilities your widget needs access to.</li>
              <li><strong>Screenshots and Demo:</strong> Visual examples of your widget in action.</li>
              <li><strong>Documentation:</strong> Usage guide and API reference for your widget.</li>
            </ul>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default WidgetStoreSection;
