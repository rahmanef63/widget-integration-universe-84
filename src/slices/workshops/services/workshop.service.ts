
import { Workshop } from '../types';
import { WORKSHOPS } from '../data/workshops';

/**
 * Fetch all available workshops
 */
export const fetchWorkshops = async (): Promise<Workshop[]> => {
  // In a real application, this would fetch from an API
  // For now, we'll return the static data
  return WORKSHOPS;
};

/**
 * Fetch a specific workshop by ID
 */
export const fetchWorkshopById = async (id: string): Promise<Workshop | null> => {
  const workshop = WORKSHOPS.find(workshop => workshop.id === id);
  return workshop || null;
};

/**
 * Update workshop progress
 * In a real app, this would make an API call
 */
export const updateWorkshopProgress = async (id: string, progress: number): Promise<boolean> => {
  // Simulate API call
  console.log(`Updating workshop ${id} progress to ${progress}%`);
  return true;
};
