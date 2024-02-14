import { Filters } from '@/services/getEmployeesService';
import { getRepositoriesService } from '@/services/getRepositoriesService';
import { useQuery } from '@tanstack/react-query';

export const useRepositories = (
  { page = 1, size = 10, only_title_and_id }: Filters = { page: 1, size: 10 }
) => {
  return useQuery({
    queryKey: ['repositories', { page, size, only_title_and_id }],
    queryFn: () => getRepositoriesService({ page, size, only_title_and_id }),
  });
};
