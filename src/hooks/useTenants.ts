import { Filters } from '@/services/getEmployeesService';
import { getTenantsService } from '@/services/getTenants';
import { useQuery } from '@tanstack/react-query';

export const useTenants = (
  { page = 1, size = 10, minified }: Filters = { page: 1, size: 10 },
  enabled?: boolean
) => {
  return useQuery({
    queryKey: ['tenants', { page, size, minified }],
    queryFn: () => getTenantsService({ page, size, minified }),
    enabled,
  });
};
