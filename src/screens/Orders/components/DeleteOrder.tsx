import { Modal, Button } from '@mantine/core';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { AxiosError } from 'axios';
import { APIError } from '@/models';
import { deactivateOrderService } from '@/services/deactivateOrder';

interface Props {
  id: number;
  opened: boolean;
  close: () => void;
  open: () => void;
}

export const DeleteOrder = ({ id, close, open, opened }: Props) => {
  const queryClient = useQueryClient();
  const { mutate: deleteLocation, isLoading } = useMutation({
    mutationFn: (id: number) => deactivateOrderService({ id }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['orders'],
      });
      toast.success('تم اضافة الطلب الي قائمة المحذوفات بنجاح بنجاح');
      close();
    },
    onError: (error: AxiosError<APIError>) => {
      toast.error(error.response?.data.message || 'حدث خطأ ما');
    },
  });

  const handleDelete = () => {
    deleteLocation(id);
  };

  return (
    <>
      <Modal opened={opened} onClose={close} title="مسح الطلب" centered>
        هل انت متأكد من مسح الطلب؟
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
