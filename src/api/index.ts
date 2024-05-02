import { refreshTokenService } from '@/services/refreshToken';
import { signOutService } from '@/services/signOut';
import { authStore } from '@/store/authStore';
import axios from 'axios';
import toast from 'react-hot-toast';

const baseURL = import.meta.env.VITE_DEV_BASE_URL as string;
export const IMAGE_BASE_URL = import.meta.env.VITE_DEV_IMAGE_BASE_URL as string;

export const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem('token');

    if (token) {
      // eslint-disable-next-line no-param-reassign
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  async (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  async (response) => {
    return response;
  },
  async (error) => {
    if (error.response.status === 401) {
      const refreshToken = localStorage.getItem('refreshToken');

      if (refreshToken) {
        try {
          const response = await refreshTokenService(refreshToken);
          localStorage.setItem('token', response.token);
          return await api.request(error.config);
        } catch (e) {
          await signOutService(Number(authStore.getState().id)).then(() => {
            authStore.getState().logout();
            toast.error('تم انتهاء الجلسة');
          });
        }
      } else {
        authStore.getState().logout();
        toast.error('تم انتهاء الجلسة');
      }
    }

    return Promise.reject(error);
  }
);
