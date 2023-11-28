import { api } from '@/api';
import { deleteEmployeeendpoint } from '@/api/apisUrl';

export const deleteEmployeeService = async ({ id }: { id: number }) => {
  const response = await api.delete(deleteEmployeeendpoint + id);
  return response.data;
};
