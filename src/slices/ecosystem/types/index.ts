
export interface Widget {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: string;
  author: string;
  version: string;
}

export interface FilterOptions {
  searchTerm: string;
  category: string;
  viewMode: 'grid' | 'list';
}
