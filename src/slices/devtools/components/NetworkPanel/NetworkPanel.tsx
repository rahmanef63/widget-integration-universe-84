
import React, { useState } from 'react';
import { useDevtools } from '../../contexts/devtools.context';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { NetworkRequest } from '../../types';
import { renderIcon } from '@/shared/icon-picker/utils';

const NetworkPanel: React.FC = () => {
  const { networkRequests, clearNetworkRequests } = useDevtools();
  const [filter, setFilter] = useState('');
  const [selectedRequest, setSelectedRequest] = useState<NetworkRequest | null>(null);
  
  // Filter requests based on search term
  const filteredRequests = networkRequests.filter(request => 
    request.url.toLowerCase().includes(filter.toLowerCase())
  );
  
  // Format time
  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString();
  };
  
  // Format duration
  const formatDuration = (duration?: number) => {
    if (!duration) return 'N/A';
    if (duration < 1000) return `${duration}ms`;
    return `${(duration / 1000).toFixed(2)}s`;
  };
  
  // Get status badge
  const getStatusBadge = (status: number) => {
    if (status === 0) return { color: 'bg-red-500', text: 'Error' };
    if (status >= 200 && status < 300) return { color: 'bg-green-500', text: status.toString() };
    if (status >= 300 && status < 400) return { color: 'bg-blue-500', text: status.toString() };
    if (status >= 400 && status < 500) return { color: 'bg-yellow-500', text: status.toString() };
    return { color: 'bg-red-500', text: status.toString() };
  };
  
  // Format headers
  const formatHeaders = (headers?: Record<string, string>) => {
    if (!headers) return 'No headers';
    
    return Object.entries(headers).map(([key, value]) => (
      <div key={key} className="mb-1">
        <span className="font-semibold">{key}:</span> {value}
      </div>
    ));
  };
  
  // Format body
  const formatBody = (body?: any) => {
    if (!body) return 'No body';
    
    if (typeof body === 'string') {
      try {
        const json = JSON.parse(body);
        return (
          <pre className="text-xs overflow-auto bg-secondary p-2 rounded">
            {JSON.stringify(json, null, 2)}
          </pre>
        );
      } catch (e) {
        return <div className="text-xs overflow-auto bg-secondary p-2 rounded">{body}</div>;
      }
    }
    
    return (
      <pre className="text-xs overflow-auto bg-secondary p-2 rounded">
        {JSON.stringify(body, null, 2)}
      </pre>
    );
  };
  
  // Show request details
  const showRequestDetails = (request: NetworkRequest) => {
    setSelectedRequest(request);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-4 p-2">
        <div className="flex items-center space-x-2">
          <Input
            placeholder="Filter URLs..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="w-64"
          />
        </div>
        <Button 
          variant="destructive" 
          size="sm" 
          onClick={clearNetworkRequests}
          className="ml-2"
        >
          Clear Requests
        </Button>
      </div>
      
      <ScrollArea className="flex-1">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-24">Time</TableHead>
              <TableHead className="w-20">Method</TableHead>
              <TableHead className="w-20">Status</TableHead>
              <TableHead>URL</TableHead>
              <TableHead className="w-24">Duration</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredRequests.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-4">
                  No network requests available
                </TableCell>
              </TableRow>
            ) : (
              filteredRequests.map((request) => {
                const statusBadge = getStatusBadge(request.status);
                
                return (
                  <TableRow 
                    key={request.id} 
                    className="cursor-pointer hover:bg-secondary/50"
                    onClick={() => showRequestDetails(request)}
                  >
                    <TableCell className="font-mono text-xs">{formatTime(request.startTime)}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{request.method}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={statusBadge.color}>{statusBadge.text}</Badge>
                    </TableCell>
                    <TableCell className="truncate max-w-[200px]">{request.url}</TableCell>
                    <TableCell>{formatDuration(request.duration)}</TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </ScrollArea>
      
      {/* Request details dialog */}
      <Dialog open={!!selectedRequest} onOpenChange={(open) => !open && setSelectedRequest(null)}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <Badge>{selectedRequest?.method}</Badge>
              <span className="truncate">{selectedRequest?.url}</span>
            </DialogTitle>
          </DialogHeader>
          
          {selectedRequest && (
            <Tabs defaultValue="request">
              <TabsList>
                <TabsTrigger value="request">Request</TabsTrigger>
                <TabsTrigger value="response">Response</TabsTrigger>
                <TabsTrigger value="timing">Timing</TabsTrigger>
              </TabsList>
              
              <TabsContent value="request" className="p-2 border rounded-md mt-2">
                <h4 className="font-medium mb-2">Headers</h4>
                <div className="mb-4 text-sm bg-secondary p-2 rounded">
                  {formatHeaders(selectedRequest.requestHeaders)}
                </div>
                
                <h4 className="font-medium mb-2">Body</h4>
                <div className="text-sm">
                  {formatBody(selectedRequest.requestBody)}
                </div>
              </TabsContent>
              
              <TabsContent value="response" className="p-2 border rounded-md mt-2">
                <div className="flex items-center space-x-2 mb-2">
                  <h4 className="font-medium">Status:</h4>
                  {selectedRequest.status > 0 ? (
                    <Badge className={getStatusBadge(selectedRequest.status).color}>
                      {selectedRequest.status} {selectedRequest.statusText}
                    </Badge>
                  ) : (
                    <Badge variant="destructive">Failed</Badge>
                  )}
                </div>
                
                {selectedRequest.error && (
                  <div className="mb-4 p-2 bg-red-100 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded text-red-600 dark:text-red-400">
                    {selectedRequest.error}
                  </div>
                )}
                
                <h4 className="font-medium mb-2">Headers</h4>
                <div className="mb-4 text-sm bg-secondary p-2 rounded">
                  {formatHeaders(selectedRequest.responseHeaders)}
                </div>
                
                <h4 className="font-medium mb-2">Body</h4>
                <div className="text-sm">
                  {formatBody(selectedRequest.responseBody)}
                </div>
              </TabsContent>
              
              <TabsContent value="timing" className="p-2 border rounded-md mt-2">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <h4 className="font-medium mb-1">Start Time</h4>
                    <div className="text-sm">{new Date(selectedRequest.startTime).toLocaleString()}</div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-1">End Time</h4>
                    <div className="text-sm">
                      {selectedRequest.endTime 
                        ? new Date(selectedRequest.endTime).toLocaleString() 
                        : 'N/A'}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-1">Duration</h4>
                    <div className="text-sm">{formatDuration(selectedRequest.duration)}</div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default NetworkPanel;
