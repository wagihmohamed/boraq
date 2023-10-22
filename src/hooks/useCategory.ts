import { getCategoriesService } from '@/services/getCategories';
import { useQuery } from '@tanstack/react-query';

export const useCategory = (page?: number) => {
  return useQuery({
    queryKey: ['categories', page],
    queryFn: () => getCategoriesService(page),
  });
};
