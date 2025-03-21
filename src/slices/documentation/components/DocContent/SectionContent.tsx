
import React from 'react';
import { motion } from 'framer-motion';
import IntroSection from './IntroSection';
import IntegrationSection from './IntegrationSection';
import DashboardSection from './DashboardSection';
import { DOC_CODE_SAMPLES } from '../../constants';

interface SectionContentProps {
  activeSection: string;
  inView: boolean;
}

const SectionContent: React.FC<SectionContentProps> = ({ activeSection, inView }) => {
  return (
    <div className="space-y-16 pb-16">
      <IntroSection inView={inView} />
      <IntegrationSection 
        inView={inView} 
        widgetInterfaceCode={DOC_CODE_SAMPLES.widgetInterfaceCode} 
      />
      <DashboardSection 
        inView={inView} 
        widgetLoaderCode={DOC_CODE_SAMPLES.widgetLoaderCode} 
      />
    </div>
  );
};

export default SectionContent;
