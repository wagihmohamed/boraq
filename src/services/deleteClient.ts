import { api } from '@/api';
import { deleteClientendpoint } from '@/api/apisUrl';

export const deleteClientService = async ({ id }: { id: string }) => {
  const response = await api.delete(deleteClientendpoint + id);
  return response.data;
};
