import { api } from '@/api';
import { getOrdersendpoint } from '@/api/apisUrl';
import { Filters } from './getEmployeesService';
import { governorateArabicNames } from '@/lib/governorateArabicNames ';
import { deliveryTypesArabicNames } from '@/lib/deliveryTypesArabicNames';
import { orderStatusArabicNames } from '@/lib/orderStatusArabicNames';

export interface Order {
  id: number;
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
  clientID: number;
  deliveryAgentID: number;
  deliveryDate: string | null;
  governorate: keyof typeof governorateArabicNames;
  locationID: number;
  storeID: number;
  deliveryCost: string;
  clientNet: string;
  companyNet: string;
  deliveryAgent: {
    id: number;
    name: string;
    phone: string;
    deliveryCost: string;
  };
  products: {
    productID: number;
    quantity: number;
    color: string;
    size: string;
  }[];
  deleted?: boolean;
  deletedAt?: string | null;
  deletedBy: {
    id: number;
    name: string;
  };
  clientReport: {
    reportNumber: number;
    clientId: number;
    reportId: number;
    storeId: number;
  } | null;
  repositoryReport: {
    reportNumber: number;
    repositoryId: number;
    reportId: number;
  } | null;
  governorateReport: {
    reportNumber: number;
    governorate: keyof typeof governorateArabicNames;
    reportId: number;
  };
  branchReport: {
    reportNumber: number;
    branchId: number;
    reportId: number;
  };
  deliveryAgentReport: {
    reportNumber: number;
    deliveryAgentId: number;
    reportId: number;
  };
  companyReport: {
    reportNumber: number;
    reportId: number;
    companyId: number;
  };
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
  statuses?: string[];
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
  deleted?: boolean;
}

export const getOrdersService = async (
  {
    page = 1,
    size = 10,
    search,
    sort,
    start_date,
    end_date,
    delivery_date,
    governorate,
    status,
    delivery_type,
    delivery_agent_id,
    client_id,
    store_id,
    product_id,
    location_id,
    receipt_number,
    recipient_name,
    recipient_phone,
    recipient_address,
    deleted = false,
    statuses,
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
      deleted,
      statuses: statuses?.join(',') || undefined,
    },
  });
  return response.data;
};
