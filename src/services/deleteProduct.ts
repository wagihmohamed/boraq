import { api } from '@/api';
import { deleteProductendpoint } from '@/api/apisUrl';

export const deleteProductService = async ({ id }: { id: string }) => {
  const response = await api.delete(deleteProductendpoint + id);
  return response.data;
};
