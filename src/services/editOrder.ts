import { api } from '@/api';
import { editOrderendpoint } from '@/api/apisUrl';
import { orderStatusArabicNames } from '@/lib/orderStatusArabicNames';

export interface EditOrderPayload {
  paidAmount: number;
  discount: number;
  status: keyof typeof orderStatusArabicNames;
  deliveryAgentID: string;
  deliveryDate: string;
  recipientName: string;
  recipientPhone: string;
  recipientAddress: string;
  notes: string;
  details: string;
}

export const editOrderService = async ({
  data,
  id,
}: {
  data: EditOrderPayload;
  id: string;
}) => {
  const response = await api.patch<EditOrderPayload>(
    editOrderendpoint + id,
    data
  );
  return response.data;
};