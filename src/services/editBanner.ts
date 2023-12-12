import { api } from '@/api';
import { editBannerendpoint } from '@/api/apisUrl';

export const editBannerService = async ({
  data,
  id,
}: {
  data: FormData;
  id: number;
}) => {
  const response = await api.patch<FormData>(editBannerendpoint + id, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};
