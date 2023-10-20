import { getClientDetailsService } from '@/services/getClientDetails';
import { useQuery } from '@tanstack/react-query';

export function useClientDetails(id: string) {
  return useQuery({
    queryKey: ['clients', id],
    queryFn: () => getClientDetailsService(id),
  });
}
