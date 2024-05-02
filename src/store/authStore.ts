import { queryClient, router } from '@/main';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { SignInResponse } from '@/services/signInService';
import JWTDecode from 'jwt-decode';
import { rolesArabicNames } from '@/lib/rolesArabicNames';
import { clientTypeArabicNames } from '@/lib/clientTypeArabicNames';

export type JWTRole =
  | keyof typeof rolesArabicNames
  | keyof typeof clientTypeArabicNames;

interface IAuthStore extends SignInResponse {
  setAuth: (data: SignInResponse) => void;
  logout: () => void;
  id: string;
  name: string;
  username: string;
  role: JWTRole | null;
  companyName: string;
  companyID: string;
}

interface TokenPayload {
  id: string;
  name: string;
  username: string;
  role: JWTRole | null;
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
      refreshToken: '',
      companyID: '',
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
          refreshToken: data.refreshToken,
          username: decodedToken.username,
          role: decodedToken.role,
          companyID: decodedToken.companyID || '',
        });
        localStorage.setItem('token', data.token);
        localStorage.setItem('refreshToken', data.refreshToken);
      },
      logout: () => {
        set({
          status: '',
          token: '',
          companyName: '',
          refreshToken: '',
          id: '',
          name: '',
          username: '',
          role: null,
          companyID: '',
        });
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
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
