import { getOrderDetailsService } from '@/services/getOrderDetails';
import { useMutation } from '@tanstack/react-query';

export const useOrderDetailsAction = () => {
  return useMutation({
    mutationFn: (id: number) => getOrderDetailsService(id),
  });
};
