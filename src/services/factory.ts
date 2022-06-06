import { ClientService } from './../interfaces/clientService';
import { ProjectService } from './../interfaces/projectService';
import { SupbabaseEntryService } from './entryService';
import { EntryService } from './../interfaces/entryService';
import { AuthService } from '../interfaces/authService';
import { OrganizationService } from '../interfaces/organizationService';
import { SupabaseAuthService } from './authService';
import { SupbabaseOrganizationService } from './organizationService';
import { SupbabaseProjectService } from './projectService';
import { UserService } from '../interfaces/userService';
import { SupabaseUserService } from './userService';
import { SupbabaseClientService } from './clientService';

// export function createServiceFactory<T extends BaseService>(service: ServiceType): T {
//   const Service = serviceMap[service];

//   if (!Service) {
//     throw new Error(`Failed to create service of type ${service}`, {
//       cause: new Error(`Service ${service} does not have an implementation.`),
//     });
//   }

//   return Service as T;
// }

export function createUserService(): UserService {
  return new SupabaseUserService();
}

export function createEntryService(): EntryService {
  return new SupbabaseEntryService();
}

export function createClientService(): ClientService {
  return new SupbabaseClientService();
}

export function createProjectService(): ProjectService {
  return new SupbabaseProjectService();
}

export function createOrganizationService(userId: string): OrganizationService {
  return new SupbabaseOrganizationService(userId);
}

export function createAuthService(): AuthService {
  return new SupabaseAuthService();
}
