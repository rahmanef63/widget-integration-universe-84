
import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import EcosystemHero from '../components/EcosystemHero/EcosystemHero';
import WidgetSearch from '../components/WidgetSearch/WidgetSearch';
import WidgetTabs from '../components/WidgetTabs/WidgetTabs';
import { mockWidgets, categories } from '../data/widgets';
import { Widget } from '../types';
import { useToast } from '@/hooks/use-toast';

const Ecosystem: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [widgets, setWidgets] = useState<Widget[]>(mockWidgets);
  const [filteredWidgets, setFilteredWidgets] = useState<Widget[]>(mockWidgets);
  const { toast } = useToast();

  // Filter widgets based on search term and category
  useEffect(() => {
    const filtered = widgets.filter(widget => {
      const matchesSearch = widget.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          widget.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'All Categories' || widget.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
    
    setFilteredWidgets(filtered);
  }, [searchTerm, selectedCategory, widgets]);

  // Handle widget update
  const handleWidgetUpdate = (updatedWidget: Widget) => {
    const updatedWidgets = widgets.map(widget => 
      widget.id === updatedWidget.id ? updatedWidget : widget
    );
    setWidgets(updatedWidgets);
    toast({
      title: "Widget updated",
      description: `${updatedWidget.title} has been successfully updated.`,
    });
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background pt-20 pb-16">
        <EcosystemHero />
        
        <section className="container mx-auto px-4 py-12">
          <WidgetSearch 
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            viewMode={viewMode}
            onViewModeChange={(mode) => setViewMode(mode as 'grid' | 'list')}
            categories={categories}
          />
          
          <WidgetTabs 
            filteredWidgets={filteredWidgets} 
            viewMode={viewMode}
            onWidgetUpdate={handleWidgetUpdate}
          />
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Ecosystem;
