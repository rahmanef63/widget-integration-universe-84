
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { CTA_CONTENT } from '../../constants/features';

const CtaSection: React.FC = () => {
  const { title, description, primaryButton, secondaryButton } = CTA_CONTENT;
  
  return (
    <section className="py-20 md:py-32 relative hero-gradient overflow-hidden">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-3xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-medium mb-6">
            {title}
          </h2>
          <p className="text-lg text-muted-foreground mb-10">
            {description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to={primaryButton.link}
              className="px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 hover:scale-105 transition-all duration-300"
            >
              {primaryButton.text}
            </Link>
            <a
              href={secondaryButton.link}
              className="px-6 py-3 rounded-full border border-foreground/20 text-foreground font-medium hover:bg-foreground/5 transition-all duration-300"
            >
              {secondaryButton.text}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CtaSection;
