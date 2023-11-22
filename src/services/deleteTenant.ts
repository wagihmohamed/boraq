import { api } from '@/api';
import { deleteTenantendpoint } from '@/api/apisUrl';

export const deleteTenantService = async ({ id }: { id: number }) => {
  const response = await api.delete(deleteTenantendpoint + id);
  return response.data;
};
