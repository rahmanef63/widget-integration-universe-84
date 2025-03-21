
import { useState } from 'react';

export const useSectionNavigation = () => {
  const [activeSection, setActiveSection] = useState<string>('intro');

  const handleSectionClick = (sectionId: string) => {
    setActiveSection(sectionId);
    
    // Smooth scroll to section
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return { activeSection, handleSectionClick };
};
