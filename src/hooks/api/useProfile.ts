import { useQuery } from 'react-query';
import { useUser } from 'components/UserProvider';
import { QueryKeys } from 'constants/queryKeys';
import { createUserService } from 'services/factory';

const userService = createUserService();

export default function useProfile() {
  const { user } = useUser();
  const { data, error } = useQuery(
    [QueryKeys.GET_PROFILE, user?.id],
    ({ queryKey }) => userService.getUser(queryKey[1] ?? ''),
    { enabled: !!user, staleTime: Infinity }
  );

  if (error) {
    throw new Error('Failed fetching profile.');
  }

  return data;
}
