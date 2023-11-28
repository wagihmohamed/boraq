import { Switch } from '@mantine/core';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { AxiosError } from 'axios';
import { APIError } from '@/models';
import {
  ChangeReportStatusPayload,
  changeReportStatusService,
} from '@/services/changeReportStatusService';
import { useState } from 'react';

export const ChangeReportStatus = ({
  id,
  initialStatus,
}: {
  id: number;
  initialStatus: ChangeReportStatusPayload['status'];
}) => {
  const [changedStatus, setChangedStatus] = useState(initialStatus);
  const queryClient = useQueryClient();
  const { mutate: changeReportStatus } = useMutation({
    mutationFn: ({ status }: ChangeReportStatusPayload) =>
      changeReportStatusService(id, { status }),
    onSuccess: () => {
      setChangedStatus((prev) => (prev === 'PAID' ? 'UNPAID' : 'PAID'));
      queryClient.invalidateQueries({
        queryKey: ['reports'],
      });
      toast.success('تم تغيير حالة الكشف بنجاح');
    },
    onError: (error: AxiosError<APIError>) => {
      toast.error(error.response?.data.message || 'حدث خطأ ما');
    },
  });

  const handleEdit = (status: 'UNPAID' | 'PAID') => {
    changeReportStatus({ status });
  };

  return (
    <Switch
      className="my-3"
      checked={changedStatus === 'PAID'}
      label={changedStatus === 'PAID' ? 'مدفوع' : 'غير مدفوع'}
      onChange={(event) => {
        handleEdit(event.target.checked ? 'PAID' : 'UNPAID');
      }}
    />
  );
};
