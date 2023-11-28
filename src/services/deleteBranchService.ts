import { api } from '@/api';
import { deleteBranchendpoint } from '@/api/apisUrl';

export const deleteBranchService = async ({ id }: { id: number }) => {
  const response = await api.delete(deleteBranchendpoint + id);
  return response.data;
};
