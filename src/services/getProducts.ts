import { api } from '@/api';
import { getProductsendpoint } from '@/api/apisUrl';
import { Filters } from './getEmployeesService';

export interface Product {
  id: number;
  title: string;
  price: string;
  image: string;
  stock: number;
  weight: number;
  category: {
    title: string;
  };
  productColors: {
    quantity: number;
    color: {
      id: number;
      title: string;
      code: string;
    };
  }[];
  productSizes: {
    quantity: number;
    size: {
      id: number;
      title: string;
    };
  }[];
}

export interface GetProductsResponse {
  status: string;
  page: number;
  pagesCount: number;
  data: Product[];
}

export const getProductsService = async (
  { page = 1, size = 10 }: Filters = { page: 1, size: 10 }
) => {
  const response = await api.get<GetProductsResponse>(getProductsendpoint, {
    params: {
      page,
      size,
    },
  });
  return response.data;
};
