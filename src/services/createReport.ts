/* eslint-disable no-useless-catch */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from '@/api';
import { createReportendpoint } from '@/api/apisUrl';
import { governorateArabicNames } from '@/lib/governorateArabicNames ';
import { reportTypeArabicNames } from '@/lib/reportTypeArabicNames';
import { AxiosError, AxiosResponse } from 'axios';
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
  try {
    const response = await api.post<CreateReportPayload, AxiosResponse<any>>(
      createReportendpoint,
      data,
      {
        responseType: 'arraybuffer',
      }
    );

    const contentType = response.headers['content-type'];

    if (contentType === 'application/pdf') {
      const blob = new Blob([response.data], { type: 'application/pdf' });
      FileSaver.saveAs(blob, `كشف.pdf`);
      return;
    }
  } catch (error: any) {
    if (error instanceof AxiosError) {
      const data = JSON.parse(new TextDecoder().decode(error.response?.data));
      throw data;
    }
  }
};
