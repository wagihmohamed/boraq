import { Filters } from '@/services/getEmployeesService';
import { getStoresService } from '@/services/getStores';
import { useQuery } from '@tanstack/react-query';

export const useStores = (
  { page = 1, size = 10, deleted }: Filters = { page: 1, size: 10 }
) => {
  return useQuery({
    queryKey: ['stores', { page, size, deleted }],
    queryFn: () => getStoresService({ page, size, deleted }),
  });
};
