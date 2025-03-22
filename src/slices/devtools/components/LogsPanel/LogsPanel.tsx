
import React, { useState } from 'react';
import { useDevtools } from '../../contexts/devtools.context';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ScrollArea } from '@/components/ui/scroll-area';
import { LogEntry } from '../../types';
import { renderIcon } from '@/shared/icon-picker/utils';
import { cn } from '@/lib/utils';

const LogsPanel: React.FC = () => {
  const { logs, clearLogs } = useDevtools();
  const [filter, setFilter] = useState('');
  const [levelFilter, setLevelFilter] = useState<LogEntry['level'] | 'all'>('all');
  
  // Filter logs based on search term and level
  const filteredLogs = logs.filter(log => {
    const matchesSearch = log.message.toLowerCase().includes(filter.toLowerCase());
    const matchesLevel = levelFilter === 'all' || log.level === levelFilter;
    
    return matchesSearch && matchesLevel;
  });
  
  // Format timestamp
  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString();
  };
  
  // Get icon and color for log level
  const getLevelBadge = (level: LogEntry['level']) => {
    switch (level) {
      case 'error':
        return { icon: 'AlertTriangle', color: 'bg-red-500' };
      case 'warning':
        return { icon: 'AlertCircle', color: 'bg-yellow-500' };
      case 'info':
        return { icon: 'Info', color: 'bg-blue-500' };
      case 'debug':
        return { icon: 'Bug', color: 'bg-gray-500' };
      default:
        return { icon: 'Circle', color: 'bg-gray-500' };
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-4 p-2">
        <div className="flex items-center space-x-2">
          <Input
            placeholder="Filter logs..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="w-64"
          />
          <div className="flex space-x-1">
            {(['all', 'info', 'warning', 'error', 'debug'] as const).map((level) => (
              <Badge
                key={level}
                variant={levelFilter === level ? 'default' : 'outline'}
                className={cn(
                  'cursor-pointer',
                  levelFilter === level && level !== 'all' && getLevelBadge(level as Exclude<typeof level, 'all'>').color
                )}
                onClick={() => setLevelFilter(level)}
              >
                {level}
              </Badge>
            ))}
          </div>
        </div>
        <Button 
          variant="destructive" 
          size="sm" 
          onClick={clearLogs}
          className="ml-2"
        >
          Clear Logs
        </Button>
      </div>
      
      <ScrollArea className="flex-1">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-24">Time</TableHead>
              <TableHead className="w-20">Level</TableHead>
              <TableHead className="w-32">Source</TableHead>
              <TableHead>Message</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredLogs.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-4">
                  No logs available
                </TableCell>
              </TableRow>
            ) : (
              filteredLogs.map((log) => {
                const { icon, color } = getLevelBadge(log.level);
                
                return (
                  <TableRow key={log.id}>
                    <TableCell className="font-mono">{formatTime(log.timestamp)}</TableCell>
                    <TableCell>
                      <Badge 
                        variant="outline" 
                        className={cn("flex items-center space-x-1", color)}
                      >
                        {renderIcon(icon, { size: 12 })}
                        <span>{log.level}</span>
                      </Badge>
                    </TableCell>
                    <TableCell className="text-xs">{log.source || 'app'}</TableCell>
                    <TableCell>{log.message}</TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </ScrollArea>
    </div>
  );
};

export default LogsPanel;
