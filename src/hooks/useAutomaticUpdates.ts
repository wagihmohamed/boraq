import { getAutomaticUpdatesService } from '@/services/getAutomaticUpdates';
import { Filters } from '@/services/getEmployeesService';
import { useQuery } from '@tanstack/react-query';

export const useAutomaticUpdates = (
  { page = 1, size = 10 }: Filters = { page: 1, size: 10 }
) => {
  return useQuery({
    queryKey: ['automaticUpdates', { page, size }],
    queryFn: () => getAutomaticUpdatesService({ page, size }),
  });
};
