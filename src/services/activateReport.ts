import { api } from '@/api';
import { deleteReportendpoint } from '@/api/apisUrl';

export const activateReportService = async ({ id }: { id: number }) => {
  const response = await api.patch(`${deleteReportendpoint + id}/reactivate`);
  return response.data;
};
