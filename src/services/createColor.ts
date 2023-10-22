import { api } from '@/api';
import { createColorendpoint } from '@/api/apisUrl';

export interface CreateColorPayload {
  title: string;
}

export const createColorService = async (data: CreateColorPayload) => {
  const response = await api.post<CreateColorPayload>(
    createColorendpoint,
    data
  );
  return response.data;
};
