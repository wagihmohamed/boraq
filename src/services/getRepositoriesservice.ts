import { api } from '@/api';
import { getRepositoriesendpoint } from '@/api/apisUrl';

// {
//     "status": "success",
//     "page": 1,
//     "pagesCount": 1,
//     "data": []
// }

export interface Repository {
  id: string;
  name: string;
  branch: string;
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
