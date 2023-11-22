import { api } from '@/api';
import { deleteClientendpoint } from '@/api/apisUrl';

export const deleteClientService = async ({ id }: { id: number }) => {
  const response = await api.delete(deleteClientendpoint + id);
  return response.data;
};
