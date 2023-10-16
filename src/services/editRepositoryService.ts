import { api } from '@/api';
import { editRepositoryendpoint } from '@/api/apisUrl';

export interface EditRepositoryPayload {
  name: string;
  branchID: string;
}

export const editRepositoryService = async ({
  data,
  id,
}: {
  data: EditRepositoryPayload;
  id: string;
}) => {
  const response = await api.patch<EditRepositoryPayload>(
    editRepositoryendpoint + id,
    data
  );
  return response.data;
};
