
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import WidgetGrid from '../WidgetGrid/WidgetGrid';
import { Widget } from '../../types';

interface WidgetTabsProps {
  filteredWidgets: Widget[];
  viewMode: 'grid' | 'list';
}

const WidgetTabs: React.FC<WidgetTabsProps> = ({ filteredWidgets, viewMode }) => {
  return (
    <Tabs defaultValue="featured" className="mb-8">
      <TabsList className="mb-6">
        <TabsTrigger value="featured">Featured</TabsTrigger>
        <TabsTrigger value="newest">Newest</TabsTrigger>
        <TabsTrigger value="popular">Popular</TabsTrigger>
        <TabsTrigger value="enterprise">Enterprise</TabsTrigger>
      </TabsList>
      
      <TabsContent value="featured" className="mt-0">
        <WidgetGrid widgets={filteredWidgets} viewMode={viewMode} />
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
  );
};

export default WidgetTabs;
