import { editAutomaticUpdateEndpoint } from '@/api/apisUrl';
import { api } from '@/api';
import { orderStatusArabicNames } from '@/lib/orderStatusArabicNames';
import { governorateArabicNames } from '@/lib/governorateArabicNames ';

export interface EditAutomaticUpdateDatePayload {
  orderStatus?: keyof typeof orderStatusArabicNames;
  newOrderStatus?: keyof typeof orderStatusArabicNames;
  governorate?: keyof typeof governorateArabicNames;
  // returnCondition: keyof typeof orderReturnConditionArabicNames;
  checkAfter?: number;
  branchID?: number;
  enabled?: boolean;
  updateAt?: number;
}

export const editAutomaticUpdateService = async (
  id: number,
  payload: EditAutomaticUpdateDatePayload
) => {
  const { data } = await api.patch(editAutomaticUpdateEndpoint + id, payload);
  return data;
};
