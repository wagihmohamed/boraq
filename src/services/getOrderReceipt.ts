import { api } from '@/api';

export const getOrderReceipt = async (orderId: string) => {
  const response = await api.get(`/orders/${orderId}/receipt`, {
    responseType: 'arraybuffer',
  });
  return response.data;
};
