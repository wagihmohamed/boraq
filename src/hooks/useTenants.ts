import { Filters } from '@/services/getEmployeesService';
import { getTenantsService } from '@/services/getTenants';
import { useQuery } from '@tanstack/react-query';

export const useTenants = (
  { page = 1, size = 10 }: Filters = { page: 1, size: 10 }
) => {
  return useQuery({
    queryKey: ['tenants', { page, size }],
    queryFn: () => getTenantsService({ page, size }),
  });
};
