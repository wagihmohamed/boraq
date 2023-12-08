import { api } from '@/api';
import { deleteOrderendpoint } from '@/api/apisUrl';

export const activateOrderService = async ({ id }: { id: number }) => {
  const response = await api.patch(`${deleteOrderendpoint + id}/reactivate`);
  return response.data;
};
