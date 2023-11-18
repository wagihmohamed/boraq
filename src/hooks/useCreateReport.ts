import { useMutation } from '@tanstack/react-query';
import {
  CreateReportPayload,
  createReportService,
} from '@/services/createReport';

export const useCreateReport = ({ onSuccess = () => {} }) => {
  return useMutation({
    mutationFn: (data: CreateReportPayload) => createReportService(data),
    onSuccess,
  });
};
