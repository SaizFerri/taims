import { Skeleton } from '@mantine/core';
import useActiveEntry from '../../hooks/api/useActiveEntry';
import { EntryDto } from '../../types/entry';
import DashboardLayout from '../DashboardLayout';
import EntryList from '../EntryList';
import NewEntry from '../NewEntry';
import { useUser } from '../UserProvider';

export default function Timer() {
  const { user } = useUser();
  const { data: entries, isLoading } = useActiveEntry(user?.id);
  const activeEntry = entries ? ({ ...entries, project: entries?.project?.id } as EntryDto) : null;

  return (
    <DashboardLayout>
      <div>
        {isLoading ? <Skeleton width="100%" height={50} /> : <NewEntry entry={activeEntry} />}
        <EntryList />
      </div>
    </DashboardLayout>
  );
}
