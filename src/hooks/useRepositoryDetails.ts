import { useQuery } from '@tanstack/react-query';
import { getRepositoryDetailsService } from '@/services/getRepositoryDetails';

export function useRepositoryDetails(id: number) {
  return useQuery({
    queryKey: ['repositories', id],
    queryFn: () => getRepositoryDetailsService(id),
    enabled: !!id,
  });
}
