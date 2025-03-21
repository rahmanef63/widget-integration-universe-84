
import React from 'react';
import { motion } from 'framer-motion';

const EcosystemHero: React.FC = () => {
  return (
    <section className="py-16 md:py-24 hero-gradient">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-sm font-medium px-3 py-1 rounded-full bg-primary/10 text-primary inline-block mb-4"
          >
            Widget Ecosystem
          </motion.span>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl md:text-5xl font-display font-semibold leading-tight mb-6"
          >
            Widget Integration Ecosystem
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-muted-foreground"
          >
            Explore our comprehensive library of enterprise-ready widgets to enhance your applications
          </motion.p>
        </div>
      </div>
    </section>
  );
};

export default EcosystemHero;
