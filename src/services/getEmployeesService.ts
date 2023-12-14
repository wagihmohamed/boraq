import { api } from '@/api';
import { getEmployeesendpoint } from '@/api/apisUrl';
import { EmployeesFilters } from '@/hooks/useEmployees';
import { permissionsArabicNames } from '@/lib/persmissionArabicNames';
import { rolesArabicNames } from '@/lib/rolesArabicNames';

export interface Employee {
  id: number;
  name: string;
  username: string;
  phone: string;
  salary: string;
  role: keyof typeof rolesArabicNames;
  avatar: string | null;
  permissions: (keyof typeof permissionsArabicNames)[];
  branch: {
    id: number;
    name: string;
    email: string;
    phone: string;
    governorate: string;
    createdAt: string;
    updatedAt: string;
  };
  company: {
    id: number;
    name: string;
    logo: string | null;
  };
  repository: {
    id: number;
    name: string;
    createdAt: string;
    updatedAt: string;
    branchId: string;
  };
  deleted?: boolean;
  deletedBy?: {
    id: number;
    name: string;
  };
  deletedAt?: string;
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
  roles?: (keyof typeof rolesArabicNames)[];
  deleted?: boolean;
}

export const getEmployeesService = async (
  {
    page = 1,
    size = 10,
    roles,
    deleted = false,
    branch_id,
    location_id,
  }: EmployeesFilters = {
    page: 1,
    size: 10,
  }
) => {
  const response = await api.get<GetEmployeesResponse>(getEmployeesendpoint, {
    params: {
      page,
      size,
      roles: roles?.join(',') || undefined,
      deleted,
      branch_id: Number(branch_id) || undefined,
      location_id: Number(location_id) || undefined,
    },
  });
  return response.data;
};
