import { api } from '@/api';
import { getOrdersendpoint } from '@/api/apisUrl';
import { Filters } from './getEmployeesService';
import { governorateArabicNames } from '@/lib/governorateArabicNames ';
import { deliveryTypesArabicNames } from '@/lib/deliveryTypesArabicNames';
import { orderStatusArabicNames } from '@/lib/orderStatusArabicNames';

export interface Order {
  totalCost: number;
  paidAmount: number;
  totalCostInUSD: number;
  paidAmountInUSD: number;
  discount: number;
  receiptNumber: number;
  quantity: number;
  weight: number;
  recipientName: string;
  recipientPhone: string;
  recipientAddress: string;
  details: string;
  notes: string;
  status: keyof typeof orderStatusArabicNames;
  deliveryType: keyof typeof deliveryTypesArabicNames;
  clientID: string;
  deliveryAgentID: string;
  deliveryDate: string;
  governorate: keyof typeof governorateArabicNames;
  locationID: string;
  storeID: string;
  products: {
    productID: string;
    quantity: number;
    color: string;
    size: string;
  }[];
}

export interface GetOrdersResponse {
  status: string;
  page: number;
  pagesCount: number;
  data: Order[];
}

export const getOrdersService = async (
  { page = 1, size = 10 }: Filters = { page: 1, size: 10 }
) => {
  const response = await api.get<GetOrdersResponse>(getOrdersendpoint, {
    params: {
      page,
      size,
    },
  });
  return response.data;
};
