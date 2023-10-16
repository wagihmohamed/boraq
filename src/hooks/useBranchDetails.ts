import { useQuery } from '@tanstack/react-query';
import { getBranchDetails } from '@/services/getBranchDetails';

export function useBranchDetails(id: string) {
  return useQuery({
    queryKey: ['branches', id],
    queryFn: () => getBranchDetails(id),
  });
}
