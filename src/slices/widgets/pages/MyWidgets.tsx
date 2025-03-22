
import React from 'react';
import { WidgetLayout } from '../components';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

const MyWidgets: React.FC = () => {
  return (
    <WidgetLayout>
      <div className="mb-6 flex justify-between items-center">
        <div>
          <Button size="sm">
            <Plus className="mr-2 h-4 w-4" />
            Add Widget
          </Button>
        </div>
      </div>
      
      <div className="bg-card p-4 rounded-lg border shadow-sm mb-6">
        <h3 className="text-lg font-medium mb-2">My Widgets</h3>
        <p className="text-muted-foreground">You don't have any widgets installed yet. Visit the Widget Store to browse available widgets.</p>
      </div>
    </WidgetLayout>
  );
};

export default MyWidgets;
