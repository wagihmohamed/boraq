import { api } from '@/api';
import { getCategoriesendpoint } from '@/api/apisUrl';
import { Filters } from './getEmployeesService';

export interface Category {
  id: string;
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
  { page = 1, size = 10 }: Filters = { page: 1, size: 10 }
) => {
  const response = await api.get<GetCategoriesResponse>(getCategoriesendpoint, {
    params: {
      page,
      size,
    },
  });
  return response.data;
};
