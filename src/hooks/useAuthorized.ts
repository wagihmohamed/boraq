import { rolesArabicNames } from '@/lib/rolesArabicNames';
import { authStore, useAuth } from '@/store/authStore';

export const useAuthorization = (
  allowedRoles: (keyof typeof rolesArabicNames)[]
) => {
  const { role } = useAuth();

  if (role && allowedRoles.includes(role)) {
    return true;
  }
  return false;
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

export const renderChildrenBasedOnRole = (
  allowedRoles: (keyof typeof rolesArabicNames)[],
  children: React.ReactNode
) => {
  if (isAuthorized(allowedRoles)) {
    return children;
  }

  return null;
};

export const hideChildrenBasedOnRole = (
  allowedRoles: (keyof typeof rolesArabicNames)[],
  children: React.ReactNode
) => {
  if (isAuthorized(allowedRoles)) {
    return null;
  }

  return children;
};
