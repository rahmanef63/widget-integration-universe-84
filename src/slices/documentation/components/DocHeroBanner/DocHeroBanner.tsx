
import React from 'react';
import DocSearchBar from '../DocSearchBar/DocSearchBar';

interface DocHeroBannerProps {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
}

const DocHeroBanner: React.FC<DocHeroBannerProps> = ({ searchQuery, setSearchQuery }) => {
  return (
    <div className="rounded-2xl overflow-hidden glassmorphism p-8 md:p-12 mb-10">
      <div className="max-w-3xl">
        <h1 className="text-3xl md:text-4xl font-display font-semibold mb-4">
          Widget Integration Documentation
        </h1>
        <p className="text-lg text-muted-foreground mb-8">
          Comprehensive guides, references, and best practices for the Widget Integration Platform
        </p>
        
        <DocSearchBar 
          searchQuery={searchQuery} 
          setSearchQuery={setSearchQuery}
        />
      </div>
    </div>
  );
};

export default DocHeroBanner;
