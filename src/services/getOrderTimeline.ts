import { api } from '@/api';
import { getOrderDetailsendpoint } from '@/api/apisUrl';
import { orderStatusArabicNames } from '@/lib/orderStatusArabicNames';

export interface OrderTimeline {
  status: string;
  data: {
    new: keyof typeof orderStatusArabicNames;
    old: keyof typeof orderStatusArabicNames;
    date: string;
    type: string;
  }[];
}

export const getOrderTimeline = async (orderId: number) => {
  const response = await api.get<OrderTimeline>(
    `${getOrderDetailsendpoint}${orderId}/timeline`
  );
  return response.data;
};
