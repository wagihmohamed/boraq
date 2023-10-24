import { api } from '@/api';
import { getLocationsendpoint } from '@/api/apisUrl';
import { governorateArabicNames } from '@/lib/governorateArabicNames ';
import { Branch } from './getBranchesService';
import { Employee, Filters } from './getEmployeesService';

export interface Location {
  id: string;
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

export const getLocationsService = async (
  { page = 1, size = 10 }: Filters = { page: 1, size: 10 }
) => {
  const response = await api.get<GetLocationsResponse>(getLocationsendpoint, {
    params: {
      page,
      size,
    },
  });
  return response.data;
};
