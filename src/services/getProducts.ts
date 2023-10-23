import { api } from '@/api';
import { getProductsendpoint } from '@/api/apisUrl';

export interface Product {
  id: string;
  title: string;
  price: string;
  image: string;
}

export interface GetProductsResponse {
  status: string;
  page: number;
  pagesCount: number;
  data: Product[];
}

export const getProductsService = async (page = 1) => {
  const response = await api.get<GetProductsResponse>(getProductsendpoint, {
    params: {
      page,
    },
  });
  return response.data;
};
