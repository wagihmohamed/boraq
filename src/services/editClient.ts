import { api } from '@/api';
import { editClientendpoint } from '@/api/apisUrl';
import { clientTypeArabicNames } from '@/lib/clientTypeArabicNames';

export interface EditClientPayload {
  name: string;
  phone: string;
  accountType: keyof typeof clientTypeArabicNames;
  token: string;
  password?: string;
  branchID: string;
}

export const editClientService = async ({
  data,
  id,
}: {
  data: EditClientPayload;
  id: string;
}) => {
  const response = await api.patch<EditClientPayload>(
    editClientendpoint + id,
    data
  );
  return response.data;
};
