import { useQuery } from '@tanstack/react-query';
import { getClientsService } from '@/services/getClients';
import { Filters } from '@/services/getEmployeesService';

export function useClients(
  { page = 1, size = 10, deleted, minified }: Filters = {
    page: 1,
    size: 10,
  }
) {
  return useQuery({
    queryKey: ['clients', { page, size, deleted, minified }],
    queryFn: () =>
      getClientsService({ page, size, deleted, minified }),
  });
}
