import { useMutation } from '@tanstack/react-query';
import { useAuth } from '@/store/authStore';
import { signOutService } from '@/services/signOut';

export const useSignOut = () => {
  const { logout, id } = useAuth();
  return useMutation({
    mutationFn: () => signOutService(Number(id)),
    onSuccess: () => {
      logout();
    },
  });
};
