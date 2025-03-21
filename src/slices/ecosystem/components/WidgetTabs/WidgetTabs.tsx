
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import WidgetGrid from '../WidgetGrid/WidgetGrid';
import { Widget } from '../../types';

interface WidgetTabsProps {
  filteredWidgets: Widget[];
  viewMode: 'grid' | 'list';
  onWidgetUpdate?: (updatedWidget: Widget) => void;
}

const WidgetTabs: React.FC<WidgetTabsProps> = ({ 
  filteredWidgets, 
  viewMode,
  onWidgetUpdate 
}) => {
  // Group widgets by some criteria (e.g., Featured, Popular, New)
  const featuredWidgets = filteredWidgets.slice(0, 6);
  const popularWidgets = [...filteredWidgets]
    .sort((a, b) => b.id.localeCompare(a.id))
    .slice(0, 6);
  const newWidgets = [...filteredWidgets]
    .sort((a, b) => b.version.localeCompare(a.version))
    .slice(0, 6);

  return (
    <Tabs defaultValue="all" className="mt-8">
      <TabsList className="mb-6">
        <TabsTrigger value="all">All Widgets</TabsTrigger>
        <TabsTrigger value="featured">Featured</TabsTrigger>
        <TabsTrigger value="popular">Popular</TabsTrigger>
        <TabsTrigger value="new">New</TabsTrigger>
      </TabsList>
      
      <TabsContent value="all">
        <WidgetGrid 
          widgets={filteredWidgets} 
          viewMode={viewMode} 
          onWidgetUpdate={onWidgetUpdate}
        />
      </TabsContent>
      
      <TabsContent value="featured">
        <WidgetGrid 
          widgets={featuredWidgets} 
          viewMode={viewMode} 
          onWidgetUpdate={onWidgetUpdate}
        />
      </TabsContent>
      
      <TabsContent value="popular">
        <WidgetGrid 
          widgets={popularWidgets} 
          viewMode={viewMode} 
          onWidgetUpdate={onWidgetUpdate}
        />
      </TabsContent>
      
      <TabsContent value="new">
        <WidgetGrid 
          widgets={newWidgets} 
          viewMode={viewMode} 
          onWidgetUpdate={onWidgetUpdate}
        />
      </TabsContent>
    </Tabs>
  );
};

export default WidgetTabs;
