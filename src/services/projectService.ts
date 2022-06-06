import { PostgrestResponse } from '@supabase/supabase-js';
import { ProjectService } from '../interfaces/projectService';
import { supabase } from '../lib/supabase';
import { Project, ProjectDto } from '../types/project';
import { BaseService } from './baseService';

export class SupbabaseProjectService extends BaseService implements ProjectService {
  private tableName: string = 'project';

  async getProjects(organizationId: number): Promise<Project[]> {
    const { data, error }: PostgrestResponse<Project> = await supabase
      .from<Project>(this.tableName)
      .select(
        `
        *,
        client(
          id,
          name,
          address
        )
      `
      )
      .match({ organization: organizationId });

    if (error) {
      throw new Error('Error retrieving projects');
    }

    return data;
  }

  async createProject(project: ProjectDto): Promise<ProjectDto> {
    const { data, error } = await supabase.from(this.tableName).insert({ ...project });

    if (error) {
      throw new Error('Failed to create project.');
    }

    return data[0];
  }

  async deleteProject(id: number): Promise<void> {
    const { error } = await supabase.from(this.tableName).delete().match({ id });

    if (error) {
      throw new Error('Failed to delete project.');
    }
  }
}
