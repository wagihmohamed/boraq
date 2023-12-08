import { api } from '@/api';
import { deleteClientendpoint } from '@/api/apisUrl';

export const reactivateClientService = async ({ id }: { id: number }) => {
  const response = await api.patch(`${deleteClientendpoint + id}/reactivate`);
  return response.data;
};
