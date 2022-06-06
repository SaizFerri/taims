import { Client } from './client';

export interface Project {
  id: number;
  name: string;
  organization?: number;
  client?: Client;
  rate?: number;
  currency?: string;
  color?: string;
  estimated_hours?: number;
}

export interface ProjectDto extends Omit<Project, 'client'> {
  client?: number;
}
