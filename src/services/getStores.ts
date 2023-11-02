import { api } from '@/api';
import { getStoresendpoint } from '@/api/apisUrl';
import { Filters } from './getEmployeesService';

export interface Store {
  id: string;
  name: string;
  notes: string;
  logo: string;
  client: {
    id: string;
    name: string;
  };
}

export interface GetStoresResponse {
  status: string;
  page: number;
  pagesCount: number;
  data: Store[];
}

export const getStoresService = async (
  { page = 1, size = 10 }: Filters = { page: 1, size: 10 }
) => {
  const response = await api.get<GetStoresResponse>(getStoresendpoint, {
    params: {
      page,
      size,
    },
  });
  return response.data;
};
