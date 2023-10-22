import { getColorsService } from '@/services/getColors';
import { useQuery } from '@tanstack/react-query';

export const useColors = (page?: number) => {
  return useQuery({
    queryKey: ['colors', page],
    queryFn: () => getColorsService(page),
  });
};
