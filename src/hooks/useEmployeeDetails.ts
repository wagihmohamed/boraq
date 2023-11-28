import { getEmployeeDetailsService } from '@/services/getEmployeeDetails';
import { useQuery } from '@tanstack/react-query';

export function useEmployeeDetails(id: number) {
  return useQuery({
    queryKey: ['employees', id],
    queryFn: () => getEmployeeDetailsService(id),
    enabled: !!id,
  });
}
