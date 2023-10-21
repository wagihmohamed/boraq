import { api } from '@/api';
import { markNotificationAsReadendpoint } from '@/api/apisUrl';

export const markNotificationAsSeenService = async ({ id }: { id: string }) => {
  const response = await api.patch(markNotificationAsReadendpoint + id, {
    seen: true,
  });
  return response.data;
};
