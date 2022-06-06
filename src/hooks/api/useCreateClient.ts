import { useMutation, useQueryClient } from 'react-query';
import { QueryKeys } from 'constants/queryKeys';
import { createClientService } from 'services/factory';
import { Client } from 'types/client';

const clientService = createClientService();

export default function useCreateClient(onSuccess?: (client: Client) => void) {
  const queryClient = useQueryClient();
  const mutation = useMutation(
    (client: Client) => {
      return clientService.createClient(client);
    },
    {
      onSuccess: (client: Client) => {
        queryClient.invalidateQueries(QueryKeys.GET_CLIENTS);

        if (typeof onSuccess === 'function') {
          onSuccess(client);
        }
      },
    }
  );

  return mutation;
}
