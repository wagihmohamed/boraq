import { api } from '@/api';
import { getSizesendpoint } from '@/api/apisUrl';
import { Filters } from './getEmployeesService';

export interface Size {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
}

export interface GetSizesResponse {
  status: string;
  page: number;
  pagesCount: number;
  data: Size[];
}

export const getSizesService = async (
  { page = 1, size = 10 }: Filters = { page: 1, size: 10 }
) => {
  const response = await api.get<GetSizesResponse>(getSizesendpoint, {
    params: {
      page,
      size,
    },
  });
  return response.data;
};
