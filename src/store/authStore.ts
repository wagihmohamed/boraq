import { queryClient, router } from '@/main';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { SignInResponse } from '@/services/signInService';

interface AuthStore extends SignInResponse {
  setAuth: (data: SignInResponse) => void;
  logout: () => void;
}

const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      status: '',
      token: '',
      setAuth: (data: SignInResponse) => {
        set(data);
        localStorage.setItem('token', data.token);
      },
      logout: () => {
        set({ status: '', token: '' });
        localStorage.removeItem('token');
        queryClient.clear();
        router.navigate('/');
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);

export const useAuth = () => useAuthStore((state) => state);
