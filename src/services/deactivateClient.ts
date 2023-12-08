import { api } from '@/api';
import { deleteClientendpoint } from '@/api/apisUrl';

export const deactivateClientService = async ({ id }: { id: number }) => {
  const response = await api.patch(`${deleteClientendpoint + id}/deactivate`);
  return response.data;
};
