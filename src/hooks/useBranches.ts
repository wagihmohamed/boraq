import { useQuery } from '@tanstack/react-query';
import {
  BranchFilters,
  getBranchesService,
} from '@/services/getBranchesService';

export function useBranches(
  {
    page = 1,
    size = 10,
    governorate,
    location_id,
    minified,
  }: BranchFilters = {
    page: 1,
    size: 10,
  }
) {
  return useQuery({
    queryKey: [
      'branches',
      { page, size, governorate, location_id, minified },
    ],
    queryFn: () =>
      getBranchesService({
        page,
        size,
        governorate,
        location_id,
        minified,
      }),
  });
}
