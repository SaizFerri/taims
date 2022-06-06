import { useMutation, useQueryClient } from 'react-query';
import { QueryKeys } from 'constants/queryKeys';
import { createProjectService } from 'services/factory';

const projectService = createProjectService();

export default function useDeleteProject() {
  const queryClient = useQueryClient();
  const mutation = useMutation(
    (id: number) => {
      return projectService.deleteProject(id);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(QueryKeys.GET_PROJECTS);
      },
    }
  );

  return mutation;
}
