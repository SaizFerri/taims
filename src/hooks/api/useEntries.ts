import { useQuery } from 'react-query';
import { QueryKeys } from 'constants/queryKeys';
import { createEntryService } from 'services/factory';

const entryService = createEntryService();
export default function useEntries(userId?: string) {
  return useQuery([QueryKeys.GET_ENTRIES, userId], () => entryService.getEntries(userId ?? ''), {
    enabled: !!userId,
  });
}
