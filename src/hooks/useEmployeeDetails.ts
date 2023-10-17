import { getEmployeeDetailsService } from '@/services/getEmployeeDetails';
import { useQuery } from '@tanstack/react-query';

export function useEmployeeDetails(id: string) {
  return useQuery({
    queryKey: ['employees', id],
    queryFn: () => getEmployeeDetailsService(id),
    enabled: !!id,
  });
}
