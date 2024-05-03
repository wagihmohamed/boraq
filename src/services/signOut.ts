import { api } from '@/api';
import { signOutEndpoint } from '@/api/apisUrl';

export const signOutService = async () => {
  const response = await api.post(signOutEndpoint);
  return response.data;
};
