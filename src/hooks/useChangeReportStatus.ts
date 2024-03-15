import { APIError } from '@/models';
import {
  ChangeReportStatusPayload,
  changeReportStatusService,
} from '@/services/changeReportStatusService';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import toast from 'react-hot-toast';

export const useChangeReportStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ status, id }: { id: number } & ChangeReportStatusPayload) =>
      changeReportStatusService(id, { status }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['reports'],
      });
    },
    onError: (error: AxiosError<APIError>) => {
      toast.error(error.response?.data.message || 'حدث خطأ ما');
    },
  });
};
