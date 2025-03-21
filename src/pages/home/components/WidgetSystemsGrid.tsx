
import React from 'react';
import { motion } from 'framer-motion';
import { Globe, Database, Layout, Shield, Server, Zap } from 'lucide-react';
import WidgetCard from '@/components/WidgetCard';
import AnimatedIcon from '@/components/AnimatedIcon';
import type { LucideIcon } from 'lucide-react';

interface WidgetSystem {
  title: string;
  description: string;
  icon: LucideIcon;
}

const WidgetSystemsGrid: React.FC = () => {
  // Widget ecosystem data
  const widgetSystems: WidgetSystem[] = [
    {
      title: 'Widget Provider',
      description: 'Standardized development framework for creating modular, compatible widgets',
      icon: Globe,
    },
    {
      title: 'Widget Store',
      description: 'Centralized marketplace for distribution and discovery of enterprise widgets',
      icon: Database,
    },
    {
      title: 'Dashboard Integration',
      description: 'Seamless integration platform for embedding widgets into applications',
      icon: Layout,
    },
    {
      title: 'Secure Sandboxing',
      description: 'Isolated execution environment for widget security and performance',
      icon: Shield,
    },
    {
      title: 'Advanced API Gateway',
      description: 'Unified access point for all widget services with robust authentication',
      icon: Server,
    },
    {
      title: 'Performance Monitoring',
      description: 'Real-time analytics and telemetry for widget optimization',
      icon: Zap,
    },
  ];

  return (
    <section className="py-20 md:py-32 bg-background relative">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-3xl md:text-4xl font-display font-medium"
          >
            Comprehensive Widget Ecosystem
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="mt-4 text-lg text-muted-foreground"
          >
            A unified platform connecting widget providers, stores, and integration points for seamless enterprise experiences
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {widgetSystems.map((system, index) => (
            <WidgetCard
              key={index}
              title={system.title}
              description={system.description}
              icon={<AnimatedIcon icon={system.icon} />}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default WidgetSystemsGrid;
