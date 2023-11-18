import { useMutation } from '@tanstack/react-query';
import { getOrderReceipt } from '@/services/getOrderReceipt';
import { AxiosError } from 'axios';
import { APIError } from '@/models';
import toast from 'react-hot-toast';

export const useOrderReceipt = (name: string) => {
  return useMutation({
    mutationFn: (id: string[]) => getOrderReceipt(id, name),
    onError: (error: AxiosError<APIError>) => {
      toast.error(error.response?.data.message || 'حدث خطأ ما');
    },
  });
};
