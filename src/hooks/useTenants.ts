import { getTenantsService } from '@/services/getTenants';
import { useQuery } from '@tanstack/react-query';

export const useTenants = () => {
  return useQuery({
    queryKey: ['tenants'],
    queryFn: getTenantsService,
  });
};
