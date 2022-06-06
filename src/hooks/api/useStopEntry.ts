import { QueryKeys } from 'constants/queryKeys';
import { useMutation, useQueryClient } from 'react-query';
import { createEntryService } from 'services/factory';

const entryService = createEntryService();

export default function useStopEntry() {
  const queryClient = useQueryClient();

  return useMutation(
    ({ entryId, endsAt, duration }: StopEntryMutation) => {
      return entryService.stopEntry(entryId, {
        end_at: endsAt,
        duration,
        active: false,
      });
    },
    {
      onSettled: () => {
        queryClient.cancelQueries(QueryKeys.GET_ENTRIES);
        queryClient.invalidateQueries(QueryKeys.GET_ENTRIES);
      },
    }
  );
}

interface StopEntryMutation {
  entryId: number;
  endsAt: string;
  duration: number;
}
