import { api } from '@/api';
import { deleteAutomaticUpdateendpoint } from '@/api/apisUrl';

export const deleteAutomaticUpdateDateService = async ({
  id,
}: {
  id: number;
}) => {
  const response = await api.delete(deleteAutomaticUpdateendpoint + id);
  return response.data;
};
