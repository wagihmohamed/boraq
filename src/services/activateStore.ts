import { api } from '@/api';
import { deleteStoreendpoint } from '@/api/apisUrl';

export const activateStoreService = async ({ id }: { id: number }) => {
  const response = await api.patch(`${deleteStoreendpoint + id}/reactivate`);
  return response.data;
};
