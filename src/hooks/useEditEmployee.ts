import { APIError } from '@/models';
import {
  IEditEmployeePayload,
  editEmployeeService,
} from '@/services/editEmployee';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import toast from 'react-hot-toast';

export const useEditEmployee = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: IEditEmployeePayload) => {
      return editEmployeeService(data);
    },
    onSuccess: () => {
      toast.success('تم تعديل الموظف بنجاح');
      queryClient.invalidateQueries({
        queryKey: ['employees'],
      });
    },
    onError: (error: AxiosError<APIError>) => {
      toast.error(error.response?.data.message || 'حدث خطأ ما');
    },
  });
};
