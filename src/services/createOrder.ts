import { api } from '@/api';
import { createOrderendpoint } from '@/api/apisUrl';

export interface CreateOrderPayload {
  withProducts: boolean;
  totalCost?: number;
  quantity?: number;
  weight?: number;
  recipientName: string;
  recipientPhone: string;
  recipientAddress: string;
  notes?: string;
  details?: string;
  deliveryType: string;
  governorate: string;
  locationID: string;
  storeID: string;
  products?: {
    productID: string;
    quantity: number;
    colorID: string;
    sizeID: string;
  }[];
}

export const createOrderService = async (data: CreateOrderPayload) => {
  const response = await api.post<CreateOrderPayload>(
    createOrderendpoint,
    data
  );
  return response.data;
};
