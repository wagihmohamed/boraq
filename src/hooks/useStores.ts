import { Filters } from '@/services/getEmployeesService';
import { getStoresService } from '@/services/getStores';
import { useQuery } from '@tanstack/react-query';

export const useStores = (
  { page = 1, size = 10 }: Filters = { page: 1, size: 10 }
) => {
  return useQuery({
    queryKey: ['stores', { page, size }],
    queryFn: () => getStoresService({ page, size }),
  });
};
