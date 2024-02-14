import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  CreateReportPayload,
  createReportService,
} from '@/services/createReport';

export const useCreateReport = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateReportPayload) => createReportService(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['reports'],
      });
      queryClient.invalidateQueries({
        queryKey: ['orders'],
      });
    },
  });
};
