import { api } from '@/api';
import { deleteStoreendpoint } from '@/api/apisUrl';

export const deactivateStoreService = async ({ id }: { id: number }) => {
  const response = await api.patch(`${deleteStoreendpoint + id}/deactivate`);
  return response.data;
};
