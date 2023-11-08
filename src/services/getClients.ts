import { api } from '@/api';
import { getClientsendpoint } from '@/api/apisUrl';
import { clientTypeArabicNames } from '@/lib/clientTypeArabicNames';
import { Branch } from './getBranchesService';
import { Filters } from './getEmployeesService';

export interface Client {
  id: string;
  name: string;
  phone: string;
  avatar: string | null;
  accountType: keyof typeof clientTypeArabicNames;
  branch: Branch;
  createdBy: {
    id: string;
    name: string;
  };
}

export interface GetClientsResponse {
  status: string;
  page: number;
  pagesCount: number;
  data: Client[];
}

export const getClientsService = async (
  { page = 1, size = 10 }: Filters = { page: 1, size: 10 }
) => {
  const response = await api.get<GetClientsResponse>(getClientsendpoint, {
    params: {
      page,
      size,
    },
  });
  return response.data;
};
