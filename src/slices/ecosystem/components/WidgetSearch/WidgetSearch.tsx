
import React from 'react';
import { SearchIcon } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Grid3X3Icon, ListIcon } from 'lucide-react';

interface WidgetSearchProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  viewMode: string;
  onViewModeChange: (mode: string) => void;
  categories: string[];
}

const WidgetSearch: React.FC<WidgetSearchProps> = ({
  searchTerm,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  viewMode,
  onViewModeChange,
  categories
}) => {
  return (
    <div className="flex flex-col md:flex-row gap-4 mb-8">
      <div className="relative flex-grow">
        <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
        <Input
          placeholder="Search widgets..."
          className="pl-10"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      <div className="flex gap-4">
        <Select value={selectedCategory} onValueChange={onCategoryChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <div className="flex items-center border rounded-md overflow-hidden">
          <Button
            variant={viewMode === 'grid' ? 'default' : 'ghost'}
            size="icon"
            onClick={() => onViewModeChange('grid')}
            className="rounded-none"
          >
            <Grid3X3Icon size={18} />
          </Button>
          <Button
            variant={viewMode === 'list' ? 'default' : 'ghost'}
            size="icon"
            onClick={() => onViewModeChange('list')}
            className="rounded-none"
          >
            <ListIcon size={18} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WidgetSearch;
