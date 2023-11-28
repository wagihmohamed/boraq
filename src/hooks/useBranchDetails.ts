import { useQuery } from '@tanstack/react-query';
import { getBranchDetails } from '@/services/getBranchDetails';

export function useBranchDetails(id: number) {
  return useQuery({
    queryKey: ['branches', id],
    queryFn: () => getBranchDetails(id),
  });
}
