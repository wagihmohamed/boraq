import { api } from '@/api';
import { editRepositoryEndpoint } from '@/api/apisUrl';

export interface EditRepositoryPayload {
  name: string;
  branchID: number;
}

export const editRepositoryService = async ({
  data,
  id,
}: {
  data: EditRepositoryPayload;
  id: number;
}) => {
  const response = await api.patch<EditRepositoryPayload>(
    editRepositoryEndpoint + id,
    data
  );
  return response.data;
};
