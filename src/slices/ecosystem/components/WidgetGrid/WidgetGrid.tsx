
import React from 'react';
import WidgetCard from '@/components/WidgetCard';
import { Widget } from '@/slices/ecosystem/types';

interface WidgetGridProps {
  widgets: Widget[];
  viewMode: 'grid' | 'list';
}

const WidgetGrid: React.FC<WidgetGridProps> = ({ widgets, viewMode }) => {
  if (widgets.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-muted-foreground">No widgets found matching your criteria.</p>
      </div>
    );
  }

  return (
    <div className={
      viewMode === 'grid' 
        ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" 
        : "flex flex-col gap-4"
    }>
      {widgets.map((widget) => (
        <WidgetCard
          key={widget.id}
          title={widget.title}
          description={widget.description}
          icon={widget.icon}
          layout={viewMode === 'list' ? 'horizontal' : 'vertical'}
          metadata={[
            { label: 'Category', value: widget.category },
            { label: 'Author', value: widget.author },
            { label: 'Version', value: widget.version }
          ]}
        />
      ))}
    </div>
  );
};

export default WidgetGrid;
