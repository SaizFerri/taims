import { useQuery } from 'react-query';
import { QueryKeys } from 'constants/queryKeys';
import { createProjectService } from 'services/factory';
import { Project } from 'types/project';
import useSelectedOrganization from './useSelectedOrganization';

const projectService = createProjectService();

export default function useGetProjects() {
  const organizationId = useSelectedOrganization();

  return useQuery<Project[]>(
    [QueryKeys.GET_PROJECTS, organizationId],
    () => {
      return projectService.getProjects(organizationId!);
    },
    { staleTime: Infinity, enabled: !!organizationId }
  );
}
