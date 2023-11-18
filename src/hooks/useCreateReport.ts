import { useMutation } from '@tanstack/react-query';
import {
  CreateReportPayload,
  createReportService,
} from '@/services/createReport';

export const useCreateReport = () => {
  return useMutation({
    mutationFn: (data: CreateReportPayload) => createReportService(data),
  });
};
