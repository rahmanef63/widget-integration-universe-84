
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
  
  useEffect(() => {
    console.log('Active section:', activeSection);
    console.log('Main section:', mainSection);
    console.log('SectionContent rendering active section:', mainSection);
  }, [activeSection, mainSection]);

  // Render the appropriate section based on the main section ID
  const renderSection = () => {
    switch (mainSection) {
      case 'intro':
        return <IntroSection inView={true} />;
      case 'integration':
        return <IntegrationSection 
          inView={true} 
          widgetInterfaceCode={DOC_CODE_SAMPLES.widgetInterfaceCode} 
        />;
      case 'widget':
        const subSection = activeSection.split('-')[1];
        if (subSection === 'development') {
          return <WidgetDevelopmentSection 
            inView={true} 
            widgetComponentCode={DOC_CODE_SAMPLES.widgetComponentCode} 
          />;
        } else if (subSection === 'store') {
          return <WidgetStoreSection 
            inView={true} 
            metadataCode={DOC_CODE_SAMPLES.widgetMetadataCode} 
          />;
        }
        // Default to development if no specific subsection
        return <WidgetDevelopmentSection 
          inView={true} 
          widgetComponentCode={DOC_CODE_SAMPLES.widgetComponentCode} 
        />;
      case 'dashboard':
        return <DashboardSection 
          inView={true} 
          widgetLoaderCode={DOC_CODE_SAMPLES.widgetLoaderCode} 
        />;
      case 'security':
        return <SecuritySection inView={true} />;
      case 'best':
        return <BestPracticesSection inView={true} />;
      case 'api':
        return <ApiReferenceSection 
          inView={true} 
          widgetApiCode={DOC_CODE_SAMPLES.widgetApiCode} 
        />;
      default:
        return <IntroSection inView={true} />;
    }
  };

  return (
    <div className="space-y-16 pb-16 w-full">
      {renderSection()}
    </div>
  );
};

export default SectionContent;
