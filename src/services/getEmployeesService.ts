import { api } from '@/api';
import { getEmployeesendpoint } from '@/api/apisUrl';
import { rolesArabicNames } from '@/lib/rolesArabicNames';

export interface Employee {
  id: string;
  name: string;
  username: string;
  phone: string;
  salary: string;
  role: keyof typeof rolesArabicNames;
  persmission: string[];
  branch: string | null;
  repository: string | null;
}

export interface GetEmployeesResponse {
  status: string;
  page: number;
  pagesCount: number;
  data: Employee[];
}

export const getEmployeesService = async () => {
  const response = await api.get<GetEmployeesResponse>(getEmployeesendpoint);
  return response.data;
};
