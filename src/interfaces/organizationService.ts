import { Organization } from '../types/organization';

export interface OrganizationService {
  getOrganizations(): Promise<Organization[]>;
  getOrganization(id: number): Promise<Organization>;
}
