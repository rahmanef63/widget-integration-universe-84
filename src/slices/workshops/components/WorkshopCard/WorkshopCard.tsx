
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { WorkshopCardProps } from '../../types';
import { WorkshopProgress } from '../WorkshopProgress/WorkshopProgress';
import { renderIcon } from '@/shared/icon-picker/utils';

const WorkshopCard: React.FC<WorkshopCardProps> = ({ workshop, className }) => {
  return (
    <Card className={className}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-medium">
            <div className="flex items-center gap-2">
              {workshop.icon && renderIcon(workshop.icon, { className: "h-5 w-5" })}
              {workshop.name}
            </div>
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">
          {workshop.description || "No description available"}
        </p>
        <WorkshopProgress progress={workshop.progress} />
      </CardContent>
      <CardFooter>
        <Link 
          to={workshop.path} 
          className="text-sm text-primary hover:underline w-full text-center"
        >
          Continue Workshop
        </Link>
      </CardFooter>
    </Card>
  );
};

export default WorkshopCard;
