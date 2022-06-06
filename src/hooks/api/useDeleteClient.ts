import { useMutation, useQueryClient } from 'react-query';
import { QueryKeys } from 'constants/queryKeys';
import { createClientService } from 'services/factory';

const clientService = createClientService();

export default function useDeleteClient() {
  const queryClient = useQueryClient();
  const mutation = useMutation(
    (id: number) => {
      return clientService.deleteClient(id);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(QueryKeys.GET_CLIENTS);
      },
    }
  );

  return mutation;
}
