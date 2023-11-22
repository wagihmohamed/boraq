import { api } from '@/api';
import { deleteCategoryendpoint } from '@/api/apisUrl';

export const deleteCategoryService = async ({ id }: { id: number }) => {
  const response = await api.delete(deleteCategoryendpoint + id);
  return response.data;
};
