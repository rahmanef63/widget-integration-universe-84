
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import { HeroProps } from '../../types';

interface WaveAnimationProps {
  className?: string;
}

const WaveAnimation: React.FC<WaveAnimationProps> = ({ className }) => {
  return (
    <div className={`absolute bottom-0 left-0 w-full overflow-hidden ${className}`}>
      <svg
        className="relative block w-full h-auto"
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <motion.path
          initial={{ pathOffset: 1 }}
          animate={{ pathOffset: 0 }}
          transition={{ duration: 2, ease: "easeInOut" }}
          d="M321.39 56.44c58-10.79 114.16-30.13 172-41.86 82.39-16.72 168.19-17.73 250.45-.39C823.78 31 906.67 72 985.66 92.83c70.05 18.48 146.53 26.09 214.34 3V0H0v27.35a600.21 600.21 0 00321.39 29.09z"
          className="fill-primary/10"
        ></motion.path>
      </svg>
    </div>
  );
};

const Hero: React.FC<HeroProps> = ({
  title,
  subtitle,
  ctaText,
  ctaLink,
  secondaryCtaText,
  secondaryCtaLink
}) => {
  const scrollToContent = () => {
    const contentElement = document.getElementById('features');
    if (contentElement) {
      contentElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background pt-16">
      <div className="container px-4 mx-auto z-10">
        <div className="flex flex-col items-center text-center pt-12 pb-24">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-4xl md:text-5xl lg:text-6xl font-display font-semibold leading-tight mb-6 max-w-4xl"
          >
            {title}
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="text-xl text-muted-foreground mb-10 max-w-2xl"
          >
            {subtitle}
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link to={ctaLink} className="inline-flex bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-xl text-center font-medium transition-all">
              {ctaText}
            </Link>
            
            {secondaryCtaText && secondaryCtaLink && (
              <Link to={secondaryCtaLink} className="inline-flex bg-secondary hover:bg-secondary/80 text-secondary-foreground px-6 py-3 rounded-xl text-center font-medium transition-all">
                {secondaryCtaText}
              </Link>
            )}
          </motion.div>
        </div>
      </div>
      
      <WaveAnimation className="z-0" />
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 cursor-pointer"
        onClick={scrollToContent}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="h-8 w-8 text-muted-foreground" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
