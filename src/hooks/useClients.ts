import { useQuery } from '@tanstack/react-query';
import { getClientsService } from '@/services/getClients';
import { Filters } from '@/services/getEmployeesService';

export function useClients(
  { page = 1, size = 10, deleted, only_title_and_id }: Filters = {
    page: 1,
    size: 10,
  }
) {
  return useQuery({
    queryKey: ['clients', { page, size, deleted, only_title_and_id }],
    queryFn: () =>
      getClientsService({ page, size, deleted, only_title_and_id }),
  });
}
