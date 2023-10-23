import { getProductsService } from '@/services/getProducts';
import { useQuery } from '@tanstack/react-query';

export const useProducts = (page?: number) => {
  return useQuery({
    queryKey: ['products', page],
    queryFn: () => getProductsService(page),
  });
};
