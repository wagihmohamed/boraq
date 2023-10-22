import { api } from '@/api';
import { createSizeendpoint } from '@/api/apisUrl';

export interface CreateSizePayload {
  title: string;
}

export const createSizeService = async (data: CreateSizePayload) => {
  const response = await api.post<CreateSizePayload>(createSizeendpoint, data);
  return response.data;
};
