import { api } from '@/api';
import { getColorsendpoint } from '@/api/apisUrl';

export interface Color {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
}

export interface GetColorsResponse {
  status: string;
  page: number;
  pagesCount: number;
  data: Color[];
}

export const getColorsService = async (page = 1) => {
  const response = await api.get<GetColorsResponse>(getColorsendpoint, {
    params: {
      page,
    },
  });
  return response.data;
};
