import { useQuery } from 'react-query';
import { QueryKeys } from 'constants/queryKeys';
import { createEntryService } from 'services/factory';

const entryService = createEntryService();

export default function useActiveEntry(userId?: string) {
  return useQuery(
    [QueryKeys.GET_ACTIVE_ENTRY, userId],
    () => entryService.getActiveEntry(userId ?? ''),
    {
      enabled: !!userId,
    }
  );
}
