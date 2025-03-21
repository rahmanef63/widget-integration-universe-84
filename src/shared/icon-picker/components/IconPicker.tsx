
import React, { useState } from "react";
import { IconPickerProps } from "../types";
import { categorizedIconOptions, renderIcon } from "../utils";
import { Button } from "@/components/ui/button";
import { File } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const IconPicker: React.FC<IconPickerProps> = ({
  value,
  onChange,
  className,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const handleSelectChange = (newValue: string) => {
    onChange(newValue);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={isOpen}
          size="icon"
          className={`w-full justify-between ${className}`}
        >
          {renderIcon(value) || <File />}
          {value && <span className="sr-only">{value}</span>}
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[90vw] max-w-[800px]">
        <DialogHeader>
          <DialogTitle>Select an icon</DialogTitle>
          <DialogDescription>
            Choose an icon for your menu item
          </DialogDescription>
        </DialogHeader>
        
        <Tabs defaultValue="all" value={selectedCategory} onValueChange={setSelectedCategory}>
          <TabsList className="mb-4 flex flex-wrap h-auto">
            <TabsTrigger value="all">All Icons</TabsTrigger>
            {categorizedIconOptions.map((category) => (
              <TabsTrigger key={category.category} value={category.category}>
                {category.category}
              </TabsTrigger>
            ))}
          </TabsList>
          
          <ScrollArea className="h-[400px] rounded-md border p-4">
            {selectedCategory === "all" ? (
              <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-10 gap-2">
                {categorizedIconOptions.flatMap((category) => 
                  category.icons.map((option) => (
                    <Button
                      key={option.name}
                      variant="ghost"
                      className="flex flex-col items-center justify-center gap-1 h-16 hover:bg-muted/80 hover:scale-105 transition-all"
                      onClick={() => handleSelectChange(option.name)}
                    >
                      <option.icon className="h-6 w-6" />
                      <span className="text-xs truncate max-w-full">
                        {option.name}
                      </span>
                    </Button>
                  ))
                )}
              </div>
            ) : (
              <TabsContent value={selectedCategory} forceMount={true} className="mt-0 data-[state=inactive]:hidden">
                <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-10 gap-2">
                  {categorizedIconOptions
                    .find((category) => category.category === selectedCategory)
                    ?.icons.map((option) => (
                      <Button
                        key={option.name}
                        variant="ghost"
                        className="flex flex-col items-center justify-center gap-1 h-16 hover:bg-muted/80 hover:scale-105 transition-all"
                        onClick={() => handleSelectChange(option.name)}
                      >
                        <option.icon className="h-6 w-6" />
                        <span className="text-xs truncate max-w-full">
                          {option.name}
                        </span>
                      </Button>
                    ))}
                </div>
              </TabsContent>
            )}
          </ScrollArea>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};
