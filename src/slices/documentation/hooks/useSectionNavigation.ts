
import { useState, useEffect, useCallback } from 'react';

export const useSectionNavigation = () => {
  const [activeSection, setActiveSection] = useState<string>('intro');

  // Handle section click - update active section and scroll to it
  const handleSectionClick = useCallback((sectionId: string) => {
    console.log('Navigating to section:', sectionId);
    setActiveSection(sectionId);
    
    // Determine if it's a main section or subsection
    const [mainSection, subSection] = sectionId.split('-');
    
    // Target element to scroll to
    const targetId = subSection ? `${mainSection}-${subSection}` : mainSection;
    
    // Use requestAnimationFrame to ensure the section has been rendered
    requestAnimationFrame(() => {
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        console.log('Scrolled to element:', targetId);
      } else {
        console.log('Element not found:', targetId);
      }
    });
  }, []);

  // Monitor scroll position to update active section
  useEffect(() => {
    const handleScroll = () => {
      // Get all section elements
      const sections = document.querySelectorAll('section[id]');
      
      // If no sections found, do nothing
      if (sections.length === 0) {
        console.log('No sections found');
        return;
      }
      
      // Find the section currently in view
      let foundSection = false;
      for (const section of sections) {
        const rect = section.getBoundingClientRect();
        // If the top of the element is near the top of the viewport
        if (rect.top <= 200 && rect.bottom > 200) {
          const sectionId = section.id;
          console.log('Section in view:', sectionId);
          setActiveSection(sectionId);
          foundSection = true;
          break;
        }
      }
      
      // If no section is in view, default to the first visible section
      if (!foundSection && sections.length > 0) {
        for (const section of sections) {
          const rect = section.getBoundingClientRect();
          if (rect.top > 0) {
            setActiveSection(section.id);
            break;
          }
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
    
    // Initial check for active section
    setTimeout(handleScroll, 300);
    
    return () => {
      window.removeEventListener('scroll', debouncedHandleScroll);
      clearTimeout(scrollTimeout);
    };
  }, []);

  return { activeSection, handleSectionClick };
};
