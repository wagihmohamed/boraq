import { api } from '@/api';
import { getProductDetailsendpoint } from '@/api/apisUrl';

export interface ProductDetails {
  id: number;
  title: string;
  price: string;
  image: string;
  stock: number;
  Category: {
    title: string;
  };
  ProductColors: {
    quantity: number;
    color: {
      title: string;
      id: number;
    };
  }[];
  ProductSizes: {
    quantity: number;
    size: {
      title: string;
      id: number;
    };
  }[];
}

export interface GetProductsResponse {
  status: string;
  data: ProductDetails;
}

export const getProductDetailsService = async (id: number) => {
  const response = await api.get<GetProductsResponse>(
    getProductDetailsendpoint + id
  );
  return response.data;
};
