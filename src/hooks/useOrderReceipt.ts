import { useMutation } from '@tanstack/react-query';
import { getOrderReceipt } from '@/services/getOrderReceipt';

export const useOrderReceipt = (name: string) => {
  return useMutation({
    mutationFn: (id: number[]) => getOrderReceipt(id, name),
  });
};
