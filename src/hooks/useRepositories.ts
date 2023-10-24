import { Filters } from '@/services/getEmployeesService';
import { getRepositoriesService } from '@/services/getRepositoriesService';
import { useQuery } from '@tanstack/react-query';

export const useRepositories = (
  { page = 1, size = 10 }: Filters = { page: 1, size: 10 }
) => {
  return useQuery({
    queryKey: ['repositories', { page, size }],
    queryFn: () => getRepositoriesService({ page, size }),
  });
};
