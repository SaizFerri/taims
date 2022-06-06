import { Nullable } from './../types/global';
import { PostgrestResponse } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';
import { Entry, EntryDto } from '../types/entry';
import { EntryService } from './../interfaces/entryService';
import { BaseService } from './baseService';

export class SupbabaseEntryService extends BaseService implements EntryService {
  private tableName: string = 'entry';

  async startEntry(entry: Partial<EntryDto>): Promise<EntryDto> {
    const { data, error }: PostgrestResponse<EntryDto> = await supabase
      .from<EntryDto>(this.tableName)
      .insert({
        ...entry,
      });

    if (error) {
      throw new Error('Failed to start timer.');
    }

    return data[0];
  }

  async stopEntry(
    id: number,
    entry: Pick<EntryDto, 'end_at' & 'duration' & 'active'>
  ): Promise<EntryDto> {
    const { data, error }: PostgrestResponse<EntryDto> = await supabase
      .from<EntryDto>(this.tableName)
      .update({
        ...entry,
      })
      .match({ id });

    if (error) {
      throw new Error('Failed to stop timer.');
    }

    return data[0];
  }

  async updateEntry(id: number, entry: Partial<EntryDto>): Promise<EntryDto> {
    const { data, error }: PostgrestResponse<EntryDto> = await supabase
      .from<EntryDto>(this.tableName)
      .update({
        ...entry,
      })
      .match({ id });

    if (error) {
      throw new Error('Failed to update entry.');
    }

    return data[0];
  }

  async getEntries(userId: string): Promise<Entry[]> {
    const { data, error }: PostgrestResponse<Entry> = await supabase
      .from<Entry>(this.tableName)
      .select(
        `
          id,
          start_at,
          end_at,
          active,
          description,
          duration,
          billable,
          project (
            id,
            name,
            organization,
            client (
              id,
              name
            ),
            rate,
            currency,
            color,
            estimated_hours
          )
        `
      )
      .match({ active: false })
      .match({ user_id: userId })
      .order('start_at', { ascending: false });

    if (error) {
      throw new Error('Error retrieving entries');
    }

    return data;
  }

  async getActiveEntry(userId: string): Promise<Nullable<Entry>> {
    const { data, error }: PostgrestResponse<Entry> = await supabase
      .from<Entry>(this.tableName)
      .select(
        `
          id,
          start_at,
          end_at,
          active,
          description,
          duration,
          billable,
          project (
            id,
            name,
            organization,
            client (
              id,
              name
            ),
            rate,
            currency,
            color,
            estimated_hours
          )
        `
      )
      .match({ active: true })
      .match({ user_id: userId });

    if (error) {
      throw new Error('Error retrieving entries');
    }

    return data[0] ?? null;
  }

  async deleteEntry(entryId: number): Promise<void> {
    const { error }: PostgrestResponse<void> = await supabase
      .from(this.tableName)
      .delete()
      .match({ id: entryId });

    if (error) {
      throw new Error('Error deleting entry');
    }
  }
}
