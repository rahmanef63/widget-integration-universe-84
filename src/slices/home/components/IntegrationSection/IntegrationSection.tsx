
import React from 'react';
import FeatureSection from '@/components/FeatureSection';
import { INTEGRATION_FEATURES } from '../../constants/features';

const IntegrationSection: React.FC = () => {
  return (
    <FeatureSection
      title="Seamless Integration Across Platforms"
      subtitle="Advanced Integration"
      features={INTEGRATION_FEATURES}
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
