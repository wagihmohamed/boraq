import { api } from '@/api';
import { getStoresendpoint } from '@/api/apisUrl';
import { Filters } from './getEmployeesService';

export interface Store {
  id: number;
  name: string;
  notes: string;
  logo: string;
  client: {
    id: number;
    name: string;
  };
  deleted?: boolean;
  deletedAt?: string;
  deletedBy?: {
    id: number;
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
  { page = 1, size = 10, deleted = false, only_title_and_id }: Filters = {
    page: 1,
    size: 10,
  }
) => {
  const response = await api.get<GetStoresResponse>(getStoresendpoint, {
    params: {
      page,
      size,
      deleted,
      only_title_and_id,
    },
  });
  return response.data;
};
