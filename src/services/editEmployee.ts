import { api } from '@/api';
import { editEmployeeEndpoint } from '@/api/apisUrl';
import { permissionsArabicNames } from '@/lib/persmissionArabicNames';
import { rolesArabicNames } from '@/lib/rolesArabicNames';

export interface EditEmployeePayload {
  username: string;
  name: string;
  password?: string;
  phone: string;
  salary: number;
  repositoryID: number;
  branchID: number;
  role: keyof typeof rolesArabicNames;
  permissions: keyof (typeof permissionsArabicNames)[];
}

export const editEmployeeService = async ({
  data,
  id,
}: {
  data: FormData;
  id: number;
}) => {
  const response = await api.patch<FormData>(editEmployeeEndpoint + id, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export interface EditClientAssistantStoresPayload {
  data: {
    storesIDs: number[];
  };
  id: number;
}

export const editClientAssistantStoresService = async (
  data: EditClientAssistantStoresPayload
) => {
  const response = await api.patch<FormData>(
    editEmployeeEndpoint + data.id,
    data.data,
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
  return response.data;
};
