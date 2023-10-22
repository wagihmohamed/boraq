import { api } from '@/api';
import { getSizesendpoint } from '@/api/apisUrl';

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

export const getSizesService = async (page = 1) => {
  const response = await api.get<GetSizesResponse>(getSizesendpoint, {
    params: {
      page,
    },
  });
  return response.data;
};