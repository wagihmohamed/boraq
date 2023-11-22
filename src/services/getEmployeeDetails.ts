import { api } from '@/api';
import { getEmployeeDetailsendpoint } from '@/api/apisUrl';
import { Employee } from './getEmployeesService';

export interface GetEmployeeDetailsResponse {
  status: string;
  data: Employee;
}

export const getEmployeeDetailsService = async (id: number) => {
  const response = await api.get<GetEmployeeDetailsResponse>(
    getEmployeeDetailsendpoint + id
  );
  return response.data;
};
