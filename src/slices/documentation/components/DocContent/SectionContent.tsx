
import React, { useEffect } from 'react';
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
  // Get the main section ID from the activeSection string
  const mainSection = activeSection.split('-')[0];
  
  // This log helps debug which section should be displayed
  useEffect(() => {
    console.log('Active section:', activeSection);
    console.log('Main section:', mainSection);
  }, [activeSection, mainSection]);

  return (
    <div className="space-y-16 pb-16 w-full">
      {/* Always render all sections for now, but we could conditionally render based on mainSection */}
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
