import { useQuery } from '@tanstack/react-query';
import { getBranchesService } from '@/services/getBranchesService';

export function useBranches() {
  return useQuery({
    queryKey: ['branches'],
    queryFn: getBranchesService,
  });
}
