import { getSizesService } from '@/services/getSizes';
import { useQuery } from '@tanstack/react-query';

export const useSizes = (page?: number) => {
  return useQuery({
    queryKey: ['sizes', page],
    queryFn: () => getSizesService(page),
  });
};
