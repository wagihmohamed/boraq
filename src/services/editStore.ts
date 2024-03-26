import { api } from '@/api';
import { editStoreEndpoint } from '@/api/apisUrl';

export interface EditStorePayload {
  clientID: number;
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
  }>(editStoreEndpoint + id, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};
