import { api } from '@/api';
import { deleteRepositoryendpoint } from '@/api/apisUrl';

export const deleteRepositoryService = async ({ id }: { id: number }) => {
  const response = await api.delete(deleteRepositoryendpoint + id);
  return response.data;
};
