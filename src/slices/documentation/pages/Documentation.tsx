
import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

import DocHeroBanner from '../components/DocHeroBanner/DocHeroBanner';
import DocLayout from '../components/DocLayout/DocLayout';
import { DOC_SECTIONS } from '../constants';
import { useDocScroll } from '../hooks/useDocScroll';
import { useSectionNavigation } from '../hooks/useSectionNavigation';

const Documentation: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const isScrolled = useDocScroll();
  const { activeSection, handleSectionClick } = useSectionNavigation();
  const [isLoaded, setIsLoaded] = useState(false);

  // Set isLoaded to true after component mounts
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

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
          
          {isLoaded ? (
            <DocLayout 
              filteredSections={filteredSections}
              activeSection={activeSection}
              handleSectionClick={handleSectionClick}
              isScrolled={isScrolled}
            />
          ) : (
            <div className="flex justify-center items-center py-20">
              <div className="animate-pulse h-6 w-32 bg-muted rounded"></div>
            </div>
          )}
        </div>
      </div>
      
      <Footer />
    </>
  );
};

export default Documentation;
