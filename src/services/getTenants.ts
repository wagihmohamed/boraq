import { api } from '@/api';
import { getTenantsEndpoint } from '@/api/apisUrl';
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
  treasury: number;
}

export interface GetTenantsResponse {
  status: string;
  page: number;
  pagesCount: number;
  data: Tenant[];
}

export const getTenantsService = async (
  { page = 1, size = 10, minified }: Filters = { page: 1, size: 10 }
) => {
  const response = await api.get<GetTenantsResponse>(getTenantsEndpoint, {
    params: {
      page,
      size,
      minified,
    },
  });
  return response.data;
};
