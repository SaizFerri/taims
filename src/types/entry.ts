import { Nullable } from './global';
import { Project } from './project';

export interface Entry {
  id: number;
  user_id: string;
  start_at: string;
  end_at?: string;
  active: boolean;
  description?: string;
  duration?: number;
  billable: boolean;
  project?: Project;
}

export interface EntryDto extends Omit<Entry, 'project'> {
  project?: Nullable<number>;
}
