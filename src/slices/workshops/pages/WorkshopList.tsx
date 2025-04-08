
import React, { useEffect, useState } from 'react';
import { Workshop } from '../types';
import { fetchWorkshops } from '../services/workshop.service';

const WorkshopList: React.FC = () => {
  const [workshops, setWorkshops] = useState<Workshop[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadWorkshops = async () => {
      try {
        const data = await fetchWorkshops();
        setWorkshops(data);
      } catch (error) {
        console.error('Error loading workshops:', error);
      } finally {
        setLoading(false);
      }
    };

    loadWorkshops();
  }, []);

  if (loading) {
    return <div className="p-8">Loading workshops...</div>;
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Workshops</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {workshops.map(workshop => (
          <div key={workshop.id} className="border rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-2">{workshop.name}</h2>
            <p className="text-muted-foreground mb-4">{workshop.description}</p>
            <div className="bg-secondary h-2 rounded-full overflow-hidden">
              <div 
                className="h-full bg-primary" 
                style={{ width: `${workshop.progress}%` }}
              />
            </div>
            <p className="mt-2 text-right text-sm">{workshop.progress}% Complete</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorkshopList;
