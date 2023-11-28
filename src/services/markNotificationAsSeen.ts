import { api } from '@/api';
import { markNotificationAsReadendpoint } from '@/api/apisUrl';

export const markNotificationAsSeenService = async ({ id }: { id: number }) => {
  const response = await api.patch(markNotificationAsReadendpoint + id, {
    seen: true,
  });
  return response.data;
};
