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
  repositoryID: number;
  branchID: number;
  role: keyof typeof rolesArabicNames;
  permissions: keyof (typeof permissionsArabicNames)[];
}

export const createEmployeeService = async (data: FormData) => {
  const response = await api.post<FormData>(createEmployeeendpoint, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};
