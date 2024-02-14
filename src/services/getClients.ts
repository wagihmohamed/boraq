import { api } from '@/api';
import { getClientsendpoint } from '@/api/apisUrl';
import { clientTypeArabicNames } from '@/lib/clientTypeArabicNames';
import { Branch } from './getBranchesService';
import { Filters } from './getEmployeesService';
import { governorateArabicNames } from '@/lib/governorateArabicNames ';

export interface Client {
  id: number;
  name: string;
  phone: string;
  username: string; // add username to the payload
  avatar: string | null;
  role: keyof typeof clientTypeArabicNames;
  branch: Branch | null;
  createdBy: {
    id: number;
    name: string;
  };
  company: {
    id: number;
    name: string;
  };
  governoratesDeliveryCosts: {
    cost: number;
    governorate: keyof typeof governorateArabicNames;
  }[];
}

export interface GetClientsResponse {
  status: string;
  page: number;
  pagesCount: number;
  data: Client[];
}

export const getClientsService = async (
  { page = 1, size = 10, deleted = false, only_title_and_id }: Filters = {
    page: 1,
    size: 10,
  }
) => {
  const response = await api.get<GetClientsResponse>(getClientsendpoint, {
    params: {
      page,
      size,
      deleted,
      only_title_and_id,
    },
  });
  return response.data;
};
