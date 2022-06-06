import { Nullable } from './../../types/global';
import { useMutation } from 'react-query';
import { useUser } from 'components/UserProvider';
import { createEntryService } from 'services/factory';

const entryService = createEntryService();

export default function useCreateEntry() {
  const { user } = useUser();

  return useMutation(({ start, billable, description, project }: CreateEntryMutation) => {
    return entryService.startEntry({
      user_id: user?.id,
      start_at: start,
      active: true,
      billable,
      description,
      project,
    });
  });
}

interface CreateEntryMutation {
  start: string;
  billable: boolean;
  description?: string;
  project?: Nullable<number>;
}
