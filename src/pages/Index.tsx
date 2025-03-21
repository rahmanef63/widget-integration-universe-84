
import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown, Code, Database, Globe, Layout, LucideProps, Server, Shield, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import WidgetCard from '@/components/WidgetCard';
import ArchitectureDiagram from '@/components/ArchitectureDiagram';
import FeatureSection from '@/components/FeatureSection';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AnimatedIcon from '@/components/AnimatedIcon';
import { useInView } from 'react-intersection-observer';

// Custom component for the hero wave animation
const WaveAnimation = () => {
  return (
    <div className="absolute inset-x-0 bottom-0 h-20 md:h-32 z-0 overflow-hidden">
      <svg
        className="absolute bottom-0 w-full h-full"
        viewBox="0 0 1440 320"
        xmlns="http://www.w3.org/2000/svg"
      >
        <motion.path
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.1 }}
          transition={{ duration: 2, ease: "easeInOut" }}
          fill="currentColor"
          fillOpacity="0.1"
          d="M0,192L48,176C96,160,192,128,288,122.7C384,117,480,139,576,165.3C672,192,768,224,864,213.3C960,203,1056,149,1152,122.7C1248,96,1344,96,1392,96L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
        />
        <motion.path
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.07 }}
          transition={{ duration: 2.5, delay: 0.2, ease: "easeInOut" }}
          fill="currentColor"
          fillOpacity="0.07"
          d="M0,288L48,272C96,256,192,224,288,208C384,192,480,192,576,186.7C672,181,768,171,864,186.7C960,203,1056,245,1152,234.7C1248,224,1344,160,1392,128L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
        />
      </svg>
    </div>
  );
};

// Interface for widget data
interface WidgetSystem {
  title: string;
  description: string;
  icon: React.FC<LucideProps>;
}

const Index: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const heroRef = useRef<HTMLDivElement>(null);
  const [scrollIndicatorVisible, setScrollIndicatorVisible] = useState(true);
  
  const [architectureRef, architectureInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

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

  // Features for sections
  const integrationFeatures = [
    {
      title: 'Standardized Interfaces',
      description: 'TypeScript-based contracts ensure compatibility across all widgets and platforms',
      icon: Code,
    },
    {
      title: 'Seamless Integration',
      description: 'Widget loading system with automatic dependency resolution and version management',
      icon: Layout,
    },
    {
      title: 'Enterprise Security',
      description: 'Robust sandboxing with fine-grained permission controls and isolation',
      icon: Shield,
    },
  ];

  return (
    <>
      <Header />
      
      {/* Hero Section */}
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
                Enterprise Widget Integration
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="mt-6 text-4xl md:text-6xl font-display font-semibold tracking-tight leading-tight"
            >
              Seamless <span className="text-gradient">Widget Integration</span> for Enterprise Applications
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
              className="mt-6 text-lg text-muted-foreground max-w-3xl mx-auto"
            >
              A comprehensive platform for developing, distributing, and integrating enterprise-grade widgets with unmatched security, performance, and compatibility.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
              className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
            >
              <a
                href="#integration"
                className="px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 hover:scale-105 transition-all duration-300"
              >
                Explore Integration
              </a>
              <Link
                to="/documentation"
                className="px-6 py-3 rounded-full bg-secondary text-secondary-foreground font-medium hover:bg-secondary/80 transition-all duration-300"
              >
                View Documentation
              </Link>
            </motion.div>
          </div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: scrollIndicatorVisible ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
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

      {/* Widget Systems Grid */}
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 stagger-container">
            {widgetSystems.map((system, index) => (
              <WidgetCard
                key={index}
                title={system.title}
                description={system.description}
                icon={<AnimatedIcon icon={system.icon} animation="pulse" />}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Architecture Diagram Section */}
      <section id="integration" ref={architectureRef} className="py-20 md:py-32 bg-secondary/30 relative overflow-hidden">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={architectureInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="text-sm font-medium px-3 py-1 rounded-full bg-primary/10 text-primary inline-block"
            >
              Enterprise Architecture
            </motion.span>
            
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={architectureInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
              className="mt-4 text-3xl md:text-4xl font-display font-medium"
            >
              Widget Integration Architecture
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={architectureInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
              className="mt-4 text-lg text-muted-foreground"
            >
              Visualize how widgets flow through the ecosystem from development to integration
            </motion.p>
          </div>

          <ArchitectureDiagram />
        </div>
      </section>

      {/* Feature Section - Integration */}
      <FeatureSection
        title="Seamless Integration Across Platforms"
        subtitle="Advanced Integration"
        features={integrationFeatures}
        illustration={
          <div className="rounded-2xl overflow-hidden shadow-2xl border border-white/10 glassmorphism">
            <img
              src="https://placehold.co/600x400/3B82F6/FFFFFF?text=Integration+Demo"
              alt="Integration Visualization"
              className="w-full h-auto object-cover"
              loading="lazy"
            />
          </div>
        }
      />

      {/* CTA Section */}
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
              Ready to Transform Your Widget Strategy?
            </h2>
            <p className="text-lg text-muted-foreground mb-10">
              Implement our enterprise-grade integration platform and unlock a new level of interoperability for your applications.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/documentation"
                className="px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 hover:scale-105 transition-all duration-300"
              >
                Get Started
              </Link>
              <a
                href="#"
                className="px-6 py-3 rounded-full border border-foreground/20 text-foreground font-medium hover:bg-foreground/5 transition-all duration-300"
              >
                Request Demo
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Index;
