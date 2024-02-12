import { Filters } from '@/services/getEmployeesService';
import { getTenantsService } from '@/services/getTenants';
import { useQuery } from '@tanstack/react-query';

export const useTenants = (
  { page = 1, size = 10, only_title_and_id }: Filters = { page: 1, size: 10 },
  enabled?: boolean
) => {
  return useQuery({
    queryKey: ['tenants', { page, size, only_title_and_id }],
    queryFn: () => getTenantsService({ page, size, only_title_and_id }),
    enabled,
  });
};
