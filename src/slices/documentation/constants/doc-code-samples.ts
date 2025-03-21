
// Code samples for documentation

export const DOC_CODE_SAMPLES = {
  // Widget Interface
  widgetInterfaceCode: `interface WidgetProps {
  id: string;
  title: string;
  config: WidgetConfig;
  onDataUpdate?: (data: any) => void;
  onError?: (error: Error) => void;
  permissions: string[];
}

interface WidgetConfig {
  dataSource?: string;
  refreshInterval?: number;
  appearance?: {
    theme?: 'light' | 'dark' | 'system';
    showControls?: boolean;
    showHeader?: boolean;
  };
  [key: string]: any;
}

// Widget component type definition
export type WidgetComponent = React.FC<WidgetProps>;`,

  // Widget Loader
  widgetLoaderCode: `import React, { useState, useEffect } from 'react';
import { WidgetSandbox } from './WidgetSandbox';

interface WidgetLoaderProps {
  widgetId: string;
  config?: Record<string, any>;
}

export const WidgetLoader: React.FC<WidgetLoaderProps> = ({ 
  widgetId, 
  config = {} 
}) => {
  const [widgetData, setWidgetData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // Load widget definition from store
    widgetStore.getWidget(widgetId)
      .then(data => {
        setWidgetData(data);
        setIsLoading(false);
      })
      .catch(err => {
        setError(err);
        setIsLoading(false);
      });
  }, [widgetId]);

  if (isLoading) return <WidgetSkeleton />;
  if (error) return <WidgetError error={error} />;
  if (!widgetData) return null;

  return (
    <WidgetSandbox
      widgetUrl={widgetData.url}
      config={config}
      permissions={widgetData.permissions}
    />
  );
}`,

  // Widget Component Example
  widgetComponentCode: `import React, { useState, useEffect } from 'react';
import { WidgetProps, useWidgetAPI } from '@widget-platform/core';

export const AnalyticsWidget: React.FC<WidgetProps> = ({
  id,
  config,
  onDataUpdate,
  onError
}) => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const api = useWidgetAPI();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Use the widget API to fetch data
        const response = await api.data.fetch(config.dataSource);
        setData(response);
        onDataUpdate?.(response);
      } catch (error) {
        onError?.(error as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    
    // Set up refresh interval if configured
    if (config.refreshInterval) {
      const intervalId = setInterval(fetchData, config.refreshInterval);
      return () => clearInterval(intervalId);
    }
  }, [config.dataSource, config.refreshInterval]);

  // Apply theme from config or use system default
  const theme = config.appearance?.theme || 'system';

  return (
    <div className={\`widget-container \${theme}\`}>
      {config.appearance?.showHeader && (
        <header className="widget-header">
          <h3>{config.title || "Analytics Widget"}</h3>
          {config.appearance?.showControls && (
            <div className="widget-controls">
              <button onClick={() => fetchData()}>Refresh</button>
            </div>
          )}
        </header>
      )}
      
      <div className="widget-content">
        {loading ? (
          <div className="widget-loading">Loading data...</div>
        ) : (
          <AnalyticsChart data={data} />
        )}
      </div>
    </div>
  );
};

export default AnalyticsWidget;`,

  // Widget Metadata Sample
  widgetMetadataCode: `{
  "id": "analytics-dashboard",
  "name": "Analytics Dashboard",
  "version": "1.2.0",
  "description": "Comprehensive analytics dashboard with real-time data visualization",
  "author": {
    "name": "Widget Systems Inc.",
    "email": "support@widgetsystems.example",
    "url": "https://widgetsystems.example"
  },
  "license": "MIT",
  "repository": {
    "type": "git",
    "url": "https://github.com/widgetsystems/analytics-widget"
  },
  "categories": ["analytics", "dashboard", "reporting"],
  "tags": ["metrics", "charts", "real-time", "visualization"],
  "dependencies": {
    "chart-widget": "^2.0.0",
    "data-connector": "^1.1.0"
  },
  "permissions": [
    "data:read:metrics",
    "api:call:analytics",
    "storage:write:user-preferences"
  ],
  "config": {
    "schema": {
      "dataSource": {
        "type": "string",
        "description": "Data source identifier",
        "required": true
      },
      "refreshInterval": {
        "type": "number",
        "description": "Data refresh interval in milliseconds",
        "default": 60000
      },
      "appearance": {
        "type": "object",
        "properties": {
          "theme": {
            "type": "string",
            "enum": ["light", "dark", "system"],
            "default": "system"
          },
          "showControls": {
            "type": "boolean",
            "default": true
          }
        }
      }
    },
    "defaults": {
      "refreshInterval": 60000,
      "appearance": {
        "theme": "system",
        "showControls": true
      }
    }
  },
  "resources": {
    "thumbnail": "https://cdn.widgetstore.example/analytics-widget/thumbnail.png",
    "screenshots": [
      "https://cdn.widgetstore.example/analytics-widget/screenshot1.png",
      "https://cdn.widgetstore.example/analytics-widget/screenshot2.png"
    ],
    "documentation": "https://docs.widgetstore.example/analytics-widget"
  }
}`,

  // Widget API Reference
  widgetApiCode: `// Widget API interface
interface WidgetAPI {
  // Lifecycle methods
  initialize(config: WidgetConfig): Promise<void>;
  mount(element: HTMLElement): void;
  unmount(): void;
  
  // Data methods
  data: {
    fetch(source: string, params?: any): Promise<any>;
    query(queryString: string): Promise<any>;
    subscribe(source: string, callback: (data: any) => void): () => void;
    save(data: any): Promise<void>;
  };
  
  // UI methods
  ui: {
    showNotification(message: string, type?: 'info' | 'success' | 'warning' | 'error'): void;
    showModal(content: JSX.Element): void;
    closeModal(): void;
    setTheme(theme: 'light' | 'dark' | 'system'): void;
  };
  
  // Event methods
  events: {
    on(event: string, callback: (data: any) => void): () => void;
    emit(event: string, data?: any): void;
  };
  
  // Context methods
  context: {
    getUser(): User;
    getPermissions(): string[];
    getEnvironment(): 'development' | 'staging' | 'production';
  };
  
  // Storage methods
  storage: {
    get(key: string): Promise<any>;
    set(key: string, value: any): Promise<void>;
    remove(key: string): Promise<void>;
  };
  
  // Logging and monitoring
  monitoring: {
    logError(error: Error): void;
    logMetric(name: string, value: number): void;
    startTimer(name: string): () => void;
    enablePerformanceTracking(): void;
  };
}

// Usage example:
const api = useWidgetAPI();

// Fetch data from configured source
const data = await api.data.fetch('sales-metrics');

// Subscribe to real-time updates
const unsubscribe = api.data.subscribe('user-activity', (activity) => {
  updateActivityFeed(activity);
});

// Show a notification to the user
api.ui.showNotification('Data updated successfully', 'success');

// Listen for events from other widgets
api.events.on('filter-changed', (filters) => {
  applyFilters(filters);
});

// Clean up when component unmounts
useEffect(() => {
  return () => {
    unsubscribe();
  };
}, []);`
};
