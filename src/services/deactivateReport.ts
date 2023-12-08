import { api } from '@/api';
import { deleteReportendpoint } from '@/api/apisUrl';

export const deactivateReportService = async ({ id }: { id: number }) => {
  const response = await api.patch(`${deleteReportendpoint + id}/deactivate`);
  return response.data;
};
