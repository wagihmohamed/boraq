import { api } from '@/api';
import { getProductDetailsendpoint } from '@/api/apisUrl';

export interface ProductDetails {
  id: string;
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
    };
  }[];
  ProductSizes: {
    quantity: number;
    size: {
      title: string;
    };
  }[];
}

export interface GetProductsResponse {
  status: string;
  data: ProductDetails;
}

export const getProductDetailsService = async (id: string) => {
  const response = await api.get<GetProductsResponse>(
    getProductDetailsendpoint + id
  );
  return response.data;
};
