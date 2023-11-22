import { api } from '@/api';
import { editColorendpoint } from '@/api/apisUrl';

export const editColorService = async ({
  title,
  id,
}: {
  title: string;
  id: number;
}) => {
  const response = await api.patch<{
    title: string;
    id: number;
  }>(editColorendpoint + id, { title });
  return response.data;
};
