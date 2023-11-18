import { api } from '@/api';
import { deleteReportendpoint } from '@/api/apisUrl';

export const deleteReportService = async ({ id }: { id: string }) => {
  const response = await api.delete(deleteReportendpoint + id);
  return response.data;
};
