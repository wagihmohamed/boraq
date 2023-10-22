import { api } from '@/api';
import { deleteColorendpoint } from '@/api/apisUrl';

export const deleteColorService = async ({ id }: { id: string }) => {
  const response = await api.delete(deleteColorendpoint + id);
  return response.data;
};
