import { getRepositoriesService } from '@/services/getRepositoriesService.ts';
import { useQuery } from '@tanstack/react-query';

export const useRepositories = () => {
  return useQuery({
    queryKey: ['repositories'],
    queryFn: () => getRepositoriesService(),
  });
};
