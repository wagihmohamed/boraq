import { api } from '@/api';
import { editCategoryendpoint } from '@/api/apisUrl';

export const editCategoryService = async ({
  title,
  id,
}: {
  title: string;
  id: string;
}) => {
  const response = await api.patch<{
    title: string;
    id: string;
  }>(editCategoryendpoint + id, { title });
  return response.data;
};
