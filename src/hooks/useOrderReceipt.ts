import { useMutation } from '@tanstack/react-query';
import { getOrderReceipt } from '@/services/getOrderReceipt';

export const useOrderReceipt = () => {
  return useMutation({
    mutationFn: (id: string) => getOrderReceipt(id),
  });
};
