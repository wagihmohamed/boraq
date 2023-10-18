import { api } from '@/api';
import { getClientsendpoint } from '@/api/apisUrl';
import { clientTypeArabicNames } from '@/lib/clientTypeArabicNames';
import { Branch } from './getBranchesService';

export interface Client {
  id: string;
  name: string;
  phone: string;
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

export const getClientsService = async () => {
  const response = await api.get<GetClientsResponse>(getClientsendpoint);
  return response.data;
};
