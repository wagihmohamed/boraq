import { api } from '@/api';
import { getRepositoriesendpoint } from '@/api/apisUrl';
import { Filters } from './getEmployeesService';

export interface Repository {
  id: number;
  name: string;
  branch: {
    id: number;
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

export const getRepositoriesService = async (
  { page = 1, size = 10 }: Filters = { page: 1, size: 10 }
) => {
  const response = await api.get<GetRepositoriesResponse>(
    getRepositoriesendpoint,
    {
      params: {
        page,
        size,
      },
    }
  );
  return response.data;
};
