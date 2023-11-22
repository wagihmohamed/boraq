import { api } from '@/api';
import FileSaver from 'file-saver';

export const getReportPDFService = async (reportID: number, name: string) => {
  const response = await api.get(`/reports/${reportID}/pdf`);

  const blob = new Blob([response.data], { type: 'application/pdf' });
  FileSaver.saveAs(blob, `${name}.pdf`);
  return response.data;
};
