import { api } from '@/api';
import { getRepositoriesendpoint } from '@/api/apisUrl';

export interface Repository {
  id: string;
  name: string;
  branch: {
    id: string;
    name: string;
    createdAt: string;
    updatedAt: string;
    email: string;
    phone: string;
    governorate: string;
  };
}

export interface GetRepositoriesResponse {
  status: string;
  page: number;
  pagesCount: number;
  data: Repository[];
}

export const getRepositoriesService = async () => {
  const response = await api.get<GetRepositoriesResponse>(
    getRepositoriesendpoint
  );
  return response.data;
};
