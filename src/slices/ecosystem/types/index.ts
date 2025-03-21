
export interface Widget {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: string;
  author: string;
  version: string;
  configuration?: Record<string, any>;
}

export interface FilterOptions {
  searchTerm: string;
  category: string;
  viewMode: 'grid' | 'list';
}

export interface WidgetEditorProps {
  widget: Widget;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedWidget: Widget) => void;
}
