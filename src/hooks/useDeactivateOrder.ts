import { APIError } from '@/models';
import { deactivateOrderService } from '@/services/deactivateOrder';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import toast from 'react-hot-toast';

export const useDeactivateOrder = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => deactivateOrderService({ id }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['orders'],
      });
      toast.success('تم اضافة الطلب الي قائمة المحذوفات بنجاح بنجاح');
    },
    onError: (error: AxiosError<APIError>) => {
      toast.error(error.response?.data.message || 'حدث خطأ ما');
    },
  });
};
