import { api } from '@/api';
import { editEmployeeendpoint } from '@/api/apisUrl';
import { permissionsArabicNames } from '@/lib/persmissionArabicNames';
import { rolesArabicNames } from '@/lib/rolesArabicNames';

export interface EditEmployeePayload {
  username: string;
  name: string;
  password?: string;
  phone: string;
  salary: number;
  repositoryID: string;
  branchID: string;
  role: keyof typeof rolesArabicNames;
  permissions: keyof (typeof permissionsArabicNames)[];
}

export const editEmployeeService = async ({
  data,
  id,
}: {
  data: FormData;
  id: string;
}) => {
  const response = await api.patch<FormData>(editEmployeeendpoint + id, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};
