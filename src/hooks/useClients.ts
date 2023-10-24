import { useQuery } from '@tanstack/react-query';
import { getClientsService } from '@/services/getClients';
import { Filters } from '@/services/getEmployeesService';

export function useClients(
  { page = 1, size = 10 }: Filters = { page: 1, size: 10 }
) {
  return useQuery({
    queryKey: ['clients', { page, size }],
    queryFn: () => getClientsService({ page, size }),
  });
}
