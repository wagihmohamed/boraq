import { useDisclosure } from '@mantine/hooks';
import { Modal, Button, ActionIcon } from '@mantine/core';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { APIError } from '@/models';
import toast from 'react-hot-toast';
import { IconTrashFilled } from '@tabler/icons-react';
import { deleteStoreService } from '@/services/deleteStore';

export const PermanentlyDeleteStore = ({ id }: { id: number }) => {
  const [opened, { open, close }] = useDisclosure(false);
  const queryClient = useQueryClient();
  const { mutate: deleteStore, isLoading } = useMutation({
    mutationFn: () => deleteStoreService({ id }),
    onSuccess: () => {
      toast.success('تم حذف المتجر بنجاح');
      queryClient.invalidateQueries({
        queryKey: ['stores'],
      });
      close();
    },
    onError: (error: AxiosError<APIError>) => {
      toast.error(error.response?.data.message || 'حدث خطأ أثناء حذف المتجر');
    },
  });

  const handleDelete = () => {
    deleteStore();
  };

  return (
    <>
      <Modal opened={opened} onClose={close} title="مسح المتجر" centered>
        هل انت متأكد من مسح المتجر؟ لا يمكن التراجع عن هذا الإجراء
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
