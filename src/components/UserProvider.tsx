import { User } from '@supabase/supabase-js';
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useQueryClient } from 'react-query';
import { useLocation, useNavigate } from 'react-router-dom';
import { QueryKeys } from '../constants/queryKeys';
import { Routes } from '../constants/routes';
import { supabase } from '../lib/supabase';
import { createUserService } from '../services/factory';
import { Nullable } from '../types/global';

const userService = createUserService();

export default function UserProvider({ children }: { children: ReactNode }) {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const queryClient = useQueryClient();
  const location = useLocation();
  const navigate = useNavigate();

  const prefetchProfile = useCallback(
    (userId: string) => {
      queryClient.prefetchQuery(QueryKeys.GET_PROFILE, () => {
        return userService.getUser(userId);
      });
    },
    [queryClient]
  );

  useEffect(() => {
    const user = supabase.auth.session()?.user ?? null;
    setUser(user);
    setIsLoaded(true);

    if (user) {
      prefetchProfile(user.id);
    }

    supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'PASSWORD_RECOVERY') {
        navigate(`${Routes.RESET_PASSWORD}${location.hash}`, {
          replace: true,
        });
      }

      setUser(session?.user ?? null);
      setIsLoaded(true);

      if (session?.user) {
        prefetchProfile(session.user.id);
      }
    });
  }, [prefetchProfile, location, navigate]);

  const value = useMemo(() => ({ user, isLoaded }), [user, isLoaded]);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

interface UserProviderValue {
  user: Nullable<User>;
  isLoaded: boolean;
}

export const UserContext = createContext<UserProviderValue>({
  user: null,
  isLoaded: false,
});
export const useUser = () => useContext(UserContext);
