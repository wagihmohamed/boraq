import { api } from '@/api';
import { getTenantsendpoint } from '@/api/apisUrl';
import { Filters } from './getEmployeesService';

export interface Tenant {
  id: number;
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

export interface GetTenantsResponse {
  status: string;
  page: number;
  pagesCount: number;
  data: Tenant[];
}

export const getTenantsService = async (
  { page = 1, size = 10 }: Filters = { page: 1, size: 10 }
) => {
  const response = await api.get<GetTenantsResponse>(getTenantsendpoint, {
    params: {
      page,
      size,
    },
  });
  return response.data;
};
