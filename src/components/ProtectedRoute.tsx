import { ReactNode } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { Routes } from '../constants/routes';
import { useUser } from './UserProvider';

export default function ProtectedRoute({ children }: { children?: ReactNode }) {
  const { user, isLoaded } = useUser();
  const location = useLocation();

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to={`${Routes.LOGIN}?returnTo=${location.pathname}`} state={{ from: location }} replace />;
  }

  return children ? <>{children}</> : <Outlet />;
}
