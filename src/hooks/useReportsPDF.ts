import { useMutation } from '@tanstack/react-query';
import { getReportPDFService } from '@/services/getReportPDF';

export const useReportsPDF = (name: string) => {
  return useMutation({
    mutationFn: (reportID: number) => getReportPDFService(reportID, name),
  });
};
