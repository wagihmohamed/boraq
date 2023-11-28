import { api } from '@/api';
import { deleteReportendpoint } from '@/api/apisUrl';

export const deleteReportService = async ({ id }: { id: number }) => {
  const response = await api.delete(deleteReportendpoint + id);
  return response.data;
};
