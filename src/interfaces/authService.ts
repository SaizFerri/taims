export interface AuthService {
  signIn(email: string, password: string): Promise<any>;
  signOut(): Promise<any>;
  resetPassword(email: string): Promise<any>;
}
