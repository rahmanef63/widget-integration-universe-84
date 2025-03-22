
import React, { useState } from 'react';
import { useDevtools } from '../../contexts/devtools.context';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { PerformanceMetric } from '../../types';
import { PerformanceMonitor } from '../../utils/performance-monitor';

const PerformancePanel: React.FC = () => {
  const { performanceMetrics, clearPerformanceMetrics } = useDevtools();
  const [isMonitoring, setIsMonitoring] = useState(false);
  
  // Group metrics by name for charting
  const groupedMetrics: Record<string, { data: any[], unit: string }> = {};
  performanceMetrics.forEach(metric => {
    if (!groupedMetrics[metric.name]) {
      groupedMetrics[metric.name] = { data: [], unit: metric.unit };
    }
    
    groupedMetrics[metric.name].data.push({
      timestamp: metric.timestamp,
      value: metric.value,
      time: new Date(metric.timestamp).toLocaleTimeString(),
    });
  });
  
  // Sort the data chronologically for each group
  Object.keys(groupedMetrics).forEach(key => {
    groupedMetrics[key].data.sort((a, b) => a.timestamp - b.timestamp);
  });
  
  // Toggle performance monitoring
  const toggleMonitoring = () => {
    if (isMonitoring) {
      PerformanceMonitor.disable();
    } else {
      PerformanceMonitor.enable();
    }
    setIsMonitoring(!isMonitoring);
  };
  
  // Record a synthetic memory metric for demo purposes
  const recordMemoryMetric = () => {
    PerformanceMonitor.recordMetric(
      'Demo Memory',
      Math.floor(Math.random() * 1000),
      'MB'
    );
  };
  
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-4 p-2">
        <div className="space-x-2">
          <Button 
            variant={isMonitoring ? "destructive" : "default"} 
            size="sm" 
            onClick={toggleMonitoring}
          >
            {isMonitoring ? "Stop Monitoring" : "Start Monitoring"}
          </Button>
          
          <Button 
            variant="outline" 
            size="sm" 
            onClick={recordMemoryMetric}
          >
            Add Sample Metric
          </Button>
        </div>
        
        <Button 
          variant="destructive" 
          size="sm" 
          onClick={clearPerformanceMetrics}
        >
          Clear Metrics
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-2">
        {Object.keys(groupedMetrics).length === 0 ? (
          <div className="col-span-full text-center py-8">
            <p>No performance metrics available.</p>
            <p className="text-sm text-muted-foreground mt-2">
              Click "Start Monitoring" to begin collecting metrics
            </p>
          </div>
        ) : (
          Object.keys(groupedMetrics).map(metricName => (
            <Card key={metricName} className="overflow-hidden">
              <CardContent className="p-4">
                <h3 className="font-medium mb-2">{metricName} ({groupedMetrics[metricName].unit})</h3>
                <div className="h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={groupedMetrics[metricName].data}>
                      <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                      <XAxis 
                        dataKey="time" 
                        tick={{ fontSize: 10 }}
                        minTickGap={30}
                      />
                      <YAxis 
                        width={40}
                        tick={{ fontSize: 10 }}
                        domain={['auto', 'auto']}
                        tickFormatter={(value) => `${value}`}
                      />
                      <Tooltip 
                        formatter={(value) => [`${value} ${groupedMetrics[metricName].unit}`, metricName]}
                        labelFormatter={(label) => `Time: ${label}`}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="value" 
                        name={metricName}
                        stroke="#3b82f6" 
                        strokeWidth={2}
                        dot={{ r: 2 }}
                        activeDot={{ r: 4 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default PerformancePanel;
