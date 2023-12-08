import { api } from '@/api';
import { deleteEmployeeendpoint } from '@/api/apisUrl';

export const reactivateEmployeeService = async ({ id }: { id: number }) => {
  const response = await api.patch(`${deleteEmployeeendpoint + id}/reactivate`);
  return response.data;
};
