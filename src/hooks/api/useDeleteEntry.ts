import { QueryKeys } from 'constants/queryKeys';
import { createEntryService } from 'services/factory';
import { useMutation, useQueryClient } from 'react-query';

const entryService = createEntryService();

export default function useDeleteEntry() {
  const queryClient = useQueryClient();
  return useMutation(
    (entryId: number) => {
      return entryService.deleteEntry(entryId);
    },
    {
      onMutate: () => {
        queryClient.cancelQueries(QueryKeys.GET_ENTRIES);
      },
      onSuccess() {
        queryClient.invalidateQueries(QueryKeys.GET_ENTRIES);
      },
    }
  );
}
