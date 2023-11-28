import { api } from '@/api';
import { deleteSizeendpoint } from '@/api/apisUrl';

export const deleteSizeService = async ({ id }: { id: number }) => {
  const response = await api.delete(deleteSizeendpoint + id);
  return response.data;
};
