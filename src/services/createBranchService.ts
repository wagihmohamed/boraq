import { api } from '@/api';
import { createBranchendpoint } from '@/api/apisUrl';

export interface CreateBranchPayload {
  name: string;
  email: string;
  phone: string;
  governorate: string;
}

export const createBranchService = async (data: CreateBranchPayload) => {
  const response = await api.post<CreateBranchPayload>(
    createBranchendpoint,
    data
  );
  return response.data;
};
