import { api } from '@/api';
import { getCategoriesendpoint } from '@/api/apisUrl';
import { Filters } from './getEmployeesService';

export interface Category {
  id: number;
  title: string;
  createdAt: string;
  updatedAt: string;
}

export interface GetCategoriesResponse {
  status: string;
  page: number;
  pagesCount: number;
  data: Category[];
}

export const getCategoriesService = async (
  { page = 1, size = 10, minified }: Filters = { page: 1, size: 10 }
) => {
  const response = await api.get<GetCategoriesResponse>(getCategoriesendpoint, {
    params: {
      page,
      size,
      minified: minified || undefined,
    },
  });
  return response.data;
};
