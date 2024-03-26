import { api } from '@/api';
import { getEmployeesEndpoint } from '@/api/apisUrl';
import { EmployeesFilters } from '@/hooks/useEmployees';
import { permissionsArabicNames } from '@/lib/persmissionArabicNames';
import { rolesArabicNames } from '@/lib/rolesArabicNames';

export interface Employee {
  id: number;
  name: string;
  username: string;
  phone: string;
  salary: number;
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
  deliveryCost: number;
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
  managedStores: {
    id: number;
    name: string;
  }[];
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
  permissions?: (keyof typeof permissionsArabicNames)[];
  deleted?: boolean;
  minified?: boolean;
  store_id?: string;
}

export const getEmployeesService = async (
  {
    page = 1,
    size = 10,
    roles,
    deleted = false,
    branch_id,
    location_id,
    minified,
    permissions,
  }: EmployeesFilters = {
    page: 1,
    size: 10,
  }
) => {
  const response = await api.get<GetEmployeesResponse>(getEmployeesEndpoint, {
    params: {
      page,
      size,
      roles: roles?.join(',') || undefined,
      deleted,
      branch_id: Number(branch_id) || undefined,
      location_id: Number(location_id) || undefined,
      minified,
      permissions: permissions?.join(',') || undefined,
    },
  });
  return response.data;
};
