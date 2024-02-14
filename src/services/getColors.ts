import { api } from '@/api';
import { getColorsendpoint } from '@/api/apisUrl';
import { Filters } from './getEmployeesService';

export interface Color {
  id: number;
  title: string;
  code: string;
  createdAt: string;
  updatedAt: string;
}

export interface GetColorsResponse {
  status: string;
  page: number;
  pagesCount: number;
  data: Color[];
}

export const getColorsService = async (
  { page = 1, size = 10, only_title_and_id }: Filters = { page: 1, size: 10 }
) => {
  const response = await api.get<GetColorsResponse>(getColorsendpoint, {
    params: {
      page,
      size,
      only_title_and_id,
    },
  });
  return response.data;
};
