
import React, { useState } from "react";
import { IconPickerProps } from "../types";
import { iconOptions, renderIcon } from "../utils";
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

export const IconPicker: React.FC<IconPickerProps> = ({
  value,
  onChange,
  className,
}) => {
  const [isOpen, setIsOpen] = useState(false);

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
      <DialogContent className="w-[360px] sm:w-[425px]">
        <DialogHeader>
          <DialogTitle>Select an icon</DialogTitle>
          <DialogDescription>
            Choose an icon for your menu item
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-[300px] rounded-md border p-4">
          <div className="grid grid-cols-6 gap-2">
            {iconOptions.map((option) => (
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
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
