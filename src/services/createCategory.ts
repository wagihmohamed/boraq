import { api } from '@/api';
import { createCategoryendpoint } from '@/api/apisUrl';

export interface CreateCategoryPayload {
  title: string;
}

export const createCategoryService = async (data: CreateCategoryPayload) => {
  const response = await api.post<CreateCategoryPayload>(
    createCategoryendpoint,
    data
  );
  return response.data;
};
