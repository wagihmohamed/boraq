import { getCategoriesService } from '@/services/getCategories';
import { Filters } from '@/services/getEmployeesService';
import { useQuery } from '@tanstack/react-query';

export const useCategory = (
  { page = 1, size = 10 }: Filters = { page: 1, size: 10 }
) => {
  return useQuery({
    queryKey: ['categories', { page, size }],
    queryFn: () => getCategoriesService({ page, size }),
  });
};
