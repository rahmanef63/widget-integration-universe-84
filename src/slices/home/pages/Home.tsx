
import React from 'react';
import Hero from '../components/Hero/Hero';
import WidgetShowcase from '../components/WidgetShowcase/WidgetShowcase';
import FeatureSection from '@/shared/components/FeatureSection/FeatureSection';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ROUTES } from '@/core/constants/routes';
import { Feature } from '@/core/types';

const Home: React.FC = () => {
  // Hero data
  const heroData = {
    title: "Enterprise Widget Platform",
    subtitle: "A comprehensive solution for building, managing, and integrating enterprise-grade widgets in your applications.",
    ctaText: "Explore Ecosystem",
    ctaLink: ROUTES.ECOSYSTEM,
    secondaryCtaText: "View Documentation",
    secondaryCtaLink: ROUTES.DOCUMENTATION
  };

  // Feature sections data
  const featureSections = [
    {
      title: "Standardized Widget System",
      subtitle: "Consistent Development Experience",
      features: [
        {
          title: "TypeScript Integration",
          description: "Full TypeScript support with interfaces, type checking, and auto-completion",
          icon: "Code"
        },
        {
          title: "Component Architecture",
          description: "Modular, reusable component design with standardized lifecycle hooks",
          icon: "Layers"
        },
        {
          title: "Performance Optimized",
          description: "Built-in performance monitoring, lazy loading, and optimization tools",
          icon: "Zap"
        }
      ] as Feature[],
    },
    {
      title: "Enterprise-Grade Security",
      subtitle: "Secure By Design",
      features: [
        {
          title: "Sandboxed Widgets",
          description: "Isolated execution environments prevent cross-widget contamination",
          icon: "Shield"
        },
        {
          title: "Fine-Grained Permissions",
          description: "Granular control over what widgets can access and modify",
          icon: "Lock"
        },
        {
          title: "Audit Logging",
          description: "Comprehensive logging and monitoring of all widget activities",
          icon: "FileText"
        }
      ] as Feature[],
      reversed: true
    }
  ];

  return (
    <>
      <Header />
      
      <main>
        <Hero
          title={heroData.title}
          subtitle={heroData.subtitle}
          ctaText={heroData.ctaText}
          ctaLink={heroData.ctaLink}
          secondaryCtaText={heroData.secondaryCtaText}
          secondaryCtaLink={heroData.secondaryCtaLink}
        />
        
        <div id="features">
          {featureSections.map((section, index) => (
            <FeatureSection
              key={index}
              title={section.title}
              subtitle={section.subtitle}
              features={section.features}
              reversed={section.reversed}
            />
          ))}
        </div>
        
        <WidgetShowcase
          title="Explore Our Widget Ecosystem"
          subtitle="Discover a wide range of enterprise-ready widgets to enhance your dashboards and applications."
        />
      </main>
      
      <Footer />
    </>
  );
};

export default Home;
