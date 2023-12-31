import { api } from '@/api';
import { createLocationendpoint } from '@/api/apisUrl';

export interface CreateLocationPayload {
  name: string;
  governorate: string;
  branchID: number;
  deliveryAgentsIDs: number[];
}

export const createLocationService = async (data: CreateLocationPayload) => {
  const response = await api.post<CreateLocationPayload>(
    createLocationendpoint,
    data
  );
  return response.data;
};
