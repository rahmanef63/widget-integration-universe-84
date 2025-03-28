
import React, { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import DocSidebar from '../DocSidebar/DocSidebar';
import SectionContent from '../DocContent/SectionContent';
import { DocSection } from '../../types';

interface DocLayoutProps {
  filteredSections: DocSection[];
  activeSection: string;
  handleSectionClick: (sectionId: string) => void;
  isScrolled: boolean;
}

const DocLayout: React.FC<DocLayoutProps> = ({
  filteredSections,
  activeSection,
  handleSectionClick,
  isScrolled
}) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Log when the layout is mounted and when the active section changes
  useEffect(() => {
    console.log('DocLayout mounted or updated, activeSection:', activeSection);
  }, [activeSection]);

  return (
    <div className="flex flex-col lg:flex-row gap-8 w-full">
      <DocSidebar 
        filteredSections={filteredSections}
        activeSection={activeSection}
        handleSectionClick={handleSectionClick}
        isScrolled={isScrolled}
      />
      
      {/* Main Content */}
      <main className="flex-1 w-full overflow-visible min-h-[80vh]" ref={ref}>
        <div className="max-w-3xl mx-auto px-4">
          <SectionContent activeSection={activeSection} inView={inView} />
        </div>
      </main>
    </div>
  );
};

export default DocLayout;
