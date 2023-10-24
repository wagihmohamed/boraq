import { useQuery } from '@tanstack/react-query';
import { getStoreDetailsService } from '@/services/getStoreDetails';

export const useStoreDetails = (id: string) => {
  return useQuery({
    queryKey: ['stores', id],
    queryFn: () => getStoreDetailsService(id),
    enabled: !!id,
  });
};
