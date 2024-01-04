import { rolesArabicNames } from '@/lib/rolesArabicNames';
import { authStore, useAuth } from '@/store/authStore';

export const useAuthorization = (
  allowedRoles: (keyof typeof rolesArabicNames)[]
) => {
  const { role } = useAuth();

  if (role && !allowedRoles.includes(role)) {
    console.log('Unauthorized');

    return null;
  }

  return true;
};

export const isAuthorized = (
  allowedRoles: (keyof typeof rolesArabicNames)[]
) => {
  const { role } = authStore.getState();

  if (role && !allowedRoles.includes(role)) {
    return false;
  }

  return true;
};
