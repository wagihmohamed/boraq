import { rolesArabicNames } from '@/lib/rolesArabicNames';
import { Filters, getEmployeesService } from '@/services/getEmployeesService';
import { useQuery } from '@tanstack/react-query';

interface EmployeesFilters extends Filters {
  roles?: (keyof typeof rolesArabicNames)[];
}

export const useEmployees = (
  { page = 1, size = 10, roles }: EmployeesFilters = { page: 1, size: 10 }
) => {
  return useQuery({
    queryKey: ['employees', { page, size, roles }],
    queryFn: () => getEmployeesService({ page, size, roles }),
  });
};
