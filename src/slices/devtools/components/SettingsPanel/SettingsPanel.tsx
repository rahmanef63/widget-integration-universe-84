
import React from 'react';
import { useDevtools } from '../../contexts/devtools.context';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { DevtoolsConfig } from '../../types';

const SettingsPanel: React.FC = () => {
  const { config, updateConfig, clearAll } = useDevtools();
  
  // Toggle tabs
  const toggleTab = (tabId: string) => {
    const tabs = [...config.tabs];
    
    if (tabs.includes(tabId)) {
      // Remove tab if it exists
      updateConfig({
        tabs: tabs.filter(id => id !== tabId),
      });
    } else {
      // Add tab if it doesn't exist
      updateConfig({
        tabs: [...tabs, tabId],
      });
    }
  };
  
  // Handle position change
  const handlePositionChange = (position: DevtoolsConfig['position']) => {
    updateConfig({ position });
  };
  
  return (
    <div className="flex flex-col space-y-6 p-4">
      <Card>
        <CardHeader>
          <CardTitle>General Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="enabled">Enable Devtools</Label>
            <Switch
              id="enabled"
              checked={config.enabled}
              onCheckedChange={(checked) => updateConfig({ enabled: checked })}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <Label htmlFor="defaultOpen">Open on Startup</Label>
            <Switch
              id="defaultOpen"
              checked={config.defaultOpen}
              onCheckedChange={(checked) => updateConfig({ defaultOpen: checked })}
            />
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Position</CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup 
            value={config.position} 
            onValueChange={(value) => handlePositionChange(value as DevtoolsConfig['position'])}
            className="flex flex-col space-y-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="left" id="pos-left" />
              <Label htmlFor="pos-left">Left</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="right" id="pos-right" />
              <Label htmlFor="pos-right">Right</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="bottom" id="pos-bottom" />
              <Label htmlFor="pos-bottom">Bottom</Label>
            </div>
          </RadioGroup>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Enabled Tabs</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {[
            { id: 'logs', label: 'Logs' },
            { id: 'network', label: 'Network' },
            { id: 'performance', label: 'Performance' },
            { id: 'state', label: 'State' },
            { id: 'settings', label: 'Settings' },
          ].map((tab) => (
            <div key={tab.id} className="flex items-center justify-between">
              <Label htmlFor={`tab-${tab.id}`}>{tab.label}</Label>
              <Switch
                id={`tab-${tab.id}`}
                checked={config.tabs.includes(tab.id)}
                onCheckedChange={() => toggleTab(tab.id)}
                disabled={tab.id === 'settings'} // Settings tab is always enabled
              />
            </div>
          ))}
        </CardContent>
      </Card>
      
      <Separator />
      
      <div>
        <Button 
          variant="destructive" 
          onClick={clearAll}
          className="w-full"
        >
          Clear All Devtools Data
        </Button>
      </div>
    </div>
  );
};

export default SettingsPanel;
