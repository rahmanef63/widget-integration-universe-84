
import React from 'react';
import { motion } from 'framer-motion';

interface BestPracticesSectionProps {
  inView: boolean;
}

const BestPracticesSection: React.FC<BestPracticesSectionProps> = ({ inView }) => {
  return (
    <section id="best-practices" className="scroll-mt-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <h2 className="text-2xl md:text-3xl font-display font-medium mb-6 pb-2 border-b">
          Best Practices
        </h2>
        
        <div id="performance" className="mb-8 scroll-mt-24">
          <h3 className="text-xl font-medium mb-4">Performance</h3>
          <p className="mb-4 text-muted-foreground">
            High-performance widgets provide a better user experience and reduce resource consumption.
          </p>
          <div className="space-y-3 text-muted-foreground">
            <p>Key performance considerations include:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Lazy Loading:</strong> Load resources only when needed to reduce initial load time.</li>
              <li><strong>Bundle Size:</strong> Keep dependencies minimal and use code splitting.</li>
              <li><strong>Efficient Rendering:</strong> Optimize component renders and minimize DOM operations.</li>
              <li><strong>Data Caching:</strong> Cache API responses and implement efficient data update strategies.</li>
              <li><strong>Memory Management:</strong> Clean up resources when components unmount.</li>
            </ul>
          </div>
        </div>
        
        <div id="architecture-patterns" className="mb-8 scroll-mt-24">
          <h3 className="text-xl font-medium mb-4">Architecture Patterns</h3>
          <p className="mb-4 text-muted-foreground">
            Well-designed widget architecture leads to maintainable, extensible, and robust widgets.
          </p>
          <div className="space-y-3 text-muted-foreground">
            <p>Recommended architecture patterns:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Component Composition:</strong> Build widgets from small, focused components.</li>
              <li><strong>State Management:</strong> Use appropriate state management based on complexity.</li>
              <li><strong>Presentational/Container Split:</strong> Separate UI from business logic.</li>
              <li><strong>Prop Drilling Avoidance:</strong> Use context or state management for deeply nested components.</li>
              <li><strong>Error Boundaries:</strong> Implement error boundaries to prevent cascading failures.</li>
            </ul>
          </div>
        </div>
        
        <div id="monitoring" className="scroll-mt-24">
          <h3 className="text-xl font-medium mb-4">Monitoring</h3>
          <p className="mb-4 text-muted-foreground">
            Effective monitoring helps identify issues before they impact users and provides insights for optimization.
          </p>
          <div className="space-y-3 text-muted-foreground">
            <p>Essential monitoring practices include:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Error Tracking:</strong> Capture and report runtime errors for quick resolution.</li>
              <li><strong>Performance Metrics:</strong> Track load times, render times, and resource usage.</li>
              <li><strong>User Interactions:</strong> Monitor how users interact with your widget.</li>
              <li><strong>API Dependencies:</strong> Track external API dependencies and response times.</li>
              <li><strong>Usage Patterns:</strong> Understand how and when your widget is used most.</li>
            </ul>
            <p className="mt-4">
              The Widget Platform provides built-in monitoring tools that you can integrate with minimal configuration:
            </p>
            <div className="p-4 bg-muted rounded-lg my-4">
              <code className="text-sm">
                {`// Enable performance monitoring
widget.monitoring.enablePerformanceTracking();

// Log custom metrics
widget.monitoring.logMetric("data_load_time", loadTimeMs);`}
              </code>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default BestPracticesSection;
