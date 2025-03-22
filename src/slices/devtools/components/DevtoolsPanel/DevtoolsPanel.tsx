
import React, { useEffect } from 'react';
import { useDevtools } from '../../contexts/devtools.context';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { renderIcon } from '@/shared/icon-picker/utils';
import LogsPanel from '../LogsPanel/LogsPanel';
import NetworkPanel from '../NetworkPanel/NetworkPanel';
import PerformancePanel from '../PerformancePanel/PerformancePanel';
import StatePanel from '../StatePanel/StatePanel';
import SettingsPanel from '../SettingsPanel/SettingsPanel';
import { PerformanceMonitor } from '../../utils/performance-monitor';
import { NetworkInterceptor } from '../../utils/network-interceptor';
import { StateTracker } from '../../utils/state-tracker';

interface DevtoolsPanelProps {
  className?: string;
}

const DevtoolsPanel: React.FC<DevtoolsPanelProps> = ({ className }) => {
  const { 
    isOpen, 
    toggleDevtools, 
    config, 
    activeTab, 
    setActiveTab
  } = useDevtools();
  
  // Determine panel position class
  const positionClasses = {
    bottom: 'fixed bottom-0 left-0 right-0 h-[40vh] border-t',
    left: 'fixed left-0 top-0 bottom-0 w-[30rem] border-r',
    right: 'fixed right-0 top-0 bottom-0 w-[30rem] border-l',
  };
  
  // Set up monitoring tools - ALWAYS run this effect regardless of config state
  useEffect(() => {
    if (config.enabled) {
      // Initialize network interceptor
      NetworkInterceptor.enable();
      
      // Initialize performance monitoring
      if (config.tabs.includes('performance')) {
        PerformanceMonitor.enable();
      }
      
      // Add state tracker sources
      StateTracker.addStateSource('localStorage', () => {
        const data: Record<string, any> = {};
        for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i);
          if (key) {
            try {
              data[key] = JSON.parse(localStorage.getItem(key) || '');
            } catch (e) {
              data[key] = localStorage.getItem(key);
            }
          }
        }
        return data;
      });
      
      // Clean up
      return () => {
        NetworkInterceptor.disable();
        PerformanceMonitor.disable();
      };
    }
  }, [config.enabled, config.tabs]);
  
  // If devtools are disabled, render nothing
  if (!config.enabled) return null;
  
  // If devtools are not open, render only the toggle button
  if (!isOpen) {
    return (
      <Button 
        variant="outline" 
        size="sm" 
        className="fixed bottom-4 right-4 z-50 opacity-70 hover:opacity-100"
        onClick={toggleDevtools}
      >
        {renderIcon('Wrench', { size: 16 })}
        <span className="ml-2">Devtools</span>
      </Button>
    );
  }
  
  // Set active tab outside of render to prevent hooks inconsistency errors
  // Move this to a separate useEffect that always runs
  useEffect(() => {
    if (!config.tabs.includes(activeTab) && config.tabs.length > 0) {
      setActiveTab(config.tabs[0]);
    }
  }, [activeTab, config.tabs, setActiveTab]);
  
  // Available tabs configuration
  const tabsConfig = [
    { id: 'logs', label: 'Logs', icon: 'MessageSquare', component: <LogsPanel /> },
    { id: 'network', label: 'Network', icon: 'Globe', component: <NetworkPanel /> },
    { id: 'performance', label: 'Performance', icon: 'LineChart', component: <PerformancePanel /> },
    { id: 'state', label: 'State', icon: 'Database', component: <StatePanel /> },
    { id: 'settings', label: 'Settings', icon: 'Settings', component: <SettingsPanel /> },
  ];
  
  // Filter tabs based on config
  const enabledTabs = tabsConfig.filter(
    tab => config.tabs.includes(tab.id) || tab.id === 'settings'
  );
  
  return (
    <div 
      className={cn(
        "bg-background z-50 shadow-lg",
        positionClasses[config.position],
        config.position === 'bottom' ? 'flex flex-col' : '',
        className
      )}
    >
      <div className={cn(
        "flex items-center justify-between p-2 border-b", 
        config.position === 'bottom' ? 'px-4' : ''
      )}>
        <h2 className="text-sm font-medium flex items-center">
          {renderIcon('Wrench', { size: 16 })}
          <span className="ml-2">Devtools</span>
        </h2>
        <Button 
          variant="ghost" 
          size="sm" 
          className="h-7 w-7 p-0" 
          onClick={toggleDevtools}
        >
          {renderIcon('X', { size: 14 })}
        </Button>
      </div>
      
      <Tabs 
        value={activeTab} 
        onValueChange={setActiveTab}
        className={cn(
          "flex-1",
          config.position === 'bottom' ? 'flex flex-col' : ''
        )}
      >
        <TabsList 
          className={cn(
            "bg-background h-auto p-0 border-b", 
            config.position === 'bottom' ? 'flex justify-start' : 'grid grid-cols-1'
          )}
        >
          {enabledTabs.map(tab => (
            <TabsTrigger 
              key={tab.id}
              value={tab.id}
              className={cn(
                "rounded-none py-2 px-4 flex items-center",
                config.position !== 'bottom' && 'justify-start',
                config.position !== 'bottom' ? 'border-b border-r-0' : 'border-r'
              )}
            >
              {renderIcon(tab.icon, { size: 14, className: 'mr-2' })}
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
        
        {enabledTabs.map(tab => (
          <TabsContent 
            key={tab.id}
            value={tab.id}
            className="flex-1 m-0 outline-none"
          >
            {tab.component}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default DevtoolsPanel;
