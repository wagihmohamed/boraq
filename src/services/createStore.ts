import { api } from '@/api';
import { createStoreendpoint } from '@/api/apisUrl';

export interface CreateStorePayload {
  name: string;
  clientID: string;
  notes: string;
}

export const createStoreService = async (data: CreateStorePayload) => {
  const response = await api.post<CreateStorePayload>(
    createStoreendpoint,
    data
  );
  return response.data;
};
