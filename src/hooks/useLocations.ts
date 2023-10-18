import { getLocationsService } from '@/services/getLocations';
import { useQuery } from '@tanstack/react-query';

export const useLocations = () => {
  return useQuery({
    queryKey: ['locations'],
    queryFn: () => getLocationsService(),
  });
};
