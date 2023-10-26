import { Filters } from '@/services/getEmployeesService';
import { getOrdersService } from '@/services/getOrders';
import { useQuery } from '@tanstack/react-query';

export const useOrders = (
  { page = 1, size = 10 }: Filters = { page: 1, size: 10 }
) => {
  return useQuery({
    queryKey: ['orders', { page, size }],
    queryFn: () => getOrdersService({ page, size }),
  });
};
