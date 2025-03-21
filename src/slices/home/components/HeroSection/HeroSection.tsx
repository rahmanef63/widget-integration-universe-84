
import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { HERO_CONTENT } from '../../constants/features';
import WaveAnimation from '../WaveAnimation/WaveAnimation';

const HeroSection: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const [scrollIndicatorVisible, setScrollIndicatorVisible] = useState(true);
  const { scrollYProgress } = useScroll();
  
  const { tagline, title, description, primaryButton, secondaryButton } = HERO_CONTENT;
  
  // Parallax effect for hero section
  const heroContentY = useTransform(scrollYProgress, [0, 0.2], [0, 50]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  // Handle scroll for the scroll indicator
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setScrollIndicatorVisible(false);
      } else {
        setScrollIndicatorVisible(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToContent = () => {
    const contentElement = document.getElementById('integration');
    if (contentElement) {
      contentElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section ref={heroRef} className="relative min-h-screen flex items-center pt-16 hero-gradient overflow-hidden">
      <motion.div
        style={{ y: heroContentY, opacity: heroOpacity }}
        className="container max-w-7xl mx-auto px-4 sm:px-6 py-16 md:py-20 relative z-10"
      >
        <div className="text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <span className="text-sm font-medium px-3 py-1 rounded-full bg-primary/10 text-primary">
              {tagline}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="mt-6 text-4xl md:text-6xl font-display font-semibold tracking-tight leading-tight"
          >
            <span className="text-gradient">{title.split(' ').slice(0, 2).join(' ')}</span> {title.split(' ').slice(2).join(' ')}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="mt-6 text-lg text-muted-foreground max-w-3xl mx-auto"
          >
            {description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
            className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              to={primaryButton.link}
              onClick={(e) => {
                e.preventDefault();
                scrollToContent();
              }}
              className="px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 hover:scale-105 transition-all duration-300"
            >
              {primaryButton.text}
            </Link>
            <Link
              to={secondaryButton.link}
              className="px-6 py-3 rounded-full bg-secondary text-secondary-foreground font-medium hover:bg-secondary/80 transition-all duration-300"
            >
              {secondaryButton.text}
            </Link>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: scrollIndicatorVisible ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center cursor-pointer"
          onClick={scrollToContent}
        >
          <span className="text-sm text-muted-foreground mb-2">Scroll to explore</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown className="h-6 w-6 text-muted-foreground" />
          </motion.div>
        </motion.div>
      </motion.div>
      
      <WaveAnimation />
    </section>
  );
};

export default HeroSection;
