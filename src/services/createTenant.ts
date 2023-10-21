import { api } from '@/api';
import { createTenantendpoint } from '@/api/apisUrl';

export interface CreateTenantPayload {
  name: string;
  phone: string;
  website: string;
  logo: string;
  registrationText: string;
  governoratePrice: number;
  deliveryAgentFee: number;
  baghdadPrice: number;
  additionalPriceForEvery500000IraqiDinar: number;
  additionalPriceForEveryKilogram: number;
  additionalPriceForRemoteAreas: number;
  orderStatusAutomaticUpdate: boolean;
}

export const createTenantService = async (data: CreateTenantPayload) => {
  const response = await api.post<CreateTenantPayload>(
    createTenantendpoint,
    data
  );
  return response.data;
};
