
import React from 'react';
import { motion } from 'framer-motion';
import DocCodeBlock from '../DocCodeBlock/DocCodeBlock';
import { WIDGET_DEVELOPMENT_CONTENT } from '../../constants/content';

interface WidgetDevelopmentSectionProps {
  inView: boolean;
  widgetComponentCode: string;
}

const WidgetDevelopmentSection: React.FC<WidgetDevelopmentSectionProps> = ({ 
  inView,
  widgetComponentCode 
}) => {
  const { title, sections } = WIDGET_DEVELOPMENT_CONTENT;
  
  return (
    <section id="widget-development" className="scroll-mt-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <h2 className="text-2xl md:text-3xl font-display font-medium mb-6 pb-2 border-b">
          {title}
        </h2>
        
        <div id="widget-development-setup" className="mb-8 scroll-mt-24">
          <h3 className="text-xl font-medium mb-4">{sections.setup.title}</h3>
          <p className="mb-4 text-muted-foreground">
            {sections.setup.description}
            Our platform provides tools and scaffolding to streamline the process.
          </p>
          <div className="mb-6 space-y-3 text-muted-foreground">
            <p>To start developing widgets, you'll need:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Node.js v16 or higher</li>
              <li>TypeScript 4.5+</li>
              <li>Widget CLI (for scaffolding and testing)</li>
            </ul>
          </div>
          <div className="p-4 bg-muted rounded-lg mb-4">
            <code className="text-sm">npm install -g @widget-platform/cli</code>
          </div>
        </div>
        
        <div id="component-structure" className="mb-8 scroll-mt-24">
          <h3 className="text-xl font-medium mb-4">{sections.componentStructure.title}</h3>
          <p className="mb-4 text-muted-foreground">
            {sections.componentStructure.description}
            across all hosting platforms.
          </p>
          
          <DocCodeBlock
            code={widgetComponentCode}
            className="mb-6"
          />
          
          <div className="space-y-3 text-muted-foreground">
            <p>The widget component structure includes:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Widget Container:</strong> The main component that handles state and widget lifecycle.</li>
              <li><strong>Widget UI:</strong> The presentation layer that renders the widget interface.</li>
              <li><strong>Widget Config:</strong> The configuration schema and default values.</li>
              <li><strong>Widget API:</strong> Methods for interacting with external systems.</li>
            </ul>
          </div>
        </div>
        
        <div id="testing-widgets" className="scroll-mt-24">
          <h3 className="text-xl font-medium mb-4">{sections.testing.title}</h3>
          <p className="mb-4 text-muted-foreground">
            {sections.testing.description}
          </p>
          <div className="space-y-4 text-muted-foreground">
            <p>Our testing framework provides tools for:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Unit Testing:</strong> Test individual components and functions.</li>
              <li><strong>Integration Testing:</strong> Verify widget behavior in a simulated dashboard.</li>
              <li><strong>Visual Testing:</strong> Ensure UI consistency across different themes and resolutions.</li>
              <li><strong>Performance Testing:</strong> Measure load times, memory usage, and rendering efficiency.</li>
            </ul>
            <p className="mt-4">
              Use the Widget CLI to run tests in a sandboxed environment that closely resembles production:
            </p>
            <div className="p-4 bg-muted rounded-lg mt-2">
              <code className="text-sm">widget-cli test --sandbox</code>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default WidgetDevelopmentSection;
