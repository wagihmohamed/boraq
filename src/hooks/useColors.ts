import { getColorsService } from '@/services/getColors';
import { Filters } from '@/services/getEmployeesService';
import { useQuery } from '@tanstack/react-query';

export const useColors = (
  { page = 1, size = 10 }: Filters = { page: 1, size: 10 }
) => {
  return useQuery({
    queryKey: ['colors', { page, size }],
    queryFn: () => getColorsService({ page, size }),
  });
};
