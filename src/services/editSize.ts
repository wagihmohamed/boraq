import { api } from '@/api';
import { editSizeendpoint } from '@/api/apisUrl';

export const editSizeService = async ({
  title,
  id,
}: {
  title: string;
  id: string;
}) => {
  const response = await api.patch<{
    title: string;
    id: string;
  }>(editSizeendpoint + id, { title });
  return response.data;
};
