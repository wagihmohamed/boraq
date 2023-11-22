import { api } from '@/api';
import { getClientDetailsendpoint } from '@/api/apisUrl';
import { Client } from './getClients';

export interface GetClientDetailsResponse {
  status: string;
  data: Client;
}

export const getClientDetailsService = async (id: number) => {
  const response = await api.get<GetClientDetailsResponse>(
    getClientDetailsendpoint + id
  );
  return response.data;
};
