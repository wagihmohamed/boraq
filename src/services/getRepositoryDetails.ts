import { api } from '@/api';
import { getRepositoryDetailsendpoint } from '@/api/apisUrl';
import { Repository } from './getRepositoriesService';

export interface GetBranchesResponse {
  status: string;
  data: Repository;
}

export const getRepositoryDetailsService = async (id: number) => {
  const response = await api.get<GetBranchesResponse>(
    getRepositoryDetailsendpoint + id
  );
  return response.data;
};
