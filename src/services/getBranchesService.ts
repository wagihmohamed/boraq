import { api } from '@/api';
import { getBranchesendpoint } from '@/api/apisUrl';
import { governorateArabicNames } from '@/lib/governorateArabicNames ';

export interface Branch {
  id: string;
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

export const getBranchesService = async () => {
  const response = await api.get<GetRepositoriesResponse>(getBranchesendpoint);
  return response.data;
};
