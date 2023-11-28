import { api } from '@/api';
import { getBranchDetailsendpoint } from '@/api/apisUrl';

export interface Branch {
  id: number;
  name: string;
  email: string;
  phone: string;
  governorate: string;
}

export interface GetBranchesResponse {
  status: string;
  data: Branch;
}

export const getBranchDetails = async (id: number) => {
  const response = await api.get<GetBranchesResponse>(
    getBranchDetailsendpoint + id
  );
  return response.data;
};
