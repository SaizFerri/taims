import { User } from '../types/User';

export interface UserService {
  getUser(userId: string): Promise<User>;
}
