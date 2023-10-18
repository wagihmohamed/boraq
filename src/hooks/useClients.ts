import { useQuery } from '@tanstack/react-query';
import { getClientsService } from '@/services/getClients';

export function useClients() {
  return useQuery({
    queryKey: ['clients'],
    queryFn: getClientsService,
  });
}
