import { api } from '@/api';
import { getOrderDetailsendpoint } from '@/api/apisUrl';
import { deliveryTypesArabicNames } from '@/lib/deliveryTypesArabicNames';
import { governorateArabicNames } from '@/lib/governorateArabicNames ';
import { orderStatusArabicNames } from '@/lib/orderStatusArabicNames';

export interface OrderDetails {
  id: number;
  totalCost: string;
  paidAmount: string;
  totalCostInUSD: string;
  paidAmountInUSD: string;
  discount: string;
  receiptNumber: number;
  quantity: number;
  weight: number;
  recipientName: string;
  recipientPhones: string[];
  recipientAddress: string;
  notes: string;
  details: string;
  status: keyof typeof orderStatusArabicNames;
  deliveryType: keyof typeof deliveryTypesArabicNames;
  deliveryDate: string | null;
  createdAt: Date;
  updatedAt: Date;
  client: {
    id: number;
    name: string;
    phone: string;
  } | null;
  deliveryAgent: {
    id: number;
    name: string;
    phone: string;
  } | null;
  orderProducts: {
    quantity: number;
    product: Product;
    color: Color;
    size: Color;
  }[];
  governorate: keyof typeof governorateArabicNames;
  location: Location;
  store: Location;
  branch: {
    id: number;
    name: string;
  } | null;
  repository: {
    id: number;
    name: string;
  } | null;
  confirmed: boolean;
}

export interface Color {
  id: number;
  title: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Product {
  id: number;
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
  id: number;
  name: string;
}
export interface GetOrderDetailsResponse {
  status: string;
  data: OrderDetails;
}

export const getOrderDetailsService = async (id: number) => {
  const response = await api.get<GetOrderDetailsResponse>(
    getOrderDetailsendpoint + id
  );
  return response.data;
};
