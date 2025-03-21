
import React, { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

import DocHeroBanner from '../components/DocHeroBanner/DocHeroBanner';
import DocSidebar from '../components/DocSidebar/DocSidebar';
import IntroSection from '../components/DocContent/IntroSection';
import IntegrationSection from '../components/DocContent/IntegrationSection';
import DashboardSection from '../components/DocContent/DashboardSection';
import { DOC_SECTIONS, DOC_CODE_SAMPLES } from '../constants';

const Documentation: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('intro');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isScrolled, setIsScrolled] = useState(false);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Check for scrolling to implement sticky header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle clicking on section navigation
  const handleSectionClick = (sectionId: string) => {
    setActiveSection(sectionId);
    
    // Smooth scroll to section
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Filter sections based on search query
  const filteredSections = searchQuery
    ? DOC_SECTIONS.filter(section => 
        section.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        section.subsections.some(subsection => 
          subsection.title.toLowerCase().includes(searchQuery.toLowerCase())
        )
      )
    : DOC_SECTIONS;

  return (
    <>
      <Header />
      
      <div className="pt-20 min-h-screen bg-background">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 py-8">
          <DocHeroBanner 
            searchQuery={searchQuery} 
            setSearchQuery={setSearchQuery} 
          />
          
          <div className="flex flex-col lg:flex-row gap-8">
            <DocSidebar 
              filteredSections={filteredSections}
              activeSection={activeSection}
              handleSectionClick={handleSectionClick}
              isScrolled={isScrolled}
            />
            
            {/* Main Content */}
            <main className="flex-1" ref={ref}>
              <div className="space-y-16 pb-16">
                <IntroSection inView={inView} />
                <IntegrationSection inView={inView} widgetInterfaceCode={DOC_CODE_SAMPLES.widgetInterfaceCode} />
                <DashboardSection inView={inView} widgetLoaderCode={DOC_CODE_SAMPLES.widgetLoaderCode} />
              </div>
            </main>
          </div>
        </div>
      </div>
      
      <Footer />
    </>
  );
};

export default Documentation;
