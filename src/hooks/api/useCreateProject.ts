import { useMutation, useQueryClient } from 'react-query';
import { QueryKeys } from 'constants/queryKeys';
import { createProjectService } from 'services/factory';
import { ProjectDto } from 'types/project';

const projectService = createProjectService();

export default function useCreateProject(onSuccess?: (project: ProjectDto) => void) {
  const queryClient = useQueryClient();
  const mutation = useMutation(
    (project: ProjectDto) => {
      return projectService.createProject(project);
    },
    {
      onSuccess: (project: ProjectDto) => {
        queryClient.invalidateQueries(QueryKeys.GET_PROJECTS);

        if (typeof onSuccess === 'function') {
          onSuccess(project);
        }
      },
    }
  );

  return mutation;
}
