import { changeReportStatusEndpoint } from '@/api/apisUrl';
import { api } from '@/api';
import { reportStatusArabicNames } from '@/lib/reportStatusArabicNames';

export interface ChangeReportStatusPayload {
  status: keyof typeof reportStatusArabicNames;
}

export const changeReportStatusService = async (
  reportId: number,
  payload: ChangeReportStatusPayload
) => {
  const response = await api.patch(
    `${changeReportStatusEndpoint}${reportId}`,
    payload
  );
  return response.data;
};
