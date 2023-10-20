import { api } from '@/api';
import { createClientendpoint } from '@/api/apisUrl';
import { clientTypeArabicNames } from '@/lib/clientTypeArabicNames';

export interface CreateClientPayload {
  name: string;
  phone: string;
  accountType: keyof typeof clientTypeArabicNames;
  token: string;
  password: string;
  branchID: string;
}

export const createClientsService = async (data: CreateClientPayload) => {
  const response = await api.post<CreateClientPayload>(
    createClientendpoint,
    data
  );
  return response.data;
};
