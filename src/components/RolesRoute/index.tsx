import { useAuthorization } from '@/hooks/useAuthorized';
import { rolesArabicNames } from '@/lib/rolesArabicNames';
import { Navigate, Outlet } from 'react-router-dom';

export const RolesRoute = ({
  roles,
}: {
  roles: (keyof typeof rolesArabicNames)[];
}) => {
  const isAuthorized = useAuthorization(roles);
  return isAuthorized ? <Outlet /> : <Navigate to="/orders" />;
};
