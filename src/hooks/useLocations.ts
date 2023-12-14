import { LocationFilters, getLocationsService } from '@/services/getLocations';
import { useQuery } from '@tanstack/react-query';

export const useLocations = (
  { page = 1, size = 10, ...reset }: LocationFilters = { page: 1, size: 10 }
) => {
  return useQuery({
    queryKey: ['locations', { page, size, ...reset }],
    queryFn: () => getLocationsService({ page, size, ...reset }),
  });
};
