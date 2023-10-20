import { api } from '@/api';
import { getTenantDetailsendpoint } from '@/api/apisUrl';
import { Tenant } from './getTenants';

export interface GetTenantsResponse {
  status: string;
  data: Tenant;
}

export const getTenantDetailsService = async (id: string) => {
  const response = await api.get<GetTenantsResponse>(
    getTenantDetailsendpoint + id
  );
  return response.data;
};
