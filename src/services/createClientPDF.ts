import { api } from '@/api';
import { exportClientReportendpoint } from '@/api/apisUrl';
import { AxiosError, AxiosResponse } from 'axios';
import FileSaver from 'file-saver';
import { ReportsFilters } from './getReports';

type CreateAllClientReportPDFPayload = {
  reportsIDs: '*';
  type: 'CLIENT';
  params: ReportsFilters;
};

export type CreateClientReportPDFByIDsPayload = {
  reportsIDs: number[];
  type: 'CLIENT';
};

export type CreateClientReportPDFPayload =
  | CreateAllClientReportPDFPayload
  | CreateClientReportPDFByIDsPayload;

export const createClientPDFService = async (
  data: CreateClientReportPDFPayload
) => {
  try {
    const response = await api.post<
      CreateClientReportPDFPayload,
      AxiosResponse<never>
    >(exportClientReportendpoint, data, {
      responseType: 'arraybuffer',
      params: data.reportsIDs === '*' ? data.params : undefined,
    });

    const contentType = response.headers['content-type'];

    if (contentType === 'application/pdf') {
      const blob = new Blob([response.data], { type: 'application/pdf' });
      FileSaver.saveAs(blob, `كشف.pdf`);
      return;
    }
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      const data = JSON.parse(new TextDecoder().decode(error.response?.data));
      throw data;
    }
  }
};
