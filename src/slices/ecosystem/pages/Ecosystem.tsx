
import React from 'react';
import { SearchIcon, FilterIcon, Grid3X3Icon, ListIcon } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import WidgetCard from '@/components/WidgetCard';

// Mock widget data for the ecosystem showcase
const mockWidgets = [
  {
    id: 'widget-1',
    title: 'Analytics Dashboard',
    description: 'Real-time data visualization with customizable metrics',
    icon: 'BarChart',
    category: 'Analytics',
    author: 'Data Team',
    version: '1.2.0',
  },
  {
    id: 'widget-2',
    title: 'User Management',
    description: 'Complete user administration with role-based access control',
    icon: 'Users',
    category: 'Administration',
    author: 'Admin Team',
    version: '2.0.1',
  },
  {
    id: 'widget-3',
    title: 'Content Editor',
    description: 'WYSIWYG editor with markdown support and media embedding',
    icon: 'Edit',
    category: 'Content',
    author: 'Publishing Team',
    version: '1.1.3',
  },
  {
    id: 'widget-4',
    title: 'Network Monitor',
    description: 'Monitor network performance and detect anomalies',
    icon: 'Activity',
    category: 'Monitoring',
    author: 'Infrastructure Team',
    version: '1.0.2',
  },
  {
    id: 'widget-5',
    title: 'Calendar Integration',
    description: 'Seamless calendar integration with meeting scheduling',
    icon: 'Calendar',
    category: 'Productivity',
    author: 'Collaboration Team',
    version: '2.1.0',
  },
  {
    id: 'widget-6',
    title: 'Notification Center',
    description: 'Centralized notification management with filtering options',
    icon: 'Bell',
    category: 'Communication',
    author: 'UX Team',
    version: '1.3.1',
  },
];

// Categories for filtering
const categories = [
  'All Categories',
  'Analytics',
  'Administration',
  'Content',
  'Monitoring',
  'Productivity',
  'Communication',
];

const Ecosystem: React.FC = () => {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [selectedCategory, setSelectedCategory] = React.useState('All Categories');
  const [viewMode, setViewMode] = React.useState('grid');

  // Filter widgets based on search term and category
  const filteredWidgets = mockWidgets.filter(widget => {
    const matchesSearch = widget.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        widget.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All Categories' || widget.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background pt-20 pb-16">
        <section className="container mx-auto px-4 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Widget Ecosystem</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Explore our comprehensive library of enterprise-ready widgets to enhance your applications
            </p>
          </div>

          {/* Search and Filter Section */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-grow">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
              <Input
                placeholder="Search widgets..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-4">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
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
                  onClick={() => setViewMode('grid')}
                  className="rounded-none"
                >
                  <Grid3X3Icon size={18} />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="icon"
                  onClick={() => setViewMode('list')}
                  className="rounded-none"
                >
                  <ListIcon size={18} />
                </Button>
              </div>
            </div>
          </div>

          {/* Tabs for different widget collections */}
          <Tabs defaultValue="featured" className="mb-8">
            <TabsList className="mb-6">
              <TabsTrigger value="featured">Featured</TabsTrigger>
              <TabsTrigger value="newest">Newest</TabsTrigger>
              <TabsTrigger value="popular">Popular</TabsTrigger>
              <TabsTrigger value="enterprise">Enterprise</TabsTrigger>
            </TabsList>
            
            <TabsContent value="featured" className="mt-0">
              {filteredWidgets.length === 0 ? (
                <div className="text-center py-10">
                  <p className="text-muted-foreground">No widgets found matching your criteria.</p>
                </div>
              ) : (
                <div className={
                  viewMode === 'grid' 
                    ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" 
                    : "flex flex-col gap-4"
                }>
                  {filteredWidgets.map((widget) => (
                    <WidgetCard
                      key={widget.id}
                      title={widget.title}
                      description={widget.description}
                      icon={widget.icon}
                      layout={viewMode === 'list' ? 'horizontal' : 'vertical'}
                      metadata={[
                        { label: 'Category', value: widget.category },
                        { label: 'Author', value: widget.author },
                        { label: 'Version', value: widget.version }
                      ]}
                    />
                  ))}
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="newest" className="mt-0">
              <div className="text-center py-10">
                <p className="text-muted-foreground">Newest widgets will be displayed here.</p>
              </div>
            </TabsContent>
            
            <TabsContent value="popular" className="mt-0">
              <div className="text-center py-10">
                <p className="text-muted-foreground">Popular widgets will be displayed here.</p>
              </div>
            </TabsContent>
            
            <TabsContent value="enterprise" className="mt-0">
              <div className="text-center py-10">
                <p className="text-muted-foreground">Enterprise widgets will be displayed here.</p>
              </div>
            </TabsContent>
          </Tabs>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Ecosystem;
