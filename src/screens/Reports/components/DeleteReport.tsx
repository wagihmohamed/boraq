import { useDisclosure } from '@mantine/hooks';
import { Modal, Button } from '@mantine/core';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { AxiosError } from 'axios';
import { APIError } from '@/models';
import { deactivateReportService } from '@/services/deactivateReport';

export const DeleteReport = ({ id }: { id: number }) => {
  const [opened, { open, close }] = useDisclosure(false);
  const queryClient = useQueryClient();
  const { mutate: deleteReport, isLoading } = useMutation({
    mutationFn: (id: number) => deactivateReportService({ id }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['reports'],
      });
      toast.success('تم مسح اضافة الكشف لقائمة المحذوفات بنجاح');
      close();
    },
    onError: (error: AxiosError<APIError>) => {
      toast.error(error.response?.data.message || 'حدث خطأ ما');
    },
  });

  const handleDelete = () => {
    deleteReport(id);
  };

  return (
    <>
      <Modal opened={opened} onClose={close} title="مسح الكشف" centered>
        هل انت متأكد من مسح الكشف؟
        <div className="mt-4 flex items-center gap-4">
          <Button
            loading={isLoading}
            disabled={isLoading}
            variant="filled"
            onClick={handleDelete}
          >
            مسح
          </Button>
          <Button variant="outline" onClick={close} className="mr-4">
            إلغاء
          </Button>
        </div>
      </Modal>

      <Button className="mb-2" fullWidth variant="filled" onClick={open}>
        مسح
      </Button>
    </>
  );
};
