import { api } from '@/api';
import { markNotificationAsReadendpoint } from '@/api/apisUrl';

export const markAllNotificationsAsReadService = async () => {
  const response = await api.patch(markNotificationAsReadendpoint, {
    seen: true,
  });
  return response.data;
};
