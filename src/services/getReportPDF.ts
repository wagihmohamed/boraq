import { api } from '@/api';
import FileSaver from 'file-saver';

export const getReportPDFService = async (reportID: number, name: string) => {
  const response = await api.get(`/reports/${reportID}/pdf`);
  if (response.headers['content-type'] === 'application/json') {
    const blob = new Blob([response.data], { type: 'application/pdf' });
    FileSaver.saveAs(blob, `${name}.pdf`);
    response.config.responseType = 'blob';
    return response.data;
  }
  return response.data;
};
