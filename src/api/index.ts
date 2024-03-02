import { authStore } from '@/store/authStore';
import axios from 'axios';
import toast from 'react-hot-toast';

const baseURL = import.meta.env.VITE_PROD_BASE_URL as string;
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
      authStore.getState().logout();
      toast.error('لقد انتهت صلاحية الجلسة الرجاء تسجيل الدخول مرة أخرى');
    }

    return Promise.reject(error);
  }
);
