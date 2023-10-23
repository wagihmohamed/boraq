import { getProductDetailsService } from '@/services/getProductDetails';
import { useQuery } from '@tanstack/react-query';

export function useProductDetails(id: string) {
  return useQuery({
    queryKey: ['products', id],
    queryFn: () => getProductDetailsService(id),
    enabled: !!id,
  });
}
