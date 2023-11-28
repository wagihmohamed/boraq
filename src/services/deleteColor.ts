import { api } from '@/api';
import { deleteColorendpoint } from '@/api/apisUrl';

export const deleteColorService = async ({ id }: { id: number }) => {
  const response = await api.delete(deleteColorendpoint + id);
  return response.data;
};
