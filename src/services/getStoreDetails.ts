import { api } from '@/api';
import { getStoreDetailsendpoint } from '@/api/apisUrl';
import { Store } from './getStores';

export interface GetStoresResponse {
  status: string;
  data: Store;
}

export const getStoreDetailsService = async (id: number) => {
  const response = await api.get<GetStoresResponse>(
    getStoreDetailsendpoint + id
  );
  return response.data;
};
