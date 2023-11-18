import { useMutation } from '@tanstack/react-query';
import {
  CreateReportPayload,
  createReportService,
} from '@/services/createReport';
import { AxiosError } from 'axios';
import { APIError } from '@/models';
import toast from 'react-hot-toast';

export const useCreateReport = ({ onSuccess = () => {} }) => {
  return useMutation({
    mutationFn: (data: CreateReportPayload) => createReportService(data),
    onSuccess,
    onError: (error: AxiosError<APIError>) => {
      toast.error(error.response?.data.message || 'حدث خطأ ما');
    },
  });
};
