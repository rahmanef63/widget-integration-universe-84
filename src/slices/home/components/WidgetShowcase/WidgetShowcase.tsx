
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import WidgetCard from '@/components/WidgetCard';
import { WidgetService } from '@/shared/services/widget.service';
import { WidgetBase } from '@/core/types';

interface WidgetShowcaseProps {
  title: string;
  subtitle: string;
  maxItems?: number;
}

const WidgetShowcase: React.FC<WidgetShowcaseProps> = ({ 
  title, 
  subtitle, 
  maxItems = 6 
}) => {
  const [widgets, setWidgets] = useState<WidgetBase[]>([]);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    // Get widgets from service
    const allWidgets = WidgetService.getWidgets();
    setWidgets(allWidgets.slice(0, maxItems));
  }, [maxItems]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    },
  };

  return (
    <section ref={ref} id="widgets" className="py-20 bg-secondary/5">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-display font-medium mb-4"
          >
            {title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-muted-foreground max-w-2xl mx-auto"
          >
            {subtitle}
          </motion.p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {widgets.map((widget, index) => (
            <motion.div key={widget.id} variants={itemVariants}>
              <WidgetCard
                title={widget.title}
                description={widget.description}
                icon={widget.icon}
                delay={index * 100}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default WidgetShowcase;
