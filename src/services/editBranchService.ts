import { api } from '@/api';
import { editBranchendpoint } from '@/api/apisUrl';

export interface EditBranchPayload {
  name: string;
  email: string;
  phone: string;
  governorate: string;
}

export const editBranchService = async ({
  data,
  id,
}: {
  data: EditBranchPayload;
  id: string;
}) => {
  const response = await api.patch<EditBranchPayload>(
    editBranchendpoint + id,
    data
  );
  return response.data;
};
