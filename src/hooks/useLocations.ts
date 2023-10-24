import { Filters } from '@/services/getEmployeesService';
import { getLocationsService } from '@/services/getLocations';
import { useQuery } from '@tanstack/react-query';

export const useLocations = (
  { page = 1, size = 10 }: Filters = { page: 1, size: 10 }
) => {
  return useQuery({
    queryKey: ['locations', { page, size }],
    queryFn: () => getLocationsService({ page, size }),
  });
};
