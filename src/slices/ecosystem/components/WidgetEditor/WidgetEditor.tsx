
import React, { useState } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter 
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Widget, WidgetEditorProps } from '../../types';
import { Code, Settings, Eye, File } from 'lucide-react';
import { renderIcon } from '@/shared/icon-picker/utils';

// Define form schema
const widgetFormSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  category: z.string().min(1, "Please select a category"),
  version: z.string().regex(/^\d+\.\d+\.\d+$/, "Must be a valid semver version (e.g., 1.0.0)"),
  author: z.string().min(2, "Author must be at least 2 characters"),
  configuration: z.record(z.string(), z.any()).optional(),
});

const WidgetEditor: React.FC<WidgetEditorProps> = ({ widget, isOpen, onClose, onSave }) => {
  const [activeTab, setActiveTab] = useState('basic');
  
  // Create form
  const form = useForm<z.infer<typeof widgetFormSchema>>({
    resolver: zodResolver(widgetFormSchema),
    defaultValues: {
      title: widget.title,
      description: widget.description,
      category: widget.category,
      version: widget.version,
      author: widget.author,
      configuration: widget.configuration || {},
    },
  });

  const handleSave = (values: z.infer<typeof widgetFormSchema>) => {
    const updatedWidget: Widget = {
      ...widget,
      ...values,
    };
    onSave(updatedWidget);
    onClose();
  };

  // Available categories (should match the ones in your data store)
  const categories = [
    'Analytics', 
    'Data Visualization', 
    'Communication',
    'Productivity',
    'Integrations',
    'Monitoring',
    'Development'
  ];

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Edit Widget</DialogTitle>
        </DialogHeader>
        
        <Tabs defaultValue="basic" value={activeTab} onValueChange={setActiveTab} className="mt-4">
          <TabsList className="grid grid-cols-4 mb-6">
            <TabsTrigger value="basic" className="flex items-center gap-2">
              <File size={16} /> Basic Info
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings size={16} /> Settings
            </TabsTrigger>
            <TabsTrigger value="preview" className="flex items-center gap-2">
              <Eye size={16} /> Preview
            </TabsTrigger>
            <TabsTrigger value="code" className="flex items-center gap-2">
              <Code size={16} /> JSON
            </TabsTrigger>
          </TabsList>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSave)}>
              <TabsContent value="basic" className="space-y-6">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Widget title" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Widget description" 
                          className="min-h-[100px]" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Category</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {categories.map((category) => (
                              <SelectItem key={category} value={category}>
                                {category}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="version"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Version</FormLabel>
                        <FormControl>
                          <Input placeholder="1.0.0" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="author"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Author</FormLabel>
                      <FormControl>
                        <Input placeholder="Author name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TabsContent>
              
              <TabsContent value="settings">
                <div className="text-center text-muted-foreground py-10">
                  <p>Widget-specific settings will be displayed here based on the widget type.</p>
                </div>
              </TabsContent>
              
              <TabsContent value="preview">
                <div className="border rounded-lg p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 flex items-center justify-center rounded-md bg-primary/10 text-primary">
                      {/* Render widget icon using renderIcon utility */}
                      {typeof widget.icon === 'string' ? renderIcon(widget.icon, { size: 20 }) : widget.icon}
                    </div>
                    <div>
                      <h3 className="font-medium">{form.watch('title')}</h3>
                      <p className="text-sm text-muted-foreground">v{form.watch('version')}</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground">{form.watch('description')}</p>
                  <div className="flex flex-wrap gap-2 mt-4">
                    <div className="text-xs bg-secondary px-2 py-1 rounded-full">
                      {form.watch('category')}
                    </div>
                    <div className="text-xs bg-secondary px-2 py-1 rounded-full">
                      By {form.watch('author')}
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="code">
                <div className="rounded-lg bg-foreground/5 p-4 overflow-x-auto">
                  <pre className="text-sm font-mono text-foreground whitespace-pre">
                    <code>
                      {JSON.stringify({
                        id: widget.id,
                        title: form.watch('title'),
                        description: form.watch('description'),
                        category: form.watch('category'),
                        version: form.watch('version'),
                        author: form.watch('author'),
                        icon: widget.icon,
                        configuration: widget.configuration || {},
                      }, null, 2)}
                    </code>
                  </pre>
                </div>
              </TabsContent>
              
              <DialogFooter className="mt-6">
                <Button type="button" variant="outline" onClick={onClose}>
                  Cancel
                </Button>
                <Button type="submit">Save Changes</Button>
              </DialogFooter>
            </form>
          </Form>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default WidgetEditor;
