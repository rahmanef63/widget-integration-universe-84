
import React from 'react';
import { AnalyticsLayout } from '../components';

const Analytics: React.FC = () => {
  return (
    <AnalyticsLayout>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-card p-4 rounded-lg border shadow-sm">
          <h3 className="text-lg font-medium mb-2">Usage Metrics</h3>
          <p className="text-muted-foreground">Analytics dashboard coming soon</p>
        </div>
        <div className="bg-card p-4 rounded-lg border shadow-sm">
          <h3 className="text-lg font-medium mb-2">User Engagement</h3>
          <p className="text-muted-foreground">User stats coming soon</p>
        </div>
      </div>
      <div className="bg-card p-4 rounded-lg border shadow-sm">
        <h3 className="text-lg font-medium mb-2">Performance Overview</h3>
        <p className="text-muted-foreground">Detailed metrics and charts will be displayed here</p>
      </div>
    </AnalyticsLayout>
  );
};

export default Analytics;
