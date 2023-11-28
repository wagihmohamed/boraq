import { api } from '@/api';
import { deleteStoreendpoint } from '@/api/apisUrl';

export const deleteStoreService = async ({ id }: { id: number }) => {
  const response = await api.delete(deleteStoreendpoint + id);
  return response.data;
};
