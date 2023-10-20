import { api } from '@/api';
import { getTenantsendpoint } from '@/api/apisUrl';

export interface Tenant {
  id: string;
  name: string;
  phone: string;
  website: string;
  logo: string;
  registrationText: string;
  governoratePrice: string;
  deliveryAgentFee: string;
  baghdadPrice: string;
  additionalPriceForEvery500000IraqiDinar: string;
  additionalPriceForEveryKilogram: string;
  additionalPriceForRemoteAreas: string;
  orderStatusAutomaticUpdate: boolean;
}

export interface GetTenantsResponse {
  status: string;
  page: number;
  pagesCount: number;
  data: Tenant[];
}

export const getTenantsService = async () => {
  const response = await api.get<GetTenantsResponse>(getTenantsendpoint);
  return response.data;
};
