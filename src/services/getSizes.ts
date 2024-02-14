import { api } from '@/api';
import { getSizesendpoint } from '@/api/apisUrl';
import { Filters } from './getEmployeesService';

export interface Size {
  id: number;
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
  { page = 1, size = 10, only_title_and_id }: Filters = { page: 1, size: 10 }
) => {
  const response = await api.get<GetSizesResponse>(getSizesendpoint, {
    params: {
      page,
      size,
      only_title_and_id,
    },
  });
  return response.data;
};
