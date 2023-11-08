import { Filters } from '@/services/getEmployeesService';
import { getProductsService } from '@/services/getProducts';
import { useQuery } from '@tanstack/react-query';

export const useProducts = (
  { page = 1, size = 10 }: Filters = { page: 1, size: 10 }
) => {
  return useQuery({
    queryKey: ['products', { page, size }],
    queryFn: () => getProductsService({ page, size }),
  });
};
