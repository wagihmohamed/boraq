import { api } from '@/api';
import { getLocationDetailsendpoint } from '@/api/apisUrl';
import { Location } from './getLocations';

export interface GetLocationDetailsResponse {
  status: string;
  data: Location;
}

export const getLocationDetailsService = async (id: number) => {
  const response = await api.get<GetLocationDetailsResponse>(
    getLocationDetailsendpoint + id
  );
  return response.data;
};
