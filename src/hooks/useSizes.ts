import { getSizesService } from '@/services/getSizes';
import { useQuery } from '@tanstack/react-query';

export const useSizes = () => {
  return useQuery({
    queryKey: ['sizes'],
    queryFn: () => getSizesService(),
  });
};
