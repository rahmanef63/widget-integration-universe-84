
import React, { useState } from 'react';
import WidgetCard from '@/components/WidgetCard';
import WidgetEditor from '../WidgetEditor/WidgetEditor';
import { Widget } from '@/slices/ecosystem/types';
import { Edit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface WidgetGridProps {
  widgets: Widget[];
  viewMode: 'grid' | 'list';
  onWidgetUpdate?: (updatedWidget: Widget) => void;
}

const WidgetGrid: React.FC<WidgetGridProps> = ({ 
  widgets, 
  viewMode,
  onWidgetUpdate = () => {} 
}) => {
  const [editingWidget, setEditingWidget] = useState<Widget | null>(null);
  const { toast } = useToast();

  const handleEditClick = (widget: Widget) => {
    setEditingWidget(widget);
  };

  const handleSaveWidget = (updatedWidget: Widget) => {
    onWidgetUpdate(updatedWidget);
    toast({
      title: "Widget updated",
      description: `${updatedWidget.title} has been successfully updated.`,
    });
  };

  if (widgets.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-muted-foreground">No widgets found matching your criteria.</p>
      </div>
    );
  }

  return (
    <>
      <div className={
        viewMode === 'grid' 
          ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" 
          : "flex flex-col gap-4"
      }>
        {widgets.map((widget) => (
          <div key={widget.id} className="group relative">
            <WidgetCard
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
            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button
                variant="secondary" 
                size="sm"
                className="h-8 w-8 p-0"
                onClick={() => handleEditClick(widget)}
              >
                <Edit size={14} />
                <span className="sr-only">Edit</span>
              </Button>
            </div>
          </div>
        ))}
      </div>

      {editingWidget && (
        <WidgetEditor
          widget={editingWidget}
          isOpen={!!editingWidget}
          onClose={() => setEditingWidget(null)}
          onSave={handleSaveWidget}
        />
      )}
    </>
  );
};

export default WidgetGrid;
