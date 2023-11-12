import { api } from '@/api';
import { getOrderDetailsendpoint } from '@/api/apisUrl';
import { deliveryTypesArabicNames } from '@/lib/deliveryTypesArabicNames';
import { governorateArabicNames } from '@/lib/governorateArabicNames ';

export interface OrderDetails {
  id: string;
  totalCost: string;
  paidAmount: string;
  totalCostInUSD: string;
  paidAmountInUSD: string;
  discount: string;
  receiptNumber: number;
  quantity: number;
  weight: number;
  recipientName: string;
  recipientPhone: string;
  recipientAddress: string;
  notes: string;
  details: string;
  status: string;
  deliveryType: keyof typeof deliveryTypesArabicNames;
  deliveryDate: string | null;
  createdAt: Date;
  updatedAt: Date;
  client: {
    id: string;
    name: string;
    phone: string;
  } | null;
  deliveryAgent: {
    id: string;
    name: string;
    phone: string;
  } | null;
  OrderProducts: {
    quantity: number;
    product: Product;
    color: Color;
    size: Color;
  }[];
  governorate: keyof typeof governorateArabicNames;
  location: Location;
  store: Location;
}

export interface Color {
  id: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Product {
  id: string;
  title: string;
  price: string;
  createdAt: Date;
  updatedAt: Date;
  image: string;
  stock: number;
  weight: number;
  categoryId: string;
}

export interface Location {
  id: string;
  name: string;
}
export interface GetOrderDetailsResponse {
  status: string;
  data: OrderDetails;
}

export const getOrderDetailsService = async (id: string) => {
  const response = await api.get<GetOrderDetailsResponse>(
    getOrderDetailsendpoint + id
  );
  return response.data;
};
