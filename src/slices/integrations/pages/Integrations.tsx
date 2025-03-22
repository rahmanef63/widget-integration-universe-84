
import React from 'react';
import { IntegrationLayout } from '../components';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

const Integrations: React.FC = () => {
  return (
    <IntegrationLayout>
      <div className="mb-6 flex justify-between items-center">
        <div>
          <Button size="sm">
            <Plus className="mr-2 h-4 w-4" />
            Add Integration
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-card p-4 rounded-lg border shadow-sm">
          <h3 className="text-lg font-medium mb-2">Available Integrations</h3>
          <p className="text-muted-foreground">Connect your widgets with external services</p>
        </div>
        <div className="bg-card p-4 rounded-lg border shadow-sm">
          <h3 className="text-lg font-medium mb-2">Connected Services</h3>
          <p className="text-muted-foreground">No services connected yet</p>
        </div>
        <div className="bg-card p-4 rounded-lg border shadow-sm">
          <h3 className="text-lg font-medium mb-2">Recently Used</h3>
          <p className="text-muted-foreground">No recent integrations</p>
        </div>
      </div>
    </IntegrationLayout>
  );
};

export default Integrations;
