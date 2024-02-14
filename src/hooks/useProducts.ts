import { Filters } from '@/services/getEmployeesService';
import { getProductsService } from '@/services/getProducts';
import { useQuery } from '@tanstack/react-query';

export const useProducts = (
  { page = 1, size = 10, only_title_and_id }: Filters = { page: 1, size: 10 }
) => {
  return useQuery({
    queryKey: ['products', { page, size, only_title_and_id }],
    queryFn: () => getProductsService({ page, size, only_title_and_id }),
  });
};
