import { api } from '@/api';
import { deleteEmployeeendpoint } from '@/api/apisUrl';

export const deactivateEmployeeService = async ({ id }: { id: number }) => {
  const response = await api.patch(`${deleteEmployeeendpoint + id}/deactivate`);
  return response.data;
};
