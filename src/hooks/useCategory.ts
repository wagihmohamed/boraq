import { getCategoriesService } from '@/services/getCategories';
import { Filters } from '@/services/getEmployeesService';
import { useQuery } from '@tanstack/react-query';

export const useCategory = (
  { page = 1, size = 10, only_title_and_id }: Filters = { page: 1, size: 10 }
) => {
  return useQuery({
    queryKey: ['categories', { page, size, only_title_and_id }],
    queryFn: () => getCategoriesService({ page, size, only_title_and_id }),
  });
};
