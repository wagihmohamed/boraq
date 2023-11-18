import { useMutation } from '@tanstack/react-query';
import { getReportPDFService } from '@/services/getReportPDF';

export const useReportsPDF = (name: string) => {
  return useMutation({
    mutationFn: (reportID: string) => getReportPDFService(reportID, name),
  });
};
