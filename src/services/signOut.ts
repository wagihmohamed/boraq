import { api } from '@/api';
import { signOutEndpoint } from '@/api/apisUrl';

export const signOutService = async (id: number) => {
  const response = await api.post(`${signOutEndpoint}/${id}`);
  return response.data;
};
