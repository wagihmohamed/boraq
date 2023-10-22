import { api } from '@/api';
import { editColorendpoint } from '@/api/apisUrl';

export const editColorService = async ({
  title,
  id,
}: {
  title: string;
  id: string;
}) => {
  const response = await api.patch<{
    title: string;
    id: string;
  }>(editColorendpoint + id, { title });
  return response.data;
};
