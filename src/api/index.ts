/* eslint-disable @typescript-eslint/no-explicit-any */ /* eslint-disable no-underscore-dangle */
import { refreshTokenService } from '@/services/refreshToken';
import { signOutService } from '@/services/signOut';
import { authStore } from '@/store/authStore';
import axios, { AxiosError } from 'axios';
import toast from 'react-hot-toast';

const baseURL = import.meta.env.VITE_DEV_BASE_URL as string;
export const IMAGE_BASE_URL = import.meta.env.VITE_DEV_IMAGE_BASE_URL as string;

export const api = axios.create({
  baseURL,
  headers: { 'Content-Type': 'application/json' },
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

let isRefreshing = false;
let failedQueue: {
  resolve: (token: string) => void;
  reject: (error: AxiosError) => void;
}[] = [];

const processQueue = (
  error: AxiosError | null,
  token: string | null = null
) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token!);
    }
  });
  failedQueue = [];
};

api.interceptors.response.use(
  async (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest?.retry
    ) {
      if (isRefreshing) {
        // Token refresh is in progress, queue the request
        return new Promise<string>((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest!.headers.Authorization = `Bearer ${token}`;
            return axios(originalRequest!);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }
      originalRequest!.retry = true;
      isRefreshing = true;
      const refreshToken = localStorage.getItem('refreshToken');
      if (refreshToken) {
        try {
          const response = await refreshTokenService(refreshToken);
          localStorage.setItem('token', response.token);
          processQueue(null, response.token);
          return await api(originalRequest!);
        } catch (e) {
          processQueue(e as any, null);
          await signOutService().then(() => {
            authStore.getState().logout();
            toast.error('تم انتهاء الجلسة');
          });
        } finally {
          isRefreshing = false;
        }
      } else {
        authStore.getState().logout();
        toast.error('تم انتهاء الجلسة');
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  }
);
