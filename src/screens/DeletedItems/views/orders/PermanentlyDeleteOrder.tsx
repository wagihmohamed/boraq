import { useDisclosure } from '@mantine/hooks';
import { Modal, Button, ActionIcon } from '@mantine/core';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { AxiosError } from 'axios';
import { APIError } from '@/models';
import { IconTrashFilled } from '@tabler/icons-react';
import { deleteOrderService } from '@/services/deleteOrder';

export const PermanentlyDeleteOrder = ({ id }: { id: number }) => {
  const [opened, { open, close }] = useDisclosure(false);
  const queryClient = useQueryClient();
  const { mutate: deleteReport, isLoading } = useMutation({
    mutationFn: () => deleteOrderService({ id }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['orders'],
      });
      toast.success('تم مسح الطلب بنجاح');
      close();
    },
    onError: (error: AxiosError<APIError>) => {
      toast.error(error.response?.data.message || 'حدث خطأ ما');
    },
  });

  const handleDelete = () => {
    deleteReport();
  };

  return (
    <>
      <Modal opened={opened} onClose={close} title="مسح الطلب" centered>
        هل انت متأكد من مسح الطلب لا يمكن التراجع عن هذا الإجراء
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

      <div className="flex justify-center">
        <ActionIcon
          variant="filled"
          onClick={open}
          className="mx-auto"
          color="red"
          aria-label="Settings"
        >
          <IconTrashFilled />
        </ActionIcon>
      </div>
    </>
  );
};
