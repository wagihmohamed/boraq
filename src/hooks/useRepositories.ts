import { useQuery } from '@tanstack/react-query';
import { getRepositoriesService } from '@/services/getRepositoriesservice';

export function useRepositories() {
  return useQuery({
    queryKey: ['repositories'],
    queryFn: getRepositoriesService,
  });
}
