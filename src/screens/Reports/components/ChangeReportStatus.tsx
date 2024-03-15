import { Switch } from '@mantine/core';
import toast from 'react-hot-toast';
import { useChangeReportStatus } from '@/hooks/useChangeReportStatus';
import { ChangeReportStatusPayload } from '@/services/changeReportStatusService';

export const ChangeReportStatus = ({
  id,
  initialStatus,
}: {
  id: number;
  initialStatus: ChangeReportStatusPayload['status'];
}) => {
  const { mutate: changeReportStatus } = useChangeReportStatus();

  const handleEdit = (status: 'UNPAID' | 'PAID') => {
    changeReportStatus(
      { status, id },
      {
        onSuccess: () => {
          toast.success('تم تغيير حالة الكشف بنجاح');
        },
      }
    );
  };

  return (
    <Switch
      className="my-3"
      checked={initialStatus === 'PAID'}
      label={initialStatus === 'PAID' ? 'مدفوع' : 'غير مدفوع'}
      onChange={(event) => {
        handleEdit(event.target.checked ? 'PAID' : 'UNPAID');
      }}
    />
  );
};
