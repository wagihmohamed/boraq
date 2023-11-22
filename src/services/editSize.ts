import { api } from '@/api';
import { editSizeendpoint } from '@/api/apisUrl';

export const editSizeService = async ({
  title,
  id,
}: {
  title: string;
  id: number;
}) => {
  const response = await api.patch<{
    title: string;
    id: number;
  }>(editSizeendpoint + id, { title });
  return response.data;
};
