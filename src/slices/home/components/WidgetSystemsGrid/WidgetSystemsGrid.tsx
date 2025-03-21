
import React from 'react';
import { motion } from 'framer-motion';
import WidgetCard from '@/components/WidgetCard';
import AnimatedIcon from '@/components/AnimatedIcon';
import { WIDGET_SYSTEMS } from '../../constants/features';
import { renderIcon } from '@/shared/icon-picker/utils';

const WidgetSystemsGrid: React.FC = () => {
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
          {WIDGET_SYSTEMS.map((system, index) => (
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
