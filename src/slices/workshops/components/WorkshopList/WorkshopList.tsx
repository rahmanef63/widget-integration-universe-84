
import React from 'react';
import { WorkshopCard } from '../../components';
import { WorkshopListProps } from '../../types';

const WorkshopList: React.FC<WorkshopListProps> = ({ workshops, className }) => {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${className || ''}`}>
      {workshops.map((workshop) => (
        <WorkshopCard key={workshop.id} workshop={workshop} />
      ))}
    </div>
  );
};

export default WorkshopList;
