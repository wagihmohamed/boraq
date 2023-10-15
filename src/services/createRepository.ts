import { api } from '@/api';
import { createRepositoryendpoint } from '@/api/apisUrl';

export interface CreateRepositoryPayload {
  name: string;
  branchID: string;
}

export const createRepositoryService = async (
  data: CreateRepositoryPayload
) => {
  const response = await api.post<CreateRepositoryPayload>(
    createRepositoryendpoint,
    data
  );
  return response.data;
};
