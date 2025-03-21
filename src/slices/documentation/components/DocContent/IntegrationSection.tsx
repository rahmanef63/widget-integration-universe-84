
import React from 'react';
import { motion } from 'framer-motion';
import DocCodeBlock from '../DocCodeBlock/DocCodeBlock';

interface IntegrationSectionProps {
  inView: boolean;
  widgetInterfaceCode: string;
}

const IntegrationSection: React.FC<IntegrationSectionProps> = ({ inView, widgetInterfaceCode }) => {
  return (
    <section id="integration" className="scroll-mt-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <h2 className="text-2xl md:text-3xl font-display font-medium mb-6 pb-2 border-b">
          Integration Guide
        </h2>
        
        <div id="integration-widget-interface" className="mb-8 scroll-mt-24">
          <h3 className="text-xl font-medium mb-4">Widget Interface</h3>
          <p className="mb-4 text-muted-foreground">
            All widgets in the platform implement a standardized interface that ensures compatibility across different hosts. This interface defines the props that every widget receives and how it communicates with the host application.
          </p>
          
          <DocCodeBlock code={widgetInterfaceCode} />
          
          <p className="text-muted-foreground">
            This standardized interface ensures that widgets can be predictably integrated into any compatible dashboard or application.
          </p>
        </div>
        
        <div id="integration-typescript-integration" className="mb-8 scroll-mt-24">
          <h3 className="text-xl font-medium mb-4">TypeScript Integration</h3>
          <p className="mb-4 text-muted-foreground">
            The platform uses TypeScript for type safety across all components of the widget ecosystem. Type definitions ensure compatibility between widgets and host applications.
          </p>
          <p className="text-muted-foreground">
            Key benefits of the TypeScript integration include:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
            <li>Static type checking for widget interfaces</li>
            <li>Autocompletion and IntelliSense in development environments</li>
            <li>Generics for flexible yet type-safe widget configurations</li>
            <li>Discriminated union types for complex widget states</li>
          </ul>
        </div>
        
        <div id="integration-standard-props" className="scroll-mt-24">
          <h3 className="text-xl font-medium mb-4">Standard Props</h3>
          <p className="mb-4 text-muted-foreground">
            Every widget receives a standard set of props from the host application:
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="px-4 py-2 text-left font-medium">Prop</th>
                  <th className="px-4 py-2 text-left font-medium">Type</th>
                  <th className="px-4 py-2 text-left font-medium">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                <tr>
                  <td className="px-4 py-3 font-mono text-primary">instanceId</td>
                  <td className="px-4 py-3 font-mono">string</td>
                  <td className="px-4 py-3 text-muted-foreground">Unique identifier for this widget instance</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono text-primary">config</td>
                  <td className="px-4 py-3 font-mono">WidgetConfig&lt;T&gt;</td>
                  <td className="px-4 py-3 text-muted-foreground">Configuration data specific to this widget</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono text-primary">theme</td>
                  <td className="px-4 py-3 font-mono">ThemeConfig</td>
                  <td className="px-4 py-3 text-muted-foreground">Theme information from the host application</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono text-primary">auth</td>
                  <td className="px-4 py-3 font-mono">AuthContext</td>
                  <td className="px-4 py-3 text-muted-foreground">Authentication context for API calls</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono text-primary">eventBus</td>
                  <td className="px-4 py-3 font-mono">EventBusInterface</td>
                  <td className="px-4 py-3 text-muted-foreground">Communication channel between widgets</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono text-primary">viewport</td>
                  <td className="px-4 py-3 font-mono">ViewportInfo</td>
                  <td className="px-4 py-3 text-muted-foreground">Container dimensions and responsive breakpoints</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default IntegrationSection;
