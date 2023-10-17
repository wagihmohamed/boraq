import { getEmployeesService } from '@/services/getEmployeesService';
import { useQuery } from '@tanstack/react-query';

export const useEmployees = () => {
  return useQuery({
    queryKey: ['employees'],
    queryFn: () => getEmployeesService(),
  });
};
