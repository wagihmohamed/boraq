import { api } from '@/api';
import { editClientendpoint } from '@/api/apisUrl';
import { clientTypeArabicNames } from '@/lib/clientTypeArabicNames';

export interface EditClientPayload {
  name: string;
  phone: string;
  role: keyof typeof clientTypeArabicNames;
  token: string;
  password?: string;
  branchID: number;
}

export const editClientService = async ({
  data,
  id,
}: {
  data: FormData;
  id: number;
}) => {
  const response = await api.patch<FormData>(editClientendpoint + id, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};
