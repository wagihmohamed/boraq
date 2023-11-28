import { api } from '@/api';
import { editColorendpoint } from '@/api/apisUrl';

export const editColorService = async ({
  title,
  id,
  code,
}: {
  title: string;
  id: number;
  code: string;
}) => {
  const response = await api.patch<{
    title: string;
    id: number;
    code: string;
  }>(editColorendpoint + id, { title, code });
  return response.data;
};
