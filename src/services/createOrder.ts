import { api } from '@/api';
import { createOrderendpoint } from '@/api/apisUrl';
import { Order } from './getOrders';

export const createOrderService = async (data: Order) => {
  const response = await api.post<Order>(createOrderendpoint, data);
  return response.data;
};
