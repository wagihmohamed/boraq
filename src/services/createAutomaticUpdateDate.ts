import { createAutomaticUpdateEndpoint } from '@/api/apisUrl';
import { api } from '@/api';
import { orderStatusArabicNames } from '@/lib/orderStatusArabicNames';
import { governorateArabicNames } from '@/lib/governorateArabicNames ';

export interface CreateAutomaticUpdateDatePayload {
  orderStatus: keyof typeof orderStatusArabicNames;
  newOrderStatus: keyof typeof orderStatusArabicNames;
  governorate: keyof typeof governorateArabicNames;
  // returnCondition: keyof typeof orderReturnConditionArabicNames;
  checkAfter: number;
  branchID: number;
  updateAt: number;
}

export const createAutomaticUpdateDateService = async (
  payload: CreateAutomaticUpdateDatePayload
) => {
  const { data } = await api.post(createAutomaticUpdateEndpoint, payload);
  return data;
};
