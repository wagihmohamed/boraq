import { createAutomaticUpdateendpoint } from '@/api/apisUrl';
import { api } from '@/api';
import { orderStatusArabicNames } from '@/lib/orderStatusArabicNames';
import { governorateArabicNames } from '@/lib/governorateArabicNames ';
import { orderReturnConditionArabicNames } from '@/lib/orderReturnConditionArabicNames';

export interface CreateAutomaticUpdateDatePayload {
  orderStatus: keyof typeof orderStatusArabicNames;
  governorate: keyof typeof governorateArabicNames;
  returnCondition: keyof typeof orderReturnConditionArabicNames;
  updateAt: number;
  checkAfter: number;
}

export const createAutomaticUpdateDateService = async (
  payload: CreateAutomaticUpdateDatePayload
) => {
  const { data } = await api.post(createAutomaticUpdateendpoint, payload);
  return data;
};
