
import React from 'react';
import { DOC_CODE_SAMPLES } from '../../constants';
import {
  IntroSection,
  IntegrationSection,
  WidgetDevelopmentSection,
  WidgetStoreSection,
  DashboardSection,
  SecuritySection,
  BestPracticesSection,
  ApiReferenceSection
} from './index';

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
      <WidgetDevelopmentSection 
        inView={inView} 
        widgetComponentCode={DOC_CODE_SAMPLES.widgetComponentCode} 
      />
      <WidgetStoreSection 
        inView={inView} 
        metadataCode={DOC_CODE_SAMPLES.widgetMetadataCode} 
      />
      <DashboardSection 
        inView={inView} 
        widgetLoaderCode={DOC_CODE_SAMPLES.widgetLoaderCode} 
      />
      <SecuritySection 
        inView={inView} 
      />
      <BestPracticesSection 
        inView={inView} 
      />
      <ApiReferenceSection 
        inView={inView} 
        widgetApiCode={DOC_CODE_SAMPLES.widgetApiCode} 
      />
    </div>
  );
};

export default SectionContent;
