import { api } from '@/api';
import { getOrdersendpoint } from '@/api/apisUrl';
import { Filters } from './getEmployeesService';
import { governorateArabicNames } from '@/lib/governorateArabicNames ';
import { deliveryTypesArabicNames } from '@/lib/deliveryTypesArabicNames';
import { orderStatusArabicNames } from '@/lib/orderStatusArabicNames';

export interface Order {
  id: string;
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
  deliveryDate: string | null;
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

export interface OrdersFilter extends Filters {
  search?: string;
  sort?: string;
  start_date?: Date | string | null;
  end_date?: Date | string | null;
  delivery_date?: Date | string | null;
  governorate?: string;
  status?: string;
  delivery_type?: string;
  delivery_agent_id?: string;
  client_id?: string;
  store_id?: string;
  product_id?: string;
  location_id?: string;
  receipt_number?: string;
  recipient_name?: string;
  recipient_phone?: string;
  recipient_address?: string;
}

export const getOrdersService = async (
  {
    page = 1,
    size = 10,
    search, // done
    sort, // done
    start_date,
    end_date,
    delivery_date, // done
    governorate, // done
    status, // done
    delivery_type, // done
    delivery_agent_id,
    client_id, // done
    store_id, // done
    product_id,
    location_id, // done
    receipt_number, // no need
    recipient_name, // no need
    recipient_phone, // no need
    recipient_address, // no need
  }: OrdersFilter = { page: 1, size: 10 }
) => {
  const response = await api.get<GetOrdersResponse>(getOrdersendpoint, {
    params: {
      page,
      size,
      search: search || undefined,
      sort: sort || undefined,
      start_date: start_date || undefined,
      end_date: end_date || undefined,
      delivery_date: delivery_date || undefined,
      governorate: governorate || undefined,
      status: status || undefined,
      delivery_type: delivery_type || undefined,
      delivery_agent_id: delivery_agent_id || undefined,
      client_id: client_id || undefined,
      store_id: store_id || undefined,
      product_id: product_id || undefined,
      location_id: location_id || undefined,
      receipt_number: receipt_number || undefined,
      recipient_name: recipient_name || undefined,
      recipient_phone: recipient_phone || undefined,
      recipient_address: recipient_address || undefined,
    },
  });
  return response.data;
};
