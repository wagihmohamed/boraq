import { useQuery } from '@tanstack/react-query';
import { getLocationDetailsService } from '@/services/getLocationDetails';

export function useLocationDetails(id: number) {
  return useQuery({
    queryKey: ['locations', id],
    queryFn: () => getLocationDetailsService(id),
    enabled: !!id,
  });
}
