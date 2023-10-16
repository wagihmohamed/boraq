import { api } from '@/api';
import { getBranchesendpoint } from '@/api/apisUrl';

export interface Branch {
  id: string;
  name: string;
  email: string;
  phone: string;
  governorate: string;
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
