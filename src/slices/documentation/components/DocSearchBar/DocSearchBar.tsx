
import React from 'react';
import { Search } from 'lucide-react';

interface DocSearchBarProps {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
}

const DocSearchBar: React.FC<DocSearchBarProps> = ({ searchQuery, setSearchQuery }) => {
  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search className="h-5 w-5 text-muted-foreground" />
      </div>
      <input
        type="text"
        placeholder="Search documentation..."
        className="w-full pl-10 pr-4 py-3 rounded-xl bg-background border border-input focus:border-primary focus:ring focus:ring-primary/30 focus:outline-none transition-all"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </div>
  );
};

export default DocSearchBar;
