import { rolesArabicNames } from '@/lib/rolesArabicNames';
import { Filters, getEmployeesService } from '@/services/getEmployeesService';
import { useQuery } from '@tanstack/react-query';

export interface EmployeesFilters extends Filters {
  roles?: (keyof typeof rolesArabicNames)[];
  branch_id?: number | null;
  location_id?: number | null;
}

export const useEmployees = (
  { page = 1, size = 10, roles, deleted, ...reset }: EmployeesFilters = {
    page: 1,
    size: 10,
  }
) => {
  return useQuery({
    queryKey: ['employees', { page, size, roles, deleted, ...reset }],
    queryFn: () =>
      getEmployeesService({ page, size, roles, deleted, ...reset }),
  });
};
