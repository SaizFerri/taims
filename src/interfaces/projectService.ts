import { Project, ProjectDto } from '../types/project';

export interface ProjectService {
  getProjects(organizationId: number): Promise<Project[]>;
  createProject(project: ProjectDto): Promise<ProjectDto>;
  deleteProject(id: number): Promise<void>;
}
