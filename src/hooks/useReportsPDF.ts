import { useMutation } from '@tanstack/react-query';
import { getReportPDFService } from '@/services/getReportPDF';
import { AxiosError } from 'axios';
import { APIError } from '@/models';
import toast from 'react-hot-toast';

export const useReportsPDF = (name: string) => {
  return useMutation({
    mutationFn: (reportID: string) => getReportPDFService(reportID, name),
    onError: (error: AxiosError<APIError>) => {
      toast.error(error.response?.data.message || 'حدث خطأ ما');
    },
  });
};
