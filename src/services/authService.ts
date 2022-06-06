import { appUrl } from './../constants/global';
import { Routes } from '../constants/routes';
import { AuthService } from '../interfaces/authService';
import { supabase } from '../lib/supabase';
import { BaseService } from './baseService';

export class SupabaseAuthService extends BaseService implements AuthService {
  signIn(email: string, password: string): Promise<any> {
    return supabase.auth.signIn({ email, password });
  }

  signOut(): Promise<any> {
    return supabase.auth.signOut();
  }

  resetPassword(email: string): Promise<any> {
    return supabase.auth.api.resetPasswordForEmail(email, {
      redirectTo: `${appUrl}${Routes.RESET_PASSWORD}`,
    });
  }
}
