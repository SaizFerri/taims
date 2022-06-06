import { PostgrestResponse } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';
import { Client } from '../types/client';
import { ClientService } from './../interfaces/clientService';
import { BaseService } from './baseService';

export class SupbabaseClientService extends BaseService implements ClientService {
  private tableName: string = 'client';

  async getClients(organizationId: number): Promise<Client[]> {
    const { data, error }: PostgrestResponse<Client> = await supabase
      .from<Client>(this.tableName)
      .select()
      .match({ organization: organizationId });

    if (error) {
      throw new Error('Error retrieving clients.');
    }

    return data;
  }

  async createClient(client: Client): Promise<Client> {
    const { data, error } = await supabase.from(this.tableName).insert({ ...client });

    if (error) {
      throw new Error('Failed to create client.');
    }

    return data[0];
  }

  async updateClient(client: Partial<Client>): Promise<Client> {
    const { data, error } = await supabase.from(this.tableName).update({ ...client });

    if (error) {
      throw new Error('Failed to update client.');
    }

    return data[0];
  }

  async deleteClient(id: number): Promise<void> {
    const { error } = await supabase.from(this.tableName).delete().match({ id });

    if (error) {
      throw new Error('Failed to delete client.');
    }
  }
}
