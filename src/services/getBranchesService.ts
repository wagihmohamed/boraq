import { api } from '@/api';
import { getBranchesendpoint } from '@/api/apisUrl';
import { governorateArabicNames } from '@/lib/governorateArabicNames ';
import { Filters } from './getEmployeesService';

export interface Branch {
  id: number;
  name: string;
  email: string;
  phone: string;
  governorate: keyof typeof governorateArabicNames;
  company: {
    id: number;
    name: string;
  };
}

export interface GetRepositoriesResponse {
  status: string;
  page: number;
  pagesCount: number;
  data: Branch[];
}

export interface BranchFilters extends Filters {
  governorate?: keyof typeof governorateArabicNames;
  location_id?: number;
}

export const getBranchesService = async (
  {
    page = 1,
    size = 10,
    governorate,
    location_id,
    minified,
  }: BranchFilters = {
    page: 1,
    size: 10,
  }
) => {
  const response = await api.get<GetRepositoriesResponse>(getBranchesendpoint, {
    params: {
      page,
      size,
      governorate: governorate || undefined,
      location_id: location_id || undefined,
      minified: minified || undefined,
    },
  });
  return response.data;
};
