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
}

export interface GetRepositoriesResponse {
  status: string;
  page: number;
  pagesCount: number;
  data: Branch[];
}

export const getBranchesService = async (
  { page = 1, size = 10 }: Filters = { page: 1, size: 10 }
) => {
  const response = await api.get<GetRepositoriesResponse>(getBranchesendpoint, {
    params: {
      page,
      size,
    },
  });
  return response.data;
};
