
import { useState, useEffect } from 'react';

export const useSectionNavigation = () => {
  const [activeSection, setActiveSection] = useState<string>('intro');

  // Auto-scroll to the active section when it changes
  useEffect(() => {
    const sectionElement = document.getElementById(activeSection.split('-')[0]);
    if (sectionElement) {
      sectionElement.scrollIntoView({ behavior: 'smooth' });
    }
  }, [activeSection]);

  // Handle section click - update active section and scroll to it
  const handleSectionClick = (sectionId: string) => {
    setActiveSection(sectionId);
    
    // Determine if it's a main section or subsection
    const [mainSection, subSection] = sectionId.split('-');
    
    // Target element to scroll to
    const targetId = subSection ? `${mainSection}-${subSection}` : mainSection;
    const element = document.getElementById(targetId);
    
    if (element) {
      setTimeout(() => {
        element.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  // Monitor scroll position to update active section
  useEffect(() => {
    const handleScroll = () => {
      // Get all main section elements
      const sections = [
        'intro',
        'integration',
        'widget-development',
        'widget-store',
        'dashboard-integration',
        'security',
        'best-practices',
        'api'
      ];
      
      // Find the section currently in view
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          // If the top of the element is in the top half of the viewport
          if (rect.top <= 300 && rect.bottom > 300) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return { activeSection, handleSectionClick };
};
