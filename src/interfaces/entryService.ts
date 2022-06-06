import { Entry, EntryDto } from '../types/entry';
import { Nullable } from '../types/global';

export interface EntryService {
  startEntry(entry: Partial<EntryDto>): Promise<EntryDto>;
  stopEntry(id: number, entry: Pick<EntryDto, 'end_at' & 'duration' & 'active'>): Promise<EntryDto>;
  updateEntry(id: number, entry: Partial<EntryDto>): Promise<EntryDto>;
  getEntries(userId: string): Promise<Entry[]>;
  getActiveEntry(userId: string): Promise<Nullable<Entry>>;
  deleteEntry(entryId: number): Promise<void>;
}
