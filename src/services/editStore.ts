import { api } from '@/api';
import { editStoreendpoint } from '@/api/apisUrl';

export interface EditStorePayload {
  clientID: string;
  name: string;
  notes: string;
}

export const editStoreService = async ({
  data,
  id,
}: {
  data: FormData;
  id: number;
}) => {
  const response = await api.patch<{
    title: string;
    id: number;
  }>(editStoreendpoint + id, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};
