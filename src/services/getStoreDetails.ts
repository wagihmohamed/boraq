import { api } from '@/api';
import { getStoreDetailsEndpoint } from '@/api/apisUrl';
import { Store } from './getStores';

export interface GetStoresResponse {
  status: string;
  data: Store;
}

export const getStoreDetailsService = async (id: number) => {
  const response = await api.get<GetStoresResponse>(
    getStoreDetailsEndpoint + id
  );
  return response.data;
};
