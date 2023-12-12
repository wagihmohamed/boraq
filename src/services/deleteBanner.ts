import { api } from '@/api';
import { deleteBannerendpoint } from '@/api/apisUrl';

export const deleteBannerService = async ({ id }: { id: number }) => {
  const response = await api.delete(deleteBannerendpoint + id);
  return response.data;
};
