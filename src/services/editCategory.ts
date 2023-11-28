import { api } from '@/api';
import { editCategoryendpoint } from '@/api/apisUrl';

export const editCategoryService = async ({
  title,
  id,
}: {
  title: string;
  id: number;
}) => {
  const response = await api.patch<{
    title: string;
    id: number;
  }>(editCategoryendpoint + id, { title });
  return response.data;
};
