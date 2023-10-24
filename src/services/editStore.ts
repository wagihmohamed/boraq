import { api } from '@/api';
import { editStoreendpoint } from '@/api/apisUrl';

export interface EditStorePayload {
  branchID: string;
  name: string;
}

export const editStoreService = async ({
  data,
  id,
}: {
  data: EditStorePayload;
  id: string;
}) => {
  const response = await api.patch<{
    title: string;
    id: string;
  }>(editStoreendpoint + id, data);
  return response.data;
};
