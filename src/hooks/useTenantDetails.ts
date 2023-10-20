import { getTenantDetailsService } from '@/services/getTenantDetails';
import { useQuery } from '@tanstack/react-query';

export const useTenantDetails = (id: string) => {
  return useQuery({
    queryKey: ['tenants', id],
    queryFn: () => getTenantDetailsService(id),
    enabled: !!id,
  });
};
