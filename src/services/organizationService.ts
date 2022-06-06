import { OrganizationService } from '../interfaces/organizationService';
import { Organization } from '../types/organization';
import { BaseService } from './baseService';

export class SupbabaseOrganizationService extends BaseService implements OrganizationService {
  private userId: string;

  constructor(userId: string) {
    super();
    this.userId = userId;
  }

  async getOrganizations(): Promise<Organization[]> {
    // const { data, error } = await supabaseClient
    //   .from('organization_user')
    //   .select()
    //   .eq('user_id', this.userId);

    // console.log(data);

    return [] as any;
  }

  async getOrganization(id: number): Promise<Organization> {
    return { 1: 'a' } as any;
  }
}
