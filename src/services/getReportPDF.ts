/* eslint-disable no-useless-catch */
import { api } from '@/api';
import FileSaver from 'file-saver';

export const getReportPDFService = async (reportID: number, name: string) => {
  try {
    const response = await api.get(`/reports/${reportID}/pdf`, {
      responseType: 'blob',
    });

    const contentType = response.headers['content-type'];

    if (contentType === 'application/pdf') {
      const blob = new Blob([response.data], { type: 'application/pdf' });
      FileSaver.saveAs(blob, `${name}.pdf`);
      return;
    }
  } catch (error) {
    throw error;
  }
};
