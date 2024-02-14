import { getColorsService } from '@/services/getColors';
import { Filters } from '@/services/getEmployeesService';
import { useQuery } from '@tanstack/react-query';

export const useColors = (
  { page = 1, size = 10, only_title_and_id }: Filters = { page: 1, size: 10 }
) => {
  return useQuery({
    queryKey: ['colors', { page, size, only_title_and_id }],
    queryFn: () => getColorsService({ page, size, only_title_and_id }),
  });
};
