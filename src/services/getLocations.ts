import { api } from '@/api';
import { getLocationsendpoint } from '@/api/apisUrl';
import { governorateArabicNames } from '@/lib/governorateArabicNames ';
import { Branch } from './getBranchesService';
import { Employee, Filters } from './getEmployeesService';

export interface Location {
  id: number;
  name: string;
  governorate: keyof typeof governorateArabicNames;
  branch: Branch;
  deliveryAgents: Employee[];
}

export interface GetLocationsResponse {
  status: string;
  page: number;
  pagesCount: number;
  data: Location[];
}

export interface LocationFilters extends Filters {
  search?: string;
  branch_id?: number;
  governorate?: keyof typeof governorateArabicNames;
  delivery_agent_id?: number | null;
}

export const getLocationsService = async (
  {
    page = 1,
    size = 10,
    delivery_agent_id,
    governorate,
    search,
    branch_id,
    only_title_and_id,
  }: LocationFilters = { page: 1, size: 10 }
) => {
  const response = await api.get<GetLocationsResponse>(getLocationsendpoint, {
    params: {
      page,
      size,
      delivery_agent_id: delivery_agent_id || undefined,
      governorate: governorate || undefined,
      search: search || undefined,
      branch_id: branch_id || undefined,
      only_title_and_id,
    },
  });
  return response.data;
};
