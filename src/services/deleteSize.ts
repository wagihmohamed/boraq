import { api } from '@/api';
import { deleteSizeendpoint } from '@/api/apisUrl';

export const deleteSizeService = async ({ id }: { id: string }) => {
  const response = await api.delete(deleteSizeendpoint + id);
  return response.data;
};
