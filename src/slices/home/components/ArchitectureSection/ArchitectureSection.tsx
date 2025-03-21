
import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import ArchitectureDiagram from '@/components/ArchitectureDiagram';
import { ARCHITECTURE_CONTENT } from '../../constants/features';

const ArchitectureSection: React.FC = () => {
  const [architectureRef, architectureInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  const { title, subtitle, description } = ARCHITECTURE_CONTENT;

  return (
    <section id="integration" ref={architectureRef} className="py-20 md:py-32 bg-secondary/30 relative overflow-hidden">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={architectureInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="text-sm font-medium px-3 py-1 rounded-full bg-primary/10 text-primary inline-block"
          >
            {subtitle}
          </motion.span>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={architectureInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
            className="mt-4 text-3xl md:text-4xl font-display font-medium"
          >
            {title}
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={architectureInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
            className="mt-4 text-lg text-muted-foreground"
          >
            {description}
          </motion.p>
        </div>

        <ArchitectureDiagram />
      </div>
    </section>
  );
};

export default ArchitectureSection;
