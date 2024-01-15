import { queryClient, router } from '@/main';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { SignInResponse } from '@/services/signInService';
import JWTDecode from 'jwt-decode';
import { rolesArabicNames } from '@/lib/rolesArabicNames';

interface IAuthStore extends SignInResponse {
  setAuth: (data: SignInResponse) => void;
  logout: () => void;
  id: string;
  name: string;
  username: string;
  role: keyof typeof rolesArabicNames | null;
  companyName: string;
}

interface TokenPayload {
  id: string;
  name: string;
  username: string;
  role: keyof typeof rolesArabicNames | null;
  exp: number;
  iat: number;
  companyName: string | null;
  companyID: string | null;
  permissions: string[] | null;
}

export const authStore = create<IAuthStore>()(
  persist(
    (set) => ({
      status: '',
      token: '',
      companyName: '',
      id: '',
      name: '',
      role: null,
      username: '',
      setAuth: (data: SignInResponse) => {
        const decodedToken = JWTDecode<TokenPayload>(data.token);
        set({
          status: 'success',
          companyName: decodedToken.companyName || '',
          token: data.token,
          id: decodedToken.id,
          name: decodedToken.name,
          username: decodedToken.username,
          role: decodedToken.role,
        });
        localStorage.setItem('token', data.token);
      },
      logout: () => {
        set({
          status: '',
          token: '',
          companyName: '',
          id: '',
          name: '',
          username: '',
          role: null,
        });
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

export const useAuth = () => authStore((state) => state);
