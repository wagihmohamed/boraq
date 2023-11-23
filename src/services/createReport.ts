import { api } from '@/api';
import { createReportendpoint } from '@/api/apisUrl';
import { governorateArabicNames } from '@/lib/governorateArabicNames ';
import { reportTypeArabicNames } from '@/lib/reportTypeArabicNames';
import { AxiosResponse } from 'axios';
import FileSaver from 'file-saver';

export interface CreateReportPayload {
  type: keyof typeof reportTypeArabicNames;
  companyID?: number;
  deliveryAgentID?: number;
  governorate?: keyof typeof governorateArabicNames;
  branchID?: number;
  clientID?: number;
  storeID?: number;
  repositoryID?: number;
  ordersIDs: number[];
}

export const createReportService = async (data: CreateReportPayload) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const response = await api.post<CreateReportPayload, AxiosResponse<any>>(
    createReportendpoint,
    data
  );
  const blob = new Blob([response.data], { type: 'application/pdf' });
  FileSaver.saveAs(blob, `تقرير.pdf`);
  return response.data;
};
