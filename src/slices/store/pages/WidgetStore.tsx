
import React from 'react';
import { StoreLayout } from '../components';

const WidgetStore: React.FC = () => {
  return (
    <StoreLayout>
      <div className="mb-6">
        <div className="relative">
          <input 
            type="text" 
            placeholder="Search widgets..." 
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-card p-4 rounded-lg border shadow-sm">
          <h3 className="text-lg font-medium mb-2">Featured Widgets</h3>
          <p className="text-muted-foreground">Store content coming soon</p>
        </div>
        <div className="bg-card p-4 rounded-lg border shadow-sm">
          <h3 className="text-lg font-medium mb-2">Popular</h3>
          <p className="text-muted-foreground">Store content coming soon</p>
        </div>
        <div className="bg-card p-4 rounded-lg border shadow-sm">
          <h3 className="text-lg font-medium mb-2">New Arrivals</h3>
          <p className="text-muted-foreground">Store content coming soon</p>
        </div>
      </div>
    </StoreLayout>
  );
};

export default WidgetStore;
