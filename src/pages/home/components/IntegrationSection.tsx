
import React from 'react';
import { Code, Shield, Layout } from 'lucide-react';
import FeatureSection from '@/components/FeatureSection';
import { Feature } from '@/core/types';

const IntegrationSection: React.FC = () => {
  // Features for sections
  const integrationFeatures: Feature[] = [
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
  );
};

export default IntegrationSection;
