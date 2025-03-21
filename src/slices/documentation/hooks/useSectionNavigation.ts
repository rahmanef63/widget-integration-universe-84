
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
      // Get all section elements
      const sections = document.querySelectorAll('section[id]');
      
      // If no sections found, do nothing
      if (sections.length === 0) return;
      
      // Find the section currently in view
      for (const section of sections) {
        const rect = section.getBoundingClientRect();
        // If the top of the element is near the top of the viewport
        if (rect.top <= 200 && rect.bottom > 200) {
          setActiveSection(section.id);
          break;
        }
      }
    };

    // Add scroll event listener with a debounce to improve performance
    let scrollTimeout: ReturnType<typeof setTimeout>;
    const debouncedHandleScroll = () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(handleScroll, 100);
    };

    window.addEventListener('scroll', debouncedHandleScroll);
    return () => {
      window.removeEventListener('scroll', debouncedHandleScroll);
      clearTimeout(scrollTimeout);
    };
  }, []);

  return { activeSection, handleSectionClick };
};
