import { Filters } from '@/services/getEmployeesService';
import { getStoresService } from '@/services/getStores';
import { useQuery } from '@tanstack/react-query';

export const useStores = (
  { page = 1, size = 10, deleted, only_title_and_id }: Filters = {
    page: 1,
    size: 10,
  }
) => {
  return useQuery({
    queryKey: ['stores', { page, size, deleted, only_title_and_id }],
    queryFn: () => getStoresService({ page, size, deleted, only_title_and_id }),
  });
};
