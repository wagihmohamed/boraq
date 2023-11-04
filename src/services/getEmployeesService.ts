import { api } from '@/api';
import { getEmployeesendpoint } from '@/api/apisUrl';
import { permissionsArabicNames } from '@/lib/persmissionArabicNames';
import { rolesArabicNames } from '@/lib/rolesArabicNames';

export interface Employee {
  id: string;
  name: string;
  username: string;
  phone: string;
  salary: string;
  role: keyof typeof rolesArabicNames;
  avatar: string | null;
  permissions: (typeof permissionsArabicNames)[];
  branch: {
    id: string;
    name: string;
    email: string;
    phone: string;
    governorate: string;
    createdAt: string;
    updatedAt: string;
  };
  repository: {
    id: string;
    name: string;
    createdAt: string;
    updatedAt: string;
    branchId: string;
  };
}

export interface GetEmployeesResponse {
  status: string;
  page: number;
  pagesCount: number;
  data: Employee[];
}

export interface Filters {
  page?: number;
  size?: number;
  pagesCount?: number;
}

export const getEmployeesService = async (
  { page = 1, size = 10 }: Filters = { page: 1, size: 10 }
) => {
  const response = await api.get<GetEmployeesResponse>(getEmployeesendpoint, {
    params: {
      page,
      size,
    },
  });
  return response.data;
};
