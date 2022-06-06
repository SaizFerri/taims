import { UserService } from '../interfaces/userService';
import { supabase } from '../lib/supabase';
import { User } from '../types/User';
import { BaseService } from './baseService';

export class SupabaseUserService extends BaseService implements UserService {
  private tableName: string = 'user';

  async getUser(userId: string): Promise<User> {
    const { data, error } = await supabase.from(this.tableName).select().match({ id: userId });

    if (error) {
      throw new Error('Failed to fetch user.');
    }

    return data[0];
  }
}
