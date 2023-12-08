import { api } from '@/api';
import { deleteOrderendpoint } from '@/api/apisUrl';

export const deactivateOrderService = async ({ id }: { id: number }) => {
  const response = await api.patch(`${deleteOrderendpoint + id}/deactivate`);
  return response.data;
};
