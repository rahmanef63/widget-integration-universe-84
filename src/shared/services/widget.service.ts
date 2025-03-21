import { StorageService, STORAGE_KEYS } from './storage.service';
import { WidgetBase } from '@/core/types';

// Initial widget data for demonstration
const initialWidgets: WidgetBase[] = [
  {
    id: 'widget-analytics',
    title: 'Analytics Dashboard',
    description: 'Comprehensive analytics with real-time data visualization and insights.',
    icon: 'Zap'
  },
  {
    id: 'widget-database',
    title: 'Database Explorer',
    description: 'Explore and query databases with intuitive interface and schema visualization.',
    icon: 'Database'
  },
  {
    id: 'widget-server',
    title: 'Server Monitoring',
    description: 'Real-time server performance metrics and health status visualization.',
    icon: 'Server'
  },
  {
    id: 'widget-security',
    title: 'Security Scanner',
    description: 'Scan for vulnerabilities and security issues in your infrastructure.',
    icon: 'Shield'
  },
  {
    id: 'widget-code',
    title: 'Code Analyzer',
    description: 'Analyze code quality, find bugs and suggest improvements automatically.',
    icon: 'Code'
  },
  {
    id: 'widget-globe',
    title: 'Global CDN',
    description: 'Manage content delivery network with global reach and edge optimization.',
    icon: 'Globe2'
  },
  {
    id: 'widget-layout',
    title: 'Layout Builder',
    description: 'Drag-and-drop layout builder for creating custom dashboards.',
    icon: 'Layout'
  }
];

/**
 * Widget service for managing widget data
 * This uses localStorage now but will be replaced with an API
 */
export class WidgetService {
  /**
   * Initialize the widget store
   */
  public static initialize(): void {
    const existingWidgets = StorageService.getItem<WidgetBase[]>(STORAGE_KEYS.WIDGETS, []);
    
    if (existingWidgets.length === 0) {
      StorageService.setItem(STORAGE_KEYS.WIDGETS, initialWidgets);
    }
  }

  /**
   * Get all widgets
   */
  public static getWidgets(): WidgetBase[] {
    return StorageService.getItem<WidgetBase[]>(STORAGE_KEYS.WIDGETS, initialWidgets);
  }

  /**
   * Get widget by ID
   */
  public static getWidgetById(id: string): WidgetBase | undefined {
    const widgets = this.getWidgets();
    return widgets.find(widget => widget.id === id);
  }

  /**
   * Add a new widget
   */
  public static addWidget(widget: WidgetBase): WidgetBase {
    const widgets = this.getWidgets();
    const newWidgets = [...widgets, widget];
    StorageService.setItem(STORAGE_KEYS.WIDGETS, newWidgets);
    return widget;
  }

  /**
   * Update an existing widget
   */
  public static updateWidget(id: string, updates: Partial<WidgetBase>): WidgetBase | undefined {
    const widgets = this.getWidgets();
    const index = widgets.findIndex(widget => widget.id === id);
    
    if (index === -1) return undefined;
    
    const updatedWidget = { ...widgets[index], ...updates };
    widgets[index] = updatedWidget;
    StorageService.setItem(STORAGE_KEYS.WIDGETS, widgets);
    return updatedWidget;
  }

  /**
   * Delete a widget
   */
  public static deleteWidget(id: string): boolean {
    const widgets = this.getWidgets();
    const newWidgets = widgets.filter(widget => widget.id !== id);
    
    if (newWidgets.length === widgets.length) return false;
    
    StorageService.setItem(STORAGE_KEYS.WIDGETS, newWidgets);
    return true;
  }
}

// Initialize widgets on import
WidgetService.initialize();
