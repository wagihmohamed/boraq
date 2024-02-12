import { Filters } from '@/services/getEmployeesService';
import { getSizesService } from '@/services/getSizes';
import { useQuery } from '@tanstack/react-query';

export const useSizes = (
  { page = 1, size = 10, only_title_and_id }: Filters = { page: 1, size: 10 }
) => {
  return useQuery({
    queryKey: ['sizes', { page, size, only_title_and_id }],
    queryFn: () => getSizesService({ page, size, only_title_and_id }),
  });
};
