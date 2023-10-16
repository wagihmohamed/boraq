import { api } from '@/api';
import { deleteBranchendpoint } from '@/api/apisUrl';

export const deleteBranchService = async ({ id }: { id: string }) => {
  const response = await api.delete(deleteBranchendpoint + id);
  return response.data;
};
