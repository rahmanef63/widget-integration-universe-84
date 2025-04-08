
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchWorkshopById } from '../services/workshop.service';
import { Workshop } from '../types';
import { renderIcon } from '@/shared/icon-picker/utils';
import WorkshopProgress from '../components/WorkshopProgress/WorkshopProgress';

const WorkshopDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [workshop, setWorkshop] = useState<Workshop | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadWorkshop = async () => {
      if (!id) return;
      
      try {
        const data = await fetchWorkshopById(id);
        setWorkshop(data);
      } catch (error) {
        console.error(`Error loading workshop ${id}:`, error);
      } finally {
        setLoading(false);
      }
    };

    loadWorkshop();
  }, [id]);

  if (loading) {
    return <div className="p-8">Loading workshop...</div>;
  }

  if (!workshop) {
    return <div className="p-8">Workshop not found</div>;
  }

  return (
    <div className="p-8">
      <div className="flex items-center gap-3 mb-6">
        {workshop.icon && (
          <div className="p-2 bg-primary/10 rounded-lg">
            {renderIcon(workshop.icon, { size: 24 })}
          </div>
        )}
        <div>
          <h1 className="text-3xl font-bold">{workshop.name}</h1>
          <p className="text-muted-foreground">{workshop.description}</p>
        </div>
      </div>

      <div className="mb-8 max-w-md">
        <WorkshopProgress progress={workshop.progress} />
      </div>

      {/* Workshop content based on type */}
      {workshop.type === 'marketing' && (
        <div className="prose max-w-none">
          <h2>Marketing Workshop</h2>
          <p>This workshop is currently in planning phase (0% progress)</p>
        </div>
      )}

      {workshop.type === 'developer' && (
        <div className="prose max-w-none">
          <h2>Developer Workshop (Widget Universe)</h2>
          <p>This workshop is nearly complete (80% progress)</p>
        </div>
      )}

      {workshop.type === 'dashboard' && (
        <div className="prose max-w-none">
          <h2>Dashboard Workshop</h2>
          <p>This workshop is in development (30% progress)</p>
        </div>
      )}
    </div>
  );
};

export default WorkshopDetail;
