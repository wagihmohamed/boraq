import { api } from '@/api';
import { deleteOrderendpoint } from '@/api/apisUrl';

export const deleteOrderService = async ({ id }: { id: string }) => {
  const response = await api.delete(deleteOrderendpoint + id);
  return response.data;
};
