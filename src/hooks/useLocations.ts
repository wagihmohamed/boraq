import { LocationFilters, getLocationsService } from '@/services/getLocations';
import { useQuery } from '@tanstack/react-query';

export const useLocations = (
  { page = 1, size = 10, only_title_and_id, ...reset }: LocationFilters = {
    page: 1,
    size: 10,
  }
) => {
  return useQuery({
    queryKey: ['locations', { page, size, only_title_and_id, ...reset }],
    queryFn: () =>
      getLocationsService({ page, size, only_title_and_id, ...reset }),
  });
};
