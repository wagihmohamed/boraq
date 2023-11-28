import { api } from '@/api';
import { editProductendpoint } from '@/api/apisUrl';

export interface EditProductPayload {
  title: string;
  price: number;
  image: string;
  stock: number;
  category: string;
  colors: {
    title: string;
    quantity: number;
  }[];
  sizes: {
    title: string;
    quantity: number;
  }[];
}

export const editProductService = async ({
  data,
  id,
}: {
  data: FormData;
  id: number;
}) => {
  const response = await api.patch<FormData>(editProductendpoint + id, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};
