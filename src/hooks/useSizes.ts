import { Filters } from '@/services/getEmployeesService';
import { getSizesService } from '@/services/getSizes';
import { useQuery } from '@tanstack/react-query';

export const useSizes = (
  { page = 1, size = 10 }: Filters = { page: 1, size: 10 }
) => {
  return useQuery({
    queryKey: ['sizes', { page, size }],
    queryFn: () => getSizesService({ page, size }),
  });
};
