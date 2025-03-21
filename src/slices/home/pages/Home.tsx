
import React from 'react';
import { Code, Database, Globe, Layout, Server, Shield, Zap } from 'lucide-react';
import Hero from '../components/Hero/Hero';
import WidgetShowcase from '../components/WidgetShowcase/WidgetShowcase';
import FeatureSection from '@/shared/components/FeatureSection/FeatureSection';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ArchitectureDiagram from '@/components/ArchitectureDiagram';
import { FeatureSectionData } from '../types';

const Home: React.FC = () => {
  // Feature sections data
  const featureSections: FeatureSectionData[] = [
    {
      title: "Enterprise-Grade Integration Framework",
      subtitle: "INTEGRATION",
      features: [
        {
          title: "Standardized Widget Interface",
          description: "Ensure consistent behavior across all widgets with a comprehensive TypeScript interface system.",
          icon: Code
        },
        {
          title: "Secure Sandboxing",
          description: "Run widgets in isolated environments with controlled access to resources and APIs.",
          icon: Shield
        },
        {
          title: "Centralized Widget Store",
          description: "Discover, distribute and manage widgets through a centralized repository with versioning.",
          icon: Database
        }
      ],
      illustration: <ArchitectureDiagram />
    },
    {
      title: "Seamless Developer Experience",
      subtitle: "DEVELOPMENT",
      features: [
        {
          title: "Comprehensive SDK",
          description: "Develop widgets easily with our SDK providing all necessary tools and components.",
          icon: Zap
        },
        {
          title: "Real-time Testing",
          description: "Test your widgets in real-time with our interactive development environment.",
          icon: Globe
        },
        {
          title: "Automated Publishing",
          description: "Streamline the publishing process with automated verification and distribution.",
          icon: Server
        }
      ],
      reversed: true
    },
    {
      title: "Powerful Dashboard Capabilities",
      subtitle: "DASHBOARDS",
      features: [
        {
          title: "Drag-and-Drop Layout",
          description: "Create customized dashboards with intuitive drag-and-drop widget placement.",
          icon: Layout
        },
        {
          title: "Advanced Filtering",
          description: "Filter and organize widgets based on categories, tags, or custom criteria.",
          icon: Database
        },
        {
          title: "Real-time Updates",
          description: "Keep your dashboard data current with real-time updates and notifications.",
          icon: Zap
        }
      ]
    }
  ];

  return (
    <>
      <Header />
      
      <main>
        <Hero
          title="Enterprise Widget Integration Platform"
          subtitle="Create powerful dashboards with modular, reusable widgets that integrate seamlessly across your organization."
          ctaText="Explore Widgets"
          ctaLink="/ecosystem"
          secondaryCtaText="Read Documentation"
          secondaryCtaLink="/documentation"
        />
        
        <div id="features">
          {featureSections.map((section, index) => (
            <FeatureSection
              key={index}
              title={section.title}
              subtitle={section.subtitle}
              features={section.features}
              reversed={section.reversed}
              illustration={section.illustration}
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
