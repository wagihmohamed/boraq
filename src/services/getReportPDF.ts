import { api } from '@/api';
import FileSaver from 'file-saver';

export const getReportPDFService = async (reportID: string, name: string) => {
  const response = await api.get(`/reports/${reportID}/pdf`, {
    responseType: 'arraybuffer',
  });

  const blob = new Blob([response.data], { type: 'application/pdf' });
  FileSaver.saveAs(blob, `${name}.pdf`);
};
