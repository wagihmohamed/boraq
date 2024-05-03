import { useDisclosure } from '@mantine/hooks';
import { Modal, Button, ActionIcon } from '@mantine/core';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { APIError } from '@/models';
import toast from 'react-hot-toast';
import { deleteSizeService } from '@/services/deleteSize';
import { IconTrash } from '@tabler/icons-react';

export const DeleteSize = ({ sizeId }: { sizeId: number }) => {
  const [opened, { open, close }] = useDisclosure(false);
  const queryClient = useQueryClient();
  const { mutate: deleteSize, isLoading } = useMutation({
    mutationFn: (id: number) => deleteSizeService({ id }),
    onSuccess: () => {
      toast.success('تم حذف الحجم بنجاح');
      queryClient.invalidateQueries({
        queryKey: ['sizes'],
      });
      close();
    },
    onError: (error: AxiosError<APIError>) => {
      toast.error(error.response?.data.message || 'حدث خطأ أثناء حذف الحجم');
    },
  });

  const handleDelete = () => {
    deleteSize(sizeId);
  };

  return (
    <>
      <Modal opened={opened} onClose={close} title="مسح المخزن" centered>
        هل انت متأكد من مسح الحجم؟ لا يمكن التراجع عن هذا الإجراء
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

      <ActionIcon size="lg" color="red" onClick={open}>
        <IconTrash className="text-white" />
      </ActionIcon>
    </>
  );
};
