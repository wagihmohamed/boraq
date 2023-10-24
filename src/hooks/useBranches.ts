import { useQuery } from '@tanstack/react-query';
import { getBranchesService } from '@/services/getBranchesService';
import { Filters } from '@/services/getEmployeesService';

export function useBranches(
  { page = 1, size = 10 }: Filters = { page: 1, size: 10 }
) {
  return useQuery({
    queryKey: ['branches', { page, size }],
    queryFn: () => getBranchesService({ page, size }),
  });
}
