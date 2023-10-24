import { Filters, getEmployeesService } from '@/services/getEmployeesService';
import { useQuery } from '@tanstack/react-query';

export const useEmployees = (
  { page = 1, size = 10 }: Filters = { page: 1, size: 10 }
) => {
  return useQuery({
    queryKey: ['employees', { page, size }],
    queryFn: () => getEmployeesService({ page, size }),
  });
};
