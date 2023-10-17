import { api } from '@/api';
import { createEmployeeendpoint } from '@/api/apisUrl';
import { permissionsArabicNames } from '@/lib/persmissionArabicNames';
import { rolesArabicNames } from '@/lib/rolesArabicNames';

export interface CreateEmployeePayload {
  username: string;
  name: string;
  password: string;
  phone: string;
  salary: number;
  repositoryID: string;
  branchID: string;
  role: keyof typeof rolesArabicNames;
  permissions: keyof (typeof permissionsArabicNames)[];
}

export const createEmployeeService = async (data: CreateEmployeePayload) => {
  const response = await api.post<CreateEmployeePayload>(
    createEmployeeendpoint,
    data
  );
  return response.data;
};
