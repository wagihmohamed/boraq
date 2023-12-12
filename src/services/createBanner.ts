import { api } from '@/api';
import { createBannerendpoint } from '@/api/apisUrl';

export const createBannerService = async (data: FormData) => {
  const response = await api.post<FormData>(createBannerendpoint, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};
