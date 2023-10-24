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
  data: EditProductPayload;
  id: string;
}) => {
  const response = await api.patch<EditProductPayload>(
    editProductendpoint + id,
    data
  );
  return response.data;
};
