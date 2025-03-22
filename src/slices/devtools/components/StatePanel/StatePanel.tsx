
import React, { useState } from 'react';
import { useDevtools } from '../../contexts/devtools.context';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { StateTracker } from '../../utils/state-tracker';
import { StateSnapshot } from '../../types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const StatePanel: React.FC = () => {
  const { stateSnapshots, clearStateSnapshots } = useDevtools();
  const [selectedSnapshot, setSelectedSnapshot] = useState<StateSnapshot | null>(null);
  const [selectedSourceName, setSelectedSourceName] = useState<string | null>(null);
  
  // Get unique source names
  const sourceNames = stateSnapshots.length > 0
    ? Array.from(new Set(Object.keys(stateSnapshots[0]?.state || {})))
    : [];
  
  // Take a new snapshot
  const captureState = () => {
    StateTracker.captureState('Manual capture');
  };
  
  // Format timestamp
  const formatTime = (timestamp: number) => {
    return new Date(timestamp).toLocaleString();
  };
  
  // Show snapshot details
  const showSnapshotDetails = (snapshot: StateSnapshot) => {
    setSelectedSnapshot(snapshot);
  };
  
  // Format JSON for display
  const formatJson = (obj: any) => {
    return (
      <pre className="text-xs overflow-auto bg-secondary p-2 rounded">
        {JSON.stringify(obj, null, 2)}
      </pre>
    );
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-4 p-2">
        <div className="space-x-2">
          <Button 
            variant="default" 
            size="sm" 
            onClick={captureState}
          >
            Capture Current State
          </Button>
          
          {sourceNames.length > 0 && (
            <Select
              value={selectedSourceName || undefined}
              onValueChange={setSelectedSourceName}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by source" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All sources</SelectItem>
                {sourceNames.map(name => (
                  <SelectItem key={name} value={name}>{name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </div>
        
        <Button 
          variant="destructive" 
          size="sm" 
          onClick={clearStateSnapshots}
        >
          Clear Snapshots
        </Button>
      </div>
      
      <ScrollArea className="flex-1 px-2">
        {stateSnapshots.length === 0 ? (
          <div className="text-center py-8">
            <p>No state snapshots available.</p>
            <p className="text-sm text-muted-foreground mt-2">
              Click "Capture Current State" to take a snapshot
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {stateSnapshots.map((snapshot) => (
              <Card 
                key={snapshot.id} 
                className="cursor-pointer hover:bg-secondary/50"
                onClick={() => showSnapshotDetails(snapshot)}
              >
                <CardHeader className="py-3 px-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-medium">
                      {snapshot.description || 'State Snapshot'}
                    </CardTitle>
                    <span className="text-xs text-muted-foreground">
                      {formatTime(snapshot.timestamp)}
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="py-2 px-4">
                  <div className="text-xs">
                    {Object.keys(snapshot.state).length} sources, {
                      Object.values(snapshot.state).reduce((count, source) => {
                        return count + Object.keys(source).length;
                      }, 0)
                    } properties
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </ScrollArea>
      
      {/* Snapshot details dialog */}
      <Dialog open={!!selectedSnapshot} onOpenChange={(open) => !open && setSelectedSnapshot(null)}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {selectedSnapshot?.description || 'State Snapshot'}
              <div className="text-xs text-muted-foreground mt-1">
                {selectedSnapshot && formatTime(selectedSnapshot.timestamp)}
              </div>
            </DialogTitle>
          </DialogHeader>
          
          {selectedSnapshot && (
            <Tabs defaultValue="sources">
              <TabsList>
                <TabsTrigger value="sources">By Source</TabsTrigger>
                <TabsTrigger value="all">All State</TabsTrigger>
              </TabsList>
              
              <TabsContent value="sources" className="p-2 border rounded-md mt-2">
                <div className="space-y-4">
                  {Object.entries(selectedSnapshot.state).map(([sourceName, sourceState]) => (
                    <div key={sourceName}>
                      <h4 className="font-medium mb-2">{sourceName}</h4>
                      {formatJson(sourceState)}
                    </div>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="all" className="p-2 border rounded-md mt-2">
                {formatJson(selectedSnapshot.state)}
              </TabsContent>
            </Tabs>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default StatePanel;
