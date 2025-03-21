
import React from 'react';
import { motion } from 'framer-motion';

interface IntroSectionProps {
  inView: boolean;
}

const IntroSection: React.FC<IntroSectionProps> = ({ inView }) => {
  return (
    <section id="intro" className="scroll-mt-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl md:text-3xl font-display font-medium mb-6 pb-2 border-b">
          Introduction
        </h2>
        
        <div id="intro-overview" className="mb-8 scroll-mt-24">
          <h3 className="text-xl font-medium mb-4">Overview</h3>
          <p className="mb-4 text-muted-foreground">
            The Widget Integration Platform provides a comprehensive ecosystem for developing, distributing, and integrating enterprise-grade widgets across applications. This documentation covers all aspects of the platform, from widget development to integration in host applications.
          </p>
          <p className="text-muted-foreground">
            Whether you're developing widgets, managing a widget store, or integrating widgets into your dashboard, this guide provides the necessary information and best practices.
          </p>
        </div>
        
        <div id="intro-architecture" className="mb-8 scroll-mt-24">
          <h3 className="text-xl font-medium mb-4">Architecture</h3>
          <p className="mb-4 text-muted-foreground">
            The platform consists of three main components that work together to create a seamless widget ecosystem:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
            <li><strong>Widget Provider:</strong> Develops standardized widgets using the platform's component framework and TypeScript interfaces.</li>
            <li><strong>Widget Store:</strong> Manages distribution, versioning, and metadata for all widgets in the ecosystem.</li>
            <li><strong>Dashboard Integration:</strong> Loads and renders widgets with sandboxing, error handling, and performance monitoring.</li>
          </ul>
        </div>
        
        <div id="intro-getting-started" className="scroll-mt-24">
          <h3 className="text-xl font-medium mb-4">Getting Started</h3>
          <p className="mb-4 text-muted-foreground">
            To begin using the Widget Integration Platform, follow these steps:
          </p>
          <ol className="list-decimal pl-6 space-y-3 text-muted-foreground">
            <li>
              <strong>Set up your development environment</strong>
              <p className="mt-1">Install Node.js, TypeScript, and the Widget CLI tool to get started.</p>
            </li>
            <li>
              <strong>Create your first widget</strong>
              <p className="mt-1">Use the CLI to scaffold a new widget project with the standard interface.</p>
            </li>
            <li>
              <strong>Test and deploy</strong>
              <p className="mt-1">Use the testing framework to validate your widget before publishing it to the store.</p>
            </li>
            <li>
              <strong>Integrate into a dashboard</strong>
              <p className="mt-1">Use the Widget Loader component to integrate widgets into your application.</p>
            </li>
          </ol>
        </div>
      </motion.div>
    </section>
  );
};

export default IntroSection;
