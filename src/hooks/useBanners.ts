import { getBannersService } from '@/services/getBannersService';
import { Filters } from '@/services/getEmployeesService';
import { useQuery } from '@tanstack/react-query';

export const useBanners = (
  { page = 1, size = 10 }: Filters = { page: 1, size: 10 }
) => {
  return useQuery({
    queryKey: ['products', { page, size }],
    queryFn: () => getBannersService({ page, size }),
  });
};
