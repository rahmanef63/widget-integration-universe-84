
import React from 'react';
import { DevtoolsProvider } from '../contexts/devtools.context';
import { DevtoolsPanel } from '../components';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Logger } from '../utils/logger';
import { PerformanceMonitor } from '../utils/performance-monitor';
import { StateTracker } from '../utils/state-tracker';
import DashboardLayout from '@/slices/dashboard/components/DashboardLayout/DashboardLayout';
import DashboardHeader from '@/slices/dashboard/components/DashboardHeader/DashboardHeader';

const DevTools: React.FC = () => {
  const { toast } = useToast();
  
  // Demo function to create a log entry
  const createLogEntry = (level: 'info' | 'warning' | 'error' | 'debug') => {
    const messages = {
      info: 'This is an information message for testing',
      warning: 'Warning: This operation may be slow',
      error: 'Error: Failed to fetch data from the server',
      debug: 'Debug: Component rendered with props',
    };
    
    Logger.log(messages[level], level, { timestamp: new Date().toISOString() });
    
    toast({
      title: 'Log Created',
      description: `A new ${level} log entry has been created`,
    });
  };
  
  // Demo function to simulate a network request
  const simulateNetworkRequest = (status: number) => {
    const urls = {
      200: 'https://api.example.com/users',
      404: 'https://api.example.com/not-found',
      500: 'https://api.example.com/server-error',
    };
    
    // Make a fetch request
    fetch(urls[status as keyof typeof urls])
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error(error));
    
    toast({
      title: 'Network Request Sent',
      description: `A ${status} request has been simulated`,
    });
  };
  
  // Demo function to create performance metric
  const createPerformanceMetric = () => {
    PerformanceMonitor.recordMetric(
      'Custom Metric',
      Math.floor(Math.random() * 100),
      'points'
    );
    
    toast({
      title: 'Metric Created',
      description: 'A new performance metric has been created',
    });
  };
  
  // Demo function to capture state
  const captureCurrentState = () => {
    StateTracker.captureState('Manual capture from DevTools page');
    
    toast({
      title: 'State Captured',
      description: 'Current application state has been captured',
    });
  };
  
  // Demo data for localStorage
  const addDemoData = () => {
    localStorage.setItem('demo_user', JSON.stringify({
      id: '123',
      name: 'John Doe',
      email: 'john@example.com',
      preferences: {
        theme: 'dark',
        notifications: true,
      }
    }));
    
    localStorage.setItem('demo_settings', JSON.stringify({
      language: 'en',
      fontSize: 'medium',
      autoSave: true,
    }));
    
    toast({
      title: 'Demo Data Added',
      description: 'Sample data has been added to localStorage',
    });
  };

  return (
    <DevtoolsProvider>
      <DashboardLayout>
        <DashboardHeader
          title="Developer Tools"
          subtitle="Tools for debugging and monitoring the application"
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div className="space-y-4 p-4 border rounded-lg bg-card">
            <h3 className="text-lg font-medium">Logging</h3>
            <div className="flex flex-wrap gap-2">
              <Button onClick={() => createLogEntry('info')} variant="outline" size="sm">
                Create Info Log
              </Button>
              <Button onClick={() => createLogEntry('warning')} variant="outline" size="sm">
                Create Warning Log
              </Button>
              <Button onClick={() => createLogEntry('error')} variant="outline" size="sm">
                Create Error Log
              </Button>
              <Button onClick={() => createLogEntry('debug')} variant="outline" size="sm">
                Create Debug Log
              </Button>
            </div>
          </div>
          
          <div className="space-y-4 p-4 border rounded-lg bg-card">
            <h3 className="text-lg font-medium">Network</h3>
            <div className="flex flex-wrap gap-2">
              <Button onClick={() => simulateNetworkRequest(200)} variant="outline" size="sm">
                Simulate 200 OK
              </Button>
              <Button onClick={() => simulateNetworkRequest(404)} variant="outline" size="sm">
                Simulate 404 Not Found
              </Button>
              <Button onClick={() => simulateNetworkRequest(500)} variant="outline" size="sm">
                Simulate 500 Error
              </Button>
            </div>
          </div>
          
          <div className="space-y-4 p-4 border rounded-lg bg-card">
            <h3 className="text-lg font-medium">Performance</h3>
            <div className="flex flex-wrap gap-2">
              <Button onClick={createPerformanceMetric} variant="outline" size="sm">
                Add Random Metric
              </Button>
            </div>
          </div>
          
          <div className="space-y-4 p-4 border rounded-lg bg-card">
            <h3 className="text-lg font-medium">State Management</h3>
            <div className="flex flex-wrap gap-2">
              <Button onClick={captureCurrentState} variant="outline" size="sm">
                Capture Current State
              </Button>
              <Button onClick={addDemoData} variant="outline" size="sm">
                Add Demo State Data
              </Button>
            </div>
          </div>
        </div>
        
        <div className="mt-8 text-sm text-muted-foreground bg-secondary p-4 rounded-lg">
          <h3 className="font-medium mb-2">About Devtools</h3>
          <p>
            This devtools implementation uses localStorage for data persistence. In a production environment, 
            this would be replaced with proper API integration, database storage, authentication, and RBAC controls.
          </p>
          <p className="mt-2">
            Look for the Devtools button in the bottom right corner of the screen to access the devtools panel.
          </p>
        </div>
        
        <DevtoolsPanel />
      </DashboardLayout>
    </DevtoolsProvider>
  );
};

export default DevTools;
