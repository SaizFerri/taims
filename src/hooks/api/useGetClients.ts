import { useQuery } from 'react-query';
import { QueryKeys } from 'constants/queryKeys';
import { createClientService } from 'services/factory';
import { Client } from 'types/client';
import useSelectedOrganization from './useSelectedOrganization';

const clientService = createClientService();

export default function useGetClients() {
  const organizationId = useSelectedOrganization();
  return useQuery<Client[]>(
    [QueryKeys.GET_CLIENTS, organizationId],
    () => clientService.getClients(organizationId!),
    { staleTime: Infinity, enabled: !!organizationId }
  );
}
