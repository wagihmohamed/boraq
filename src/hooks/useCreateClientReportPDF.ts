import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  CreateClientReportPDFPayload,
  createClientPDFService,
} from '@/services/createClientPDF';

export const useCreateClientReportPDF = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateClientReportPDFPayload) =>
      createClientPDFService(data),
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
