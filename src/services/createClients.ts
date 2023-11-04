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

export const createClientsService = async (data: FormData) => {
  const response = await api.post<FormData>(createClientendpoint, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};
