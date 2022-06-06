import { useMutation } from 'react-query';
import { createClientService } from 'services/factory';
import { Client } from 'types/client';

const clientService = createClientService();

export default function useUpdateClient(onSuccess?: (client: Client) => void) {
  const mutation = useMutation(
    (client: Client) => {
      return clientService.updateClient(client);
    },
    {
      onSuccess,
    }
  );

  return mutation;
}
