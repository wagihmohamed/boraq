import { api } from '@/api';
import { deleteLocationendpoint } from '@/api/apisUrl';

export const deleteLocationService = async ({ id }: { id: string }) => {
  const response = await api.delete(deleteLocationendpoint + id);
  return response.data;
};
